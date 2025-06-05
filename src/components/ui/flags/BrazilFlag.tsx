import { cn } from "@/lib/utils";

interface BrazilFlagProps {
  className?: string;
  size?: number;
}

export function BrazilFlag({ className, size = 20 }: BrazilFlagProps) {
  return (
    <svg
      width={size}
      height={size * 0.7}
      viewBox="0 0 28 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={cn("inline-block", className)}
    >
      {/* Background verde */}
      <rect width="28" height="20" fill="#009B3A" />

      {/* Losango amarelo */}
      <path d="M14 2L26 10L14 18L2 10L14 2Z" fill="#FEDF00" />

      {/* Círculo azul */}
      <circle cx="14" cy="10" r="3.5" fill="#002776" />

      {/* Faixa branca */}
      <path
        d="M11 8.5C11.5 9 12.5 9.5 14 9.5C15.5 9.5 16.5 9 17 8.5"
        stroke="#FFFFFF"
        strokeWidth="0.5"
        fill="none"
      />
      <path
        d="M11 11.5C11.5 11 12.5 10.5 14 10.5C15.5 10.5 16.5 11 17 11.5"
        stroke="#FFFFFF"
        strokeWidth="0.5"
        fill="none"
      />
    </svg>
  );
}
