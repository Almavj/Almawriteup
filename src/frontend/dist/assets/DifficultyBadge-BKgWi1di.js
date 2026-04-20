import { j as jsxRuntimeExports, a as cn, C as Category, D as Difficulty } from "./index-Dq0ueDrX.js";
import { C as CATEGORY_LABELS, D as DIFFICULTY_LABELS } from "./useBackend-f3qlnDla.js";
const categoryClasses = {
  [Category.pwn]: "bg-[oklch(var(--category-pwn))]",
  [Category.web]: "bg-[oklch(var(--category-web))]",
  [Category.crypto]: "bg-[oklch(var(--category-crypto))]",
  [Category.forensics]: "bg-[oklch(var(--category-forensics))]",
  [Category.rev]: "bg-[oklch(var(--category-rev))]",
  [Category.misc]: "bg-[oklch(var(--category-misc))]",
  [Category.osint]: "bg-[oklch(var(--category-osint))]"
};
function CategoryBadge({
  category,
  className,
  size = "sm"
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "span",
    {
      className: cn(
        "inline-flex items-center font-mono font-semibold tracking-wider uppercase text-white rounded",
        size === "sm" ? "px-2 py-0.5 text-[10px]" : "px-3 py-1 text-xs",
        categoryClasses[category],
        className
      ),
      children: CATEGORY_LABELS[category]
    }
  );
}
const difficultyClasses = {
  [Difficulty.easy]: "bg-[oklch(var(--difficulty-easy))]",
  [Difficulty.medium]: "bg-[oklch(var(--difficulty-medium))]",
  [Difficulty.hard]: "bg-[oklch(var(--difficulty-hard))]",
  [Difficulty.insane]: "bg-[oklch(var(--difficulty-insane))]"
};
function DifficultyBadge({
  difficulty,
  className,
  size = "sm"
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "span",
    {
      className: cn(
        "inline-flex items-center font-mono font-semibold tracking-wider uppercase text-white rounded",
        size === "sm" ? "px-2 py-0.5 text-[10px]" : "px-3 py-1 text-xs",
        difficultyClasses[difficulty],
        className
      ),
      children: DIFFICULTY_LABELS[difficulty]
    }
  );
}
export {
  CategoryBadge as C,
  DifficultyBadge as D
};
