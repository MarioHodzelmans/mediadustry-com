type ArrowIconProps = {
  direction?: "right" | "down-right";
  className?: string;
};

export default function ArrowIcon({
  direction = "right",
  className,
}: ArrowIconProps) {
  const diagonal = direction === "down-right";

  return (
    <svg
      aria-hidden="true"
      focusable="false"
      className={className}
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {diagonal ? (
        <path d="M5 5h10v10M15 5 5 15" stroke="currentColor" strokeWidth="1.6" />
      ) : (
        <path d="M3 10h14M12 5l5 5-5 5" stroke="currentColor" strokeWidth="1.6" />
      )}
    </svg>
  );
}
