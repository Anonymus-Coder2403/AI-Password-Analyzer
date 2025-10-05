import { cn } from "@/lib/utils";

interface StrengthBarProps {
  score: number; // 0-4
  className?: string;
}

export const StrengthBar = ({ score, className }: StrengthBarProps) => {
  const segments = 5;
  const filledSegments = score + 1; // 0 -> 1 segment, 4 -> 5 segments
  
  const getSegmentColor = (index: number) => {
    if (index >= filledSegments) return "bg-muted";
    
    if (score === 0) return "bg-red-500";
    if (score === 1) return "bg-orange-500";
    if (score === 2) return "bg-yellow-500";
    if (score === 3) return "bg-lime-500";
    return "bg-green-500";
  };

  return (
    <div className={cn("flex gap-1.5", className)}>
      {Array.from({ length: segments }).map((_, index) => (
        <div
          key={index}
          className={cn(
            "h-2 flex-1 rounded-full transition-all duration-300",
            getSegmentColor(index)
          )}
        />
      ))}
    </div>
  );
};
