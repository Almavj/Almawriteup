import { cn } from "@/lib/utils";
import { DIFFICULTY_LABELS, Difficulty } from "../types";

interface DifficultyBadgeProps {
  difficulty: Difficulty;
  className?: string;
  size?: "sm" | "md";
}

const difficultyClasses: Record<Difficulty, string> = {
  [Difficulty.easy]: "bg-[oklch(var(--difficulty-easy))]",
  [Difficulty.medium]: "bg-[oklch(var(--difficulty-medium))]",
  [Difficulty.hard]: "bg-[oklch(var(--difficulty-hard))]",
  [Difficulty.insane]: "bg-[oklch(var(--difficulty-insane))]",
};

export function DifficultyBadge({
  difficulty,
  className,
  size = "sm",
}: DifficultyBadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center font-mono font-semibold tracking-wider uppercase text-white rounded",
        size === "sm" ? "px-2 py-0.5 text-[10px]" : "px-3 py-1 text-xs",
        difficultyClasses[difficulty],
        className,
      )}
    >
      {DIFFICULTY_LABELS[difficulty]}
    </span>
  );
}
