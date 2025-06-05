interface SpainFlagProps {
  size?: number;
}

export function SpainFlag({ size = 16 }: SpainFlagProps) {
  return (
    <svg
      width={size}
      height={size * 0.67}
      viewBox="0 0 3 2"
      className="rounded-sm border border-gray-200"
    >
      {/* Faixa vermelha superior */}
      <rect width="3" height="0.5" fill="#C60B1E" />
      {/* Faixa amarela central */}
      <rect y="0.5" width="3" height="1" fill="#FFC400" />
      {/* Faixa vermelha inferior */}
      <rect y="1.5" width="3" height="0.5" fill="#C60B1E" />
    </svg>
  );
}
