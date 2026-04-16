import { cn } from "@/lib/utils";
import { CATEGORY_LABELS, Category } from "../types";

interface CategoryBadgeProps {
  category: Category;
  className?: string;
  size?: "sm" | "md";
}

const categoryClasses: Record<Category, string> = {
  [Category.pwn]: "bg-[oklch(var(--category-pwn))]",
  [Category.web]: "bg-[oklch(var(--category-web))]",
  [Category.crypto]: "bg-[oklch(var(--category-crypto))]",
  [Category.forensics]: "bg-[oklch(var(--category-forensics))]",
  [Category.rev]: "bg-[oklch(var(--category-rev))]",
  [Category.misc]: "bg-[oklch(var(--category-misc))]",
  [Category.osint]: "bg-[oklch(var(--category-osint))]",
};

export function CategoryBadge({
  category,
  className,
  size = "sm",
}: CategoryBadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center font-mono font-semibold tracking-wider uppercase text-white rounded",
        size === "sm" ? "px-2 py-0.5 text-[10px]" : "px-3 py-1 text-xs",
        categoryClasses[category],
        className,
      )}
    >
      {CATEGORY_LABELS[category]}
    </span>
  );
}
