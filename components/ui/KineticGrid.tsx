"use client";

import { useEffect, useRef } from "react";
import styles from "./KineticGrid.module.css";

type Point = { x: number; y: number };
type Ripple = Point & { born: number };
type Theme = "light" | "dark";
type Rgb = readonly [number, number, number];

const CELL_SIZE = 62;
const DOT_SPACING = 30;
const INFLUENCE_RADIUS = 250;
const MAX_WARP = 22;
const LERP_SPEED = 0.09;

const GRADIENT_STOPS = [
  { position: 0, color: [8, 11, 18] as Rgb },
  { position: 0.2, color: [22, 33, 66] as Rgb },
  { position: 0.43, color: [85, 112, 245] as Rgb },
  { position: 0.64, color: [197, 66, 218] as Rgb },
  { position: 0.83, color: [255, 118, 71] as Rgb },
  { position: 1, color: [240, 240, 242] as Rgb },
] as const;

const PALETTES = {
  dark: {
    background: "#07080d",
    line: [255, 255, 255, 0.1] as const,
    node: [255, 255, 255, 0.2] as const,
  },
  light: {
    background: "#eeeae8",
    line: [18, 18, 18, 0.11] as const,
    node: [18, 18, 18, 0.22] as const,
  },
};

function lerp(a: number, b: number, amount: number) {
  return a + (b - a) * amount;
}

function rgba(
  from: readonly [number, number, number, number],
  to: Rgb,
  amount: number,
  activeAlpha = 1,
) {
  return `rgba(${Math.round(lerp(from[0], to[0], amount))},${Math.round(
    lerp(from[1], to[1], amount),
  )},${Math.round(lerp(from[2], to[2], amount))},${lerp(
    from[3],
    activeAlpha,
    amount,
  ).toFixed(3)})`;
}

function gradientColor(position: number): Rgb {
  const clamped = Math.min(1, Math.max(0, position));
  const upperIndex = GRADIENT_STOPS.findIndex(
    (stop) => stop.position >= clamped,
  );
  if (upperIndex <= 0) return GRADIENT_STOPS[0].color;
  const lower = GRADIENT_STOPS[upperIndex - 1];
  const upper = GRADIENT_STOPS[upperIndex];
  const amount =
    (clamped - lower.position) / (upper.position - lower.position || 1);
  return [
    Math.round(lerp(lower.color[0], upper.color[0], amount)),
    Math.round(lerp(lower.color[1], upper.color[1], amount)),
    Math.round(lerp(lower.color[2], upper.color[2], amount)),
  ];
}

function currentTheme(): Theme {
  return document.documentElement.getAttribute("color-scheme") === "light"
    ? "light"
    : "dark";
}

