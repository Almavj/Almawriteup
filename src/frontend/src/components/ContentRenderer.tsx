import { cn } from "@/lib/utils";
import type { ContentBlock, WriteupContent } from "../types";
import { CodeBlock } from "./CodeBlock";
import { ImageBlock } from "./ImageBlock";
import DOMPurify from "dompurify";

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
          dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(block.content) }}
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

    case "file":
      return (
        <div
          key={index}
          className="flex items-center gap-3 p-3 bg-card border border-border rounded-lg hover:border-primary/50 transition-colors"
        >
          <svg className="w-8 h-8 text-primary flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4" />
          </svg>
          <div className="flex-1 min-w-0">
            <p className="font-mono text-sm text-foreground truncate">
              {block.filename}
            </p>
            {block.description && (
              <p className="font-mono text-xs text-muted-foreground truncate">
                {block.description}
              </p>
            )}
          </div>
          <a
            href={block.url}
            download={block.filename}
            className="px-3 py-1.5 bg-primary text-primary-foreground rounded-md font-mono text-xs hover:bg-primary/90 transition-colors"
          >
            Download
          </a>
        </div>
      );

    case "link":
      return (
        <a
          key={index}
          href={block.url}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-3 p-3 bg-card border border-border rounded-lg hover:border-primary/50 transition-colors"
        >
          <svg className="w-8 h-8 text-primary flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
          </svg>
          <span className="font-mono text-sm text-foreground truncate">
            {block.label || block.url}
          </span>
          <svg className="w-4 h-4 text-muted-foreground flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
          </svg>
        </a>
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
