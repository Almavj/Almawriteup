import { cn } from "@/lib/utils";
import { Link } from "@tanstack/react-router";
import { Calendar, Tag } from "lucide-react";
import type { Writeup } from "../types";
import { CategoryBadge } from "./CategoryBadge";
import { DifficultyBadge } from "./DifficultyBadge";

interface WriteupCardProps {
  writeup: Writeup;
  index?: number;
  className?: string;
}

function getPreviewText(content: string): string {
  try {
    const parsed = JSON.parse(content) as {
      blocks?: Array<{ type: string; content?: string }>;
    };
    const block = parsed.blocks?.find(
      (b) => b.type === "paragraph" && b.content,
    );
    const raw = block?.content ?? "";
    return raw.replace(/<[^>]*>/g, "").slice(0, 150);
  } catch {
    return content.slice(0, 150);
  }
}

export function WriteupCard({
  writeup,
  index = 0,
  className,
}: WriteupCardProps) {
  const preview = getPreviewText(writeup.content);

  return (
    <Link
      to="/writeup/$slug"
      params={{ slug: writeup.slug }}
      data-ocid={`writeup.item.${index + 1}`}
      className={cn(
        "group block rounded-lg border border-border bg-card hover:border-primary/50",
        "transition-smooth hover:shadow-[0_0_20px_oklch(var(--primary)/0.1)]",
        "overflow-hidden",
        className,
      )}
    >
      {/* Terminal header dots */}
      <div className="flex items-center gap-1.5 px-4 py-2.5 border-b border-border bg-muted/30">
        <span className="w-2.5 h-2.5 rounded-full bg-[oklch(var(--category-rev))] opacity-70" />
        <span className="w-2.5 h-2.5 rounded-full bg-[oklch(var(--category-osint))] opacity-70" />
        <span className="w-2.5 h-2.5 rounded-full bg-[oklch(var(--category-misc))] opacity-70" />
        <span className="ml-auto font-mono text-[10px] text-muted-foreground">
          {writeup.slug}
        </span>
      </div>

      <div className="p-4 space-y-3">
        {/* Badges row */}
        <div className="flex flex-wrap gap-1.5">
          <CategoryBadge category={writeup.category} />
          <DifficultyBadge difficulty={writeup.difficulty} />
        </div>

        {/* Title */}
        <h3 className="font-display font-semibold text-foreground text-base leading-snug group-hover:text-primary transition-colors line-clamp-2">
          {writeup.title}
        </h3>

        {/* Preview */}
        {preview && (
          <p className="text-sm text-muted-foreground line-clamp-2 font-body leading-relaxed">
            {preview}
            {preview.length >= 150 ? "…" : ""}
          </p>
        )}

        {/* Footer: date + tags */}
        <div className="flex items-center justify-between pt-1 gap-2 flex-wrap">
          <div className="flex items-center gap-1.5 text-muted-foreground">
            <Calendar className="w-3 h-3" />
            <span className="font-mono text-[11px]">{writeup.dateSolved}</span>
          </div>
          {writeup.tags.length > 0 && (
            <div className="flex items-center gap-1 flex-wrap">
              <Tag className="w-3 h-3 text-muted-foreground" />
              {writeup.tags.slice(0, 3).map((tag) => (
                <span
                  key={tag}
                  className="font-mono text-[10px] px-1.5 py-0.5 rounded bg-muted text-muted-foreground border border-border"
                >
                  {tag}
                </span>
              ))}
              {writeup.tags.length > 3 && (
                <span className="font-mono text-[10px] text-muted-foreground">
                  +{writeup.tags.length - 3}
                </span>
              )}
            </div>
          )}
        </div>
      </div>
    </Link>
  );
}
