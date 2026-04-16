import { cn } from "@/lib/utils";
import type { ContentBlock, WriteupContent } from "../types";
import { CodeBlock } from "./CodeBlock";
import { ImageBlock } from "./ImageBlock";

interface ContentRendererProps {
  content: string;
  className?: string;
}

function renderBlock(block: ContentBlock, index: number) {
  switch (block.type) {
    case "paragraph":
      return (
        <div
          key={index}
          className="prose prose-invert prose-sm max-w-none text-foreground/90 leading-relaxed"
          // biome-ignore lint/security/noDangerouslySetInnerHtml: trusted content from admin editor
          dangerouslySetInnerHTML={{ __html: block.content }}
        />
      );

    case "heading":
      if (block.level === 2) {
        return (
          <h2
            key={index}
            id={block.id}
            className="text-xl font-display font-semibold text-foreground mt-8 mb-3 pb-2 border-b border-border"
          >
            {block.content}
          </h2>
        );
      }
      return (
        <h3
          key={index}
          id={block.id}
          className="text-lg font-display font-semibold text-foreground mt-6 mb-2"
        >
          {block.content}
        </h3>
      );

    case "list":
      if (block.ordered) {
        return (
          <ol
            key={index}
            className="list-decimal list-inside space-y-1.5 pl-2 text-foreground/90"
          >
            {block.items.map((item, idx) => (
              // biome-ignore lint/suspicious/noArrayIndexKey: list items may not be unique strings
              <li key={`li-${idx}`} className="text-sm leading-relaxed">
                {item}
              </li>
            ))}
          </ol>
        );
      }
      return (
        <ul
          key={index}
          className="list-disc list-inside space-y-1.5 pl-2 text-foreground/90"
        >
          {block.items.map((item, idx) => (
            // biome-ignore lint/suspicious/noArrayIndexKey: list items may not be unique strings
            <li key={`li-${idx}`} className="text-sm leading-relaxed">
              {item}
            </li>
          ))}
        </ul>
      );

    case "code":
      return (
        <CodeBlock
          key={index}
          code={block.code}
          language={block.language}
          lineNumbers={block.lineNumbers ?? true}
          filename={block.filename}
        />
      );

    case "image":
      return (
        <ImageBlock
          key={index}
          url={block.url}
          caption={block.caption}
          alt={block.alt}
        />
      );

    case "divider":
      return <hr key={index} className="border-border my-8" />;

    case "note": {
      const noteStyles = {
        info: "border-primary/40 bg-primary/5 text-primary",
        warning:
          "border-[oklch(var(--difficulty-medium))] bg-[oklch(var(--difficulty-medium)/0.08)] text-[oklch(var(--difficulty-medium))]",
        success:
          "border-[oklch(var(--difficulty-easy))] bg-[oklch(var(--difficulty-easy)/0.08)] text-[oklch(var(--difficulty-easy))]",
        danger: "border-destructive/40 bg-destructive/5 text-destructive",
      };
      return (
        <div
          key={index}
          className={cn(
            "rounded-lg border-l-4 px-4 py-3 text-sm font-body",
            noteStyles[block.variant],
          )}
        >
          {block.content}
        </div>
      );
    }

    default:
      return null;
  }
}

export function ContentRenderer({ content, className }: ContentRendererProps) {
  let parsed: WriteupContent | null = null;

  try {
    parsed = JSON.parse(content) as WriteupContent;
  } catch {
    // Fallback: render as plain paragraph
    return (
      <div className={cn("space-y-4", className)}>
        <p className="text-foreground/90 leading-relaxed text-sm">{content}</p>
      </div>
    );
  }

  if (!parsed?.blocks || !Array.isArray(parsed.blocks)) {
    return (
      <div className={cn("space-y-4", className)}>
        <p className="text-foreground/90 leading-relaxed text-sm">{content}</p>
      </div>
    );
  }

  return (
    <div className={cn("space-y-5", className)}>
      {parsed.blocks.map((block, i) => renderBlock(block, i))}
    </div>
  );
}

// Extract headings for Table of Contents
export function extractHeadings(
  content: string,
): Array<{ id: string; text: string; level: number }> {
  try {
    const parsed = JSON.parse(content) as WriteupContent;
    return (parsed.blocks ?? [])
      .filter(
        (b): b is Extract<ContentBlock, { type: "heading" }> =>
          b.type === "heading",
      )
      .map((b, i) => ({
        id: b.id ?? `heading-${i}`,
        text: b.content,
        level: b.level,
      }));
  } catch {
    return [];
  }
}
