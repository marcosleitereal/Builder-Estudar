import { cn } from "@/lib/utils";

interface ProgressBarProps {
  progress: number;
  isAnimating?: boolean;
  className?: string;
}

export function ProgressBar({
  progress,
  isAnimating = false,
  className,
}: ProgressBarProps) {
  return (
    <div className={cn("w-full", className)}>
      <div className="flex justify-between text-sm text-muted-foreground mb-2">
        <span>Generating study material...</span>
        <span>{Math.round(progress)}%</span>
      </div>
      <div className="w-full bg-muted rounded-full h-3 overflow-hidden">
        <div
          className={cn(
            "h-full bg-gradient-to-r from-burnt-500 to-terracotta-500 rounded-full transition-all duration-500 ease-out relative",
            isAnimating && "animate-pulse",
          )}
          style={{ width: `${progress}%` }}
        >
          {isAnimating && (
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-progress-pulse"></div>
          )}
        </div>
      </div>
      {isAnimating && (
        <div className="mt-2 text-xs text-muted-foreground animate-pulse">
          AI is analyzing your content and creating personalized materials...
        </div>
      )}
    </div>
  );
}
