import { cn } from "@/lib/utils";

interface USAFlagProps {
  className?: string;
  size?: number;
}

export function USAFlag({ className, size = 20 }: USAFlagProps) {
  return (
    <svg
      width={size}
      height={size * 0.7}
      viewBox="0 0 28 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={cn("inline-block", className)}
    >
      {/* Background vermelho */}
      <rect width="28" height="20" fill="#B22234" />

      {/* Listras brancas */}
      <rect y="1.5" width="28" height="1.5" fill="#FFFFFF" />
      <rect y="4.5" width="28" height="1.5" fill="#FFFFFF" />
      <rect y="7.5" width="28" height="1.5" fill="#FFFFFF" />
      <rect y="10.5" width="28" height="1.5" fill="#FFFFFF" />
      <rect y="13.5" width="28" height="1.5" fill="#FFFFFF" />
      <rect y="16.5" width="28" height="1.5" fill="#FFFFFF" />

      {/* Campo azul das estrelas */}
      <rect width="11" height="10" fill="#3C3B6E" />

      {/* Estrelas simplificadas (pontos brancos) */}
      <circle cx="2" cy="1.5" r="0.3" fill="#FFFFFF" />
      <circle cx="4" cy="1.5" r="0.3" fill="#FFFFFF" />
      <circle cx="6" cy="1.5" r="0.3" fill="#FFFFFF" />
      <circle cx="8" cy="1.5" r="0.3" fill="#FFFFFF" />
      <circle cx="10" cy="1.5" r="0.3" fill="#FFFFFF" />

      <circle cx="3" cy="3" r="0.3" fill="#FFFFFF" />
      <circle cx="5" cy="3" r="0.3" fill="#FFFFFF" />
      <circle cx="7" cy="3" r="0.3" fill="#FFFFFF" />
      <circle cx="9" cy="3" r="0.3" fill="#FFFFFF" />

      <circle cx="2" cy="4.5" r="0.3" fill="#FFFFFF" />
      <circle cx="4" cy="4.5" r="0.3" fill="#FFFFFF" />
      <circle cx="6" cy="4.5" r="0.3" fill="#FFFFFF" />
      <circle cx="8" cy="4.5" r="0.3" fill="#FFFFFF" />
      <circle cx="10" cy="4.5" r="0.3" fill="#FFFFFF" />

      <circle cx="3" cy="6" r="0.3" fill="#FFFFFF" />
      <circle cx="5" cy="6" r="0.3" fill="#FFFFFF" />
      <circle cx="7" cy="6" r="0.3" fill="#FFFFFF" />
      <circle cx="9" cy="6" r="0.3" fill="#FFFFFF" />

      <circle cx="2" cy="7.5" r="0.3" fill="#FFFFFF" />
      <circle cx="4" cy="7.5" r="0.3" fill="#FFFFFF" />
      <circle cx="6" cy="7.5" r="0.3" fill="#FFFFFF" />
      <circle cx="8" cy="7.5" r="0.3" fill="#FFFFFF" />
      <circle cx="10" cy="7.5" r="0.3" fill="#FFFFFF" />
    </svg>
  );
}
