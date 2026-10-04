(() => {
  "use strict";

  const root = document.documentElement;
  const themeButton = document.getElementById("color-switcher");
  const storageKey = "template.theme";
  const sunPath =
    "M8,0h2v2h-2V0ZM2,2h2v2h-2v-2ZM14,2h2v2h-2v-2ZM6,4h6v2h2v6h-2v2h-6v-2h-2v-6h2v-2ZM0,8h2v2H0v-2ZM16,8h2v2h-2v-2ZM2,14h2v2h-2v-2ZM14,14h2v2h-2v-2ZM8,16h2v2h-2v-2Z";
  const moonPath =
    "M7.7,0h7.7v2.6h-2.6v2.6h-2.6v7.7h2.6v2.6h2.6v2.6h-7.7v-2.6h-2.6v-2.6h-2.6v-7.7h2.6v-2.6h2.6V0Z";

  function applyTheme(theme) {
    const dark = theme === "dark";
    root.setAttribute("color-scheme", dark ? "dark" : "light");
    themeButton?.setAttribute("aria-checked", String(dark));
    const text = themeButton?.querySelector(".switcher-text");
    const path = themeButton?.querySelector("svg path");
    if (text) text.textContent = dark ? "Day" : "Night";
    path?.setAttribute("d", dark ? sunPath : moonPath);
  }

  function storedTheme() {
    try {
      const theme = localStorage.getItem(storageKey);
      if (theme === "light" || theme === "dark") return theme;
    } catch {}
    const match = document.cookie.match(
      /(?:^|;\s*)template\.theme=(light|dark)(?:;|$)/,
    );
    return match ? match[1] : "light";
  }

  applyTheme(root.getAttribute("color-scheme"));
  themeButton?.addEventListener("click", () => {
    const theme =
      root.getAttribute("color-scheme") === "dark" ? "light" : "dark";
    applyTheme(theme);
    try {
      localStorage.setItem(storageKey, theme);
    } catch {}
    document.cookie = `${storageKey}=${theme}; path=/; max-age=31536000; samesite=lax${location.protocol === "https:" ? "; secure" : ""}`;
  });
  window.addEventListener("storage", (event) => {
    if (
      event.key === storageKey &&
      (event.newValue === "light" || event.newValue === "dark")
    ) {
      applyTheme(event.newValue);
    }
  });

  const menu = document.getElementById("site-menu");
  const trigger = document.getElementById("site-menu-toggle");
  const triggerWrap = trigger?.closest(".mxd-menu__contain");
  const closeButton = menu?.querySelector('button[aria-label="Menu sluiten"]');
  let menuOpen = false;
  let returnFocus = null;
  let previousOverflow = "";
  let previousPadding = "";
  let backgroundState = [];

  function focusableMenuElements() {
    return Array.from(
      menu?.querySelectorAll(
        'a[href], button:not([disabled]), [tabindex="0"]',
      ) ?? [],
    ).filter((element) => element.getClientRects().length > 0);
  }

  function openMenu() {
    if (menuOpen || !menu || !trigger) return;
    menuOpen = true;
    // Safari does not always focus a clicked button; the opener is deterministic.
    returnFocus = trigger;
    previousOverflow = document.body.style.overflow;
    previousPadding = document.body.style.paddingRight;
    const scrollbarWidth = window.innerWidth - root.clientWidth;
    if (scrollbarWidth > 0) {
      const padding =
        parseFloat(getComputedStyle(document.body).paddingRight) || 0;
      document.body.style.paddingRight = `${padding + scrollbarWidth}px`;
    }
    document.body.style.overflow = "hidden";
    document.body.classList.add("menu-open");
    menu.setAttribute("data-native-open", "true");
    menu.setAttribute("aria-hidden", "false");
    menu.removeAttribute("inert");
    trigger.setAttribute("aria-expanded", "true");
    trigger.setAttribute("aria-label", "Menu sluiten");
    focusableMenuElements()[0]?.focus({ preventScroll: true });
    trigger.tabIndex = -1;
    triggerWrap?.setAttribute("aria-hidden", "true");
    triggerWrap?.setAttribute("inert", "");
    backgroundState = [
      document.getElementById("site-content"),
      document.getElementById("header"),
    ]
      .filter(Boolean)
      .map((element) => ({ element, inert: element.hasAttribute("inert") }));
    backgroundState.forEach(({ element }) => element.setAttribute("inert", ""));
  }

  function closeMenu(restoreFocus = true) {
    if (!menuOpen || !menu || !trigger) return;
    menuOpen = false;
    document.body.style.overflow = previousOverflow;
    document.body.style.paddingRight = previousPadding;
    document.body.classList.remove("menu-open");
    backgroundState.forEach(({ element, inert }) =>
      element.toggleAttribute("inert", inert),
    );
    backgroundState = [];
    trigger.tabIndex = 0;
    trigger.setAttribute("aria-expanded", "false");
    trigger.setAttribute("aria-label", "Menu openen");
    triggerWrap?.setAttribute("aria-hidden", "false");
    triggerWrap?.removeAttribute("inert");
    if (restoreFocus && returnFocus?.isConnected)
      returnFocus.focus({ preventScroll: true });
    menu.removeAttribute("data-native-open");
    menu.setAttribute("inert", "");
    menu.setAttribute("aria-hidden", "true");
  }

  trigger?.addEventListener("click", () =>
    menuOpen ? closeMenu() : openMenu(),
  );
  closeButton?.addEventListener("click", () => closeMenu());
  menu?.addEventListener("click", (event) => {
    if (event.target instanceof Element && event.target.closest("a[href]"))
      closeMenu();
  });
  window.addEventListener("keydown", (event) => {
    if (!menuOpen) return;
    if (event.key === "Escape") {
      event.preventDefault();
      closeMenu();
    } else if (event.key === "Tab") {
      const elements = focusableMenuElements();
      const first = elements[0];
      const last = elements.at(-1);
      if (
        event.shiftKey &&
        (document.activeElement === first ||
          !menu?.contains(document.activeElement))
      ) {
        event.preventDefault();
        last?.focus();
      } else if (
        !event.shiftKey &&
        (document.activeElement === last ||
          !menu?.contains(document.activeElement))
      ) {
        event.preventDefault();
        first?.focus();
      }
    }
  });
  window.addEventListener("popstate", () => closeMenu());

  let imageObserver = null;
  function activateImage(image) {
    const src = image.dataset.deferredSrc;
    if (!src) return;
    image.parentElement
      ?.querySelectorAll("source[data-deferred-srcset]")
      .forEach((source) => {
        source.srcset = source.dataset.deferredSrcset ?? "";
        source.removeAttribute("data-deferred-srcset");
      });
    image.loading = "eager";
    image.src = src;
    image.removeAttribute("data-deferred-src");
    image.removeAttribute("data-deferred-case-image");
  }

  function observeImages() {
    imageObserver?.disconnect();
    const images = document.querySelectorAll("img[data-deferred-case-image]");
    if (typeof IntersectionObserver === "undefined") {
      images.forEach(activateImage);
      return;
    }
    imageObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          activateImage(entry.target);
          imageObserver.unobserve(entry.target);
        });
      },
      { rootMargin: "400px 0px" },
    );
    images.forEach((image) => imageObserver.observe(image));
  }
  observeImages();

  let viewportWidth = window.innerWidth;
  const setViewportHeight = () =>
    root.style.setProperty("--vh", `${window.innerHeight * 0.01}px`);
  setViewportHeight();
  window.addEventListener("resize", () => {
    if (viewportWidth === window.innerWidth) return;
    viewportWidth = window.innerWidth;
    setViewportHeight();
  });
  window.addEventListener("orientationchange", setViewportHeight);
  window.addEventListener("pagehide", () => {
    closeMenu();
    imageObserver?.disconnect();
  });
  window.addEventListener("pageshow", (event) => {
    if (!event.persisted) return;
    applyTheme(storedTheme());
    observeImages();
  });
})();