export default function KineticGrid({ className = "" }: { className?: string }) {
  const rootRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    const canvas = canvasRef.current;
    const context = canvas?.getContext("2d");
    if (!root || !canvas || !context) return;
    // Phones use the CSS aurora fallback: it is lighter, sharper and avoids
    // spending animation frames on a pointer effect that has little value on touch.
    if (window.matchMedia("(max-width: 767px)").matches) return;
    const eventTarget = root.closest<HTMLElement>(".mxd-hero-02") ?? root;

    let width = 0;
    let height = 0;
    let frame = 0;
    let visible = true;
    let theme = currentTheme();
    let pointer: Point = { x: -9999, y: -9999 };
    let target: Point = { x: -9999, y: -9999 };
    const ripples: Ripple[] = [];
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

    const warpedPoint = (
      x: number,
      y: number,
      column: number,
      row: number,
      columns: number,
      rows: number,
      now: number,
    ) => {
      const edge = 1.5;
      const columnPin = Math.min(
        column / edge,
        (columns - 1 - column) / edge,
        1,
      );
      const rowPin = Math.min(row / edge, (rows - 1 - row) / edge, 1);
      const pin = columnPin * columnPin * rowPin * rowPin;
      const dx = x - pointer.x;
      const dy = y - pointer.y;
      const distance = Math.hypot(dx, dy);
      const proximity = Math.max(0, 1 - distance / INFLUENCE_RADIUS) * pin;
      let rippleX = 0;
      let rippleY = 0;

      for (const ripple of ripples) {
        const age = (now - ripple.born) / 1000;
        const radius = age * 400;
        const opacity = Math.max(0, 1 - age * 1.2);
        const rippleDx = x - ripple.x;
        const rippleDy = y - ripple.y;
        const difference = Math.hypot(rippleDx, rippleDy) - radius;
        if (Math.abs(difference) < 55) {
          const strength =
            (1 - Math.abs(difference) / 55) * opacity * 18 * pin;
          const angle = Math.atan2(rippleDy, rippleDx);
          const direction = difference < 0 ? 1 : -1;
          rippleX += Math.cos(angle) * strength * direction;
          rippleY += Math.sin(angle) * strength * direction;
        }
      }

      if (distance < INFLUENCE_RADIUS && distance > 0 && pin > 0) {
        const ratio = distance / INFLUENCE_RADIUS;
        const eased =
          ratio < 0.01
            ? 0
            : (1 - ratio) * (1 - ratio) * Math.min(1, distance / 60);
        const warp = eased * MAX_WARP * pin;
        const angle = Math.atan2(dy, dx);
        return {
          point: {
            x: x - Math.cos(angle) * warp + rippleX,
            y: y - Math.sin(angle) * warp + rippleY,
          },
          proximity,
        };
      }

      return {
        point: { x: x + rippleX, y: y + rippleY },
        proximity,
      };
    };

    const draw = (now: number) => {
      const palette = PALETTES[theme];
      context.clearRect(0, 0, width, height);
      context.fillStyle = palette.background;
      context.fillRect(0, 0, width, height);

      const paintGlow = (
        x: number,
        y: number,
        radius: number,
        color: Rgb,
        opacity: number,
      ) => {
        const glow = context.createRadialGradient(x, y, 0, x, y, radius);
        glow.addColorStop(0, `rgba(${color.join(",")},${opacity})`);
        glow.addColorStop(0.42, `rgba(${color.join(",")},${opacity * 0.5})`);
        glow.addColorStop(1, `rgba(${color.join(",")},0)`);
        context.fillStyle = glow;
        context.fillRect(0, 0, width, height);
      };

      const scale = Math.max(width, height);
      const dark = theme === "dark";
      paintGlow(
        width * 0.39,
        height * 0.55,
        scale * 0.43,
        [85, 112, 245],
        dark ? 0.3 : 0.16,
      );
      paintGlow(
        width * 0.54,
        height * 0.46,
        scale * 0.34,
        [197, 66, 218],
        dark ? 0.24 : 0.13,
      );
      paintGlow(
        width * 0.67,
        height * 0.57,
        scale * 0.3,
        [255, 118, 71],
        dark ? 0.2 : 0.12,
      );
      paintGlow(
        width * 0.52,
        height * 0.53,
        scale * 0.18,
        [240, 240, 242],
        dark ? 0.06 : 0.16,
      );

      context.fillStyle = rgba(palette.line, gradientColor(0.5), 0, 0.04);
      for (let x = DOT_SPACING / 2; x < width; x += DOT_SPACING) {
        for (let y = DOT_SPACING / 2; y < height; y += DOT_SPACING) {
          context.beginPath();
          context.arc(x, y, 0.7, 0, Math.PI * 2);
          context.fill();
        }
      }

      for (let index = ripples.length - 1; index >= 0; index -= 1) {
        if ((now - ripples[index].born) / 1000 > 0.84) ripples.splice(index, 1);
      }

      const columns = Math.max(2, Math.ceil(width / CELL_SIZE)) + 1;
      const rows = Math.max(2, Math.ceil(height / CELL_SIZE)) + 1;
      const cellWidth = width / (columns - 1);
      const cellHeight = height / (rows - 1);
      const points: Point[][] = [];
      const proximity: number[][] = [];

      for (let row = 0; row < rows; row += 1) {
        points[row] = [];
        proximity[row] = [];
        for (let column = 0; column < columns; column += 1) {
          const warped = warpedPoint(
            column * cellWidth,
            row * cellHeight,
            column,
            row,
            columns,
            rows,
            now,
          );
          points[row][column] = warped.point;
          proximity[row][column] = warped.proximity;
        }
      }

      const drawSegment = (
        start: Point,
        end: Point,
        startProximity: number,
        endProximity: number,
      ) => {
        const average = (startProximity + endProximity) / 2;
        const amount = average * average * (3 - 2 * average);
        const active = gradientColor((start.x + end.x) / 2 / width);
        context.beginPath();
        context.moveTo(start.x, start.y);
        context.lineTo(end.x, end.y);
        context.strokeStyle = rgba(palette.line, active, amount, 0.9);
        context.lineWidth = lerp(0.8, 1.45, amount);
        context.stroke();
      };

      for (let row = 0; row < rows; row += 1) {
        for (let column = 0; column < columns - 1; column += 1) {
          drawSegment(
            points[row][column],
            points[row][column + 1],
            proximity[row][column],
            proximity[row][column + 1],
          );
        }
      }
      for (let column = 0; column < columns; column += 1) {
        for (let row = 0; row < rows - 1; row += 1) {
          drawSegment(
            points[row][column],
            points[row + 1][column],
            proximity[row][column],
            proximity[row + 1][column],
          );
        }
      }

      for (let row = 0; row < rows; row += 1) {
        for (let column = 0; column < columns; column += 1) {
          const point = points[row][column];
          const near = proximity[row][column];
          const amount = near * near * (3 - 2 * near);
          const radius = lerp(1.5, 3, amount);
          const active = gradientColor(point.x / width);
          if (amount > 0.3) {
            const glowRadius = radius + lerp(0, 6, (amount - 0.3) / 0.7);
            const glow = context.createRadialGradient(
              point.x,
              point.y,
              radius * 0.5,
              point.x,
              point.y,
              glowRadius,
            );
            glow.addColorStop(
              0,
              `rgba(${active.join(",")},${(amount * 0.3).toFixed(3)})`,
            );
            glow.addColorStop(1, `rgba(${active.join(",")},0)`);
            context.beginPath();
            context.arc(point.x, point.y, glowRadius, 0, Math.PI * 2);
            context.fillStyle = glow;
            context.fill();
          }
          context.beginPath();
          context.arc(point.x, point.y, radius, 0, Math.PI * 2);
          context.fillStyle = rgba(palette.node, active, amount);
          context.fill();
        }
      }

      for (const ripple of ripples) {
        const age = (now - ripple.born) / 1000;
        const opacity = Math.max(0, 1 - age * 1.2);
        const active = gradientColor(ripple.x / width);
        context.beginPath();
        context.arc(ripple.x, ripple.y, Math.max(0, age * 400), 0, Math.PI * 2);
        context.strokeStyle = `rgba(${active.join(",")},${(
          opacity * 0.28
        ).toFixed(3)})`;
        context.lineWidth = 1.5;
        context.stroke();
      }
    };

    const schedule = () => {
      if (!frame && visible) frame = requestAnimationFrame(animate);
    };

    const animate = (now: number) => {
      frame = 0;
      pointer.x = lerp(pointer.x, target.x, LERP_SPEED);
      pointer.y = lerp(pointer.y, target.y, LERP_SPEED);
      draw(now);
      const moving =
        Math.abs(pointer.x - target.x) > 0.1 ||
        Math.abs(pointer.y - target.y) > 0.1;
      if (!reducedMotion.matches && (moving || ripples.length > 0)) schedule();
    };

    const resize = () => {
      const rect = root.getBoundingClientRect();
      width = Math.max(1, rect.width);
      height = Math.max(1, rect.height);
      const ratio = Math.min(window.devicePixelRatio || 1, 1.5);
      canvas.width = Math.round(width * ratio);
      canvas.height = Math.round(height * ratio);
      context.setTransform(ratio, 0, 0, ratio, 0, 0);
      draw(performance.now());
    };

    const updatePointer = (event: PointerEvent) => {
      if (reducedMotion.matches) return;
      const rect = root.getBoundingClientRect();
      const next = { x: event.clientX - rect.left, y: event.clientY - rect.top };
      if (pointer.x < -1000) pointer = next;
      target = next;
      schedule();
    };

    const leavePointer = () => {
      pointer = { x: -9999, y: -9999 };
      target = pointer;
      draw(performance.now());
    };

    const addRipple = (event: PointerEvent) => {
      if (reducedMotion.matches) return;
      const rect = root.getBoundingClientRect();
      ripples.push({
        x: event.clientX - rect.left,
        y: event.clientY - rect.top,
        born: performance.now(),
      });
      schedule();
    };

    const resizeObserver = new ResizeObserver(resize);
    const intersectionObserver = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      if (visible) {
        draw(performance.now());
        schedule();
      } else if (frame) {
        cancelAnimationFrame(frame);
        frame = 0;
      }
    });
    const themeObserver = new MutationObserver(() => {
      theme = currentTheme();
      draw(performance.now());
    });

    resizeObserver.observe(root);
    intersectionObserver.observe(root);
    themeObserver.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["color-scheme"],
    });
    eventTarget.addEventListener("pointermove", updatePointer, { passive: true });
    eventTarget.addEventListener("pointerleave", leavePointer, { passive: true });
    eventTarget.addEventListener("pointerdown", addRipple, { passive: true });
    resize();

    return () => {
      resizeObserver.disconnect();
      intersectionObserver.disconnect();
      themeObserver.disconnect();
      eventTarget.removeEventListener("pointermove", updatePointer);
      eventTarget.removeEventListener("pointerleave", leavePointer);
      eventTarget.removeEventListener("pointerdown", addRipple);
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <div
      ref={rootRef}
      className={`${styles.root} ${className}`.trim()}
      aria-hidden="true"
    >
      <canvas ref={canvasRef} className={styles.canvas} />
    </div>
  );
}
