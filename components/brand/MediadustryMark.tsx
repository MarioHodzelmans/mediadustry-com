type MediadustryMarkProps = {
  className?: string;
};

export default function MediadustryMark({ className }: MediadustryMarkProps) {
  return (
    <svg
      className={className}
      viewBox="0 0 277.27 274.73"
      role="img"
      aria-label="MEDIADUSTRY beeldmerk"
    >
      <polygon
        fill="currentColor"
        points="0 188.61 48.85 188.61 48.85 46.02 97.98 46.02 139.12 107.29 178.61 53.36 178.61 0 0 0 0 188.61"
      />
      <polygon
        fill="currentColor"
        points="99.11 118.31 142.02 176.47 182.68 116.89 182.68 228.71 229.83 228.71 229.83 85.84 277.27 85.84 277.27 274.73 99.11 274.73 99.11 118.31"
      />
    </svg>
  );
}
