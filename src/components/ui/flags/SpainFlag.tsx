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
      {/* Bandeira da Espanha - proporção 3:2 */}
      {/* Faixa vermelha superior */}
      <rect width="3" height="0.5" fill="#C60B1E" />
      {/* Faixa amarela central */}
      <rect y="0.5" width="3" height="1" fill="#FFC400" />
      {/* Faixa vermelha inferior */}
      <rect y="1.5" width="3" height="0.5" fill="#C60B1E" />

      {/* Brasão simplificado no centro */}
      <g transform="translate(1.5, 1) scale(0.3)">
        {/* Escudo base */}
        <path
          d="M-0.5,-0.8 L-0.5,0.5 Q-0.5,0.8 0,0.8 Q0.5,0.8 0.5,0.5 L0.5,-0.8 Z"
          fill="#FFD700"
          stroke="#C60B1E"
          strokeWidth="0.1"
        />
        {/* Detalhes do brasão */}
        <rect x="-0.3" y="-0.6" width="0.6" height="0.4" fill="#C60B1E" />
        <rect x="-0.2" y="-0.1" width="0.4" height="0.3" fill="#C60B1E" />
      </g>
    </svg>
  );
}
