import { cn } from "@/lib/utils";
import { Link, useParams } from "@tanstack/react-router";
import {
  ArrowLeft,
  Calendar,
  ChevronDown,
  ChevronUp,
  Copy,
  Eye,
  EyeOff,
  Linkedin,
  Twitter,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { toast } from "sonner";
import { CategoryBadge } from "../components/CategoryBadge";
import {
  ContentRenderer,
  extractHeadings,
} from "../components/ContentRenderer";
import { DifficultyBadge } from "../components/DifficultyBadge";
import { Layout } from "../components/Layout";
import { WriteupCard } from "../components/WriteupCard";
import { useRelatedWriteups, useWriteup } from "../hooks/useBackend";

// ——— Skeleton ———
function WriteupSkeleton() {
  return (
    <div className="animate-pulse space-y-6" data-ocid="writeup.loading_state">
      <div className="h-8 bg-muted rounded w-3/4" />
      <div className="flex gap-2">
        <div className="h-5 bg-muted rounded w-16" />
        <div className="h-5 bg-muted rounded w-16" />
        <div className="h-5 bg-muted rounded w-24" />
      </div>
      <div className="flex gap-2">
        {[1, 2, 3].map((i) => (
          <div key={i} className="h-5 bg-muted rounded w-14" />
        ))}
      </div>
      <div className="flex gap-8 mt-6">
        <div className="flex-1 space-y-3">
          <div className="h-4 bg-muted rounded w-full" />
          <div className="h-4 bg-muted rounded w-5/6" />
          <div className="h-4 bg-muted rounded w-4/6" />
          <div className="h-20 bg-muted rounded w-full mt-4" />
          <div className="h-4 bg-muted rounded w-5/6" />
          <div className="h-4 bg-muted rounded w-full" />
        </div>
        <div className="hidden lg:block w-56 shrink-0 space-y-2">
          <div className="h-4 bg-muted rounded w-3/4" />
          <div className="h-3 bg-muted rounded w-full" />
          <div className="h-3 bg-muted rounded w-5/6" />
          <div className="h-3 bg-muted rounded w-4/6 ml-4" />
          <div className="h-3 bg-muted rounded w-full" />
        </div>
      </div>
    </div>
  );
}

// ——— TOC types ———
interface TocItem {
  id: string;
  text: string;
  level: number;
}

// ——— TOC List (shared between mobile & desktop) ———
function TocList({
  items,
  activeId,
}: {
  items: TocItem[];
  activeId: string;
}) {
  return (
    <ul className="space-y-0.5">
      {items.map((item) => (
        <li key={item.id} className={item.level === 3 ? "pl-4" : ""}>
          <a
            href={`#${item.id}`}
            data-ocid="writeup.toc.link"
            onClick={(e) => {
              e.preventDefault();
              document
                .getElementById(item.id)
                ?.scrollIntoView({ behavior: "smooth" });
            }}
            className={cn(
              "block text-xs font-mono py-0.5 px-2 rounded transition-colors duration-150 leading-relaxed",
              "hover:text-foreground hover:bg-muted/50",
              item.level === 3 ? "text-[11px]" : "",
              activeId === item.id
                ? "text-primary bg-primary/10 font-semibold"
                : "text-muted-foreground",
            )}
          >
            <span className="opacity-50 mr-1">
              {item.level === 2 ? "#" : "##"}
            </span>
            {item.text}
          </a>
        </li>
      ))}
    </ul>
  );
}

// ——— Table of Contents (mobile accordion + desktop sidebar) ———
function TableOfContents({
  items,
  activeId,
  desktopOnly,
  mobileOnly,
}: {
  items: TocItem[];
  activeId: string;
  desktopOnly?: boolean;
  mobileOnly?: boolean;
}) {
  const [mobileOpen, setMobileOpen] = useState(false);

  if (items.length === 0) return null;

  // Desktop sticky sidebar
  if (desktopOnly) {
    return (
      <aside
        className="hidden lg:block w-56 shrink-0"
        data-ocid="writeup.toc.sidebar"
      >
        <div className="sticky top-24 rounded-lg border border-border bg-card p-4">
          <div className="flex items-center gap-1.5 mb-3 pb-2 border-b border-border">
            <span className="font-mono text-[10px] text-primary">$</span>
            <span className="font-mono text-[11px] text-foreground font-semibold tracking-wide uppercase">
              Contents
            </span>
          </div>
          <TocList items={items} activeId={activeId} />
        </div>
      </aside>
    );
  }

  // Mobile collapsible
  if (mobileOnly) {
    return (
      <div
        className="lg:hidden mb-6 rounded-lg border border-border bg-card overflow-hidden"
        data-ocid="writeup.toc.mobile"
      >
        <button
          type="button"
          data-ocid="writeup.toc.toggle"
          onClick={() => setMobileOpen((o) => !o)}
          className="w-full flex items-center gap-1.5 px-4 py-3 text-sm font-mono font-semibold text-foreground hover:bg-muted/30 transition-colors"
        >
          <span className="text-primary text-xs">$</span>
          <span className="flex-1 text-left text-xs">table_of_contents</span>
          {mobileOpen ? (
            <ChevronUp className="w-4 h-4 text-muted-foreground" />
          ) : (
            <ChevronDown className="w-4 h-4 text-muted-foreground" />
          )}
        </button>
        {mobileOpen && (
          <div className="px-3 pb-3 pt-1 border-t border-border">
            <TocList items={items} activeId={activeId} />
          </div>
        )}
      </div>
    );
  }

  return null;
}

// ——— Flag Section ———
function FlagSection({
  flag,
  flagHidden,
}: {
  flag: string;
  flagHidden: boolean;
}) {
  const [revealed, setRevealed] = useState(!flagHidden);

  return (
    <div
      className="mt-10 rounded-lg border border-primary/30 bg-primary/5 overflow-hidden"
      data-ocid="writeup.flag.section"
    >
      {/* Terminal header bar */}
      <div className="flex items-center gap-1.5 px-4 py-2 border-b border-primary/20 bg-primary/10">
        <span className="w-2 h-2 rounded-full bg-destructive opacity-70" />
        <span className="w-2 h-2 rounded-full bg-[oklch(var(--difficulty-medium))] opacity-70" />
        <span className="w-2 h-2 rounded-full bg-[oklch(var(--difficulty-easy))] opacity-70" />
        <span className="ml-2 font-mono text-[11px] text-primary font-semibold tracking-wide">
          flag.txt
        </span>
      </div>
      <div className="p-4 flex items-center gap-4 flex-wrap">
        <code
          role={!revealed ? "button" : undefined}
          tabIndex={!revealed ? 0 : undefined}
          className={cn(
            "font-mono text-sm text-primary bg-[oklch(var(--code-bg))] px-3 py-2 rounded",
            "border border-[oklch(var(--code-border))] flex-1 min-w-0 break-all",
            !revealed ? "blur-sm select-none cursor-pointer" : "select-all",
          )}
          onClick={() => !revealed && setRevealed(true)}
          onKeyDown={(e) => {
            if (!revealed && (e.key === "Enter" || e.key === " ")) {
              setRevealed(true);
            }
          }}
        >
          {flag || "flag{hidden}"}
        </code>
        <button
          type="button"
          data-ocid="writeup.flag.reveal_button"
          onClick={() => setRevealed((r) => !r)}
          className={cn(
            "shrink-0 flex items-center gap-1.5 font-mono text-xs px-3 py-2 rounded border transition-smooth",
            revealed
              ? "border-border text-muted-foreground hover:text-foreground"
              : "border-primary text-primary hover:bg-primary/10",
          )}
        >
          {revealed ? (
            <>
              <EyeOff className="w-3.5 h-3.5" />
              <span>Hide</span>
            </>
          ) : (
            <>
              <Eye className="w-3.5 h-3.5" />
              <span>Reveal Flag</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
}

// ——— Share Buttons ———
function ShareButtons({ title, url }: { title: string; url: string }) {
  const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(url)}`;
  const linkedinUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`;

  function copyLink() {
    navigator.clipboard.writeText(url).then(() => {
      toast.success("Link copied!", { duration: 3000 });
    });
  }

  const btnCls =
    "flex items-center gap-1.5 font-mono text-xs px-3 py-1.5 rounded border border-border text-muted-foreground hover:text-foreground hover:border-primary/50 transition-smooth";

  return (
    <div className="flex items-center gap-2" data-ocid="writeup.share.section">
      <span className="font-mono text-[11px] text-muted-foreground mr-1 hidden sm:inline">
        share:
      </span>
      <a
        href={twitterUrl}
        target="_blank"
        rel="noopener noreferrer"
        data-ocid="writeup.share.twitter_button"
        className={btnCls}
        aria-label="Share on Twitter"
      >
        <Twitter className="w-3.5 h-3.5" />
        <span className="hidden sm:inline">Twitter</span>
      </a>
      <a
        href={linkedinUrl}
        target="_blank"
        rel="noopener noreferrer"
        data-ocid="writeup.share.linkedin_button"
        className={btnCls}
        aria-label="Share on LinkedIn"
      >
        <Linkedin className="w-3.5 h-3.5" />
        <span className="hidden sm:inline">LinkedIn</span>
      </a>
      <button
        type="button"
        data-ocid="writeup.share.copy_button"
        onClick={copyLink}
        className={btnCls}
        aria-label="Copy link"
      >
        <Copy className="w-3.5 h-3.5" />
        <span className="hidden sm:inline">Copy</span>
      </button>
    </div>
  );
}

// ——— Helpers ———
function formatDate(dateStr: string): string {
  try {
    const d = new Date(dateStr);
    if (Number.isNaN(d.getTime())) return dateStr;
    return d.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  } catch {
    return dateStr;
  }
}

function getFirstTextDescription(content: string): string {
  try {
    const parsed = JSON.parse(content) as {
      blocks?: Array<{ type: string; content?: string }>;
    };
    const block = parsed.blocks?.find(
      (b) => b.type === "paragraph" && b.content,
    );
    return (block?.content ?? "").replace(/<[^>]*>/g, "").slice(0, 160);
  } catch {
    return content.slice(0, 160);
  }
}

// ——— Main Page Component ———
export function WriteupPage() {
  const { slug } = useParams({ from: "/writeup/$slug" });
  const { data: writeup, isLoading, isError } = useWriteup(slug);
  const { data: related } = useRelatedWriteups(writeup?.id ?? null, 3);

  const [activeId, setActiveId] = useState("");
  const observerRef = useRef<IntersectionObserver | null>(null);

  const currentUrl = typeof window !== "undefined" ? window.location.href : "";

  const headings: TocItem[] = writeup?.content
    ? extractHeadings(writeup.content)
    : [];

  // SEO meta tags
  useEffect(() => {
    if (!writeup) return;
    document.title = `${writeup.title} | CTF Writeups`;
    const description = getFirstTextDescription(writeup.content);

    function setMeta(name: string, content: string, isProp = false) {
      const attr = isProp ? "property" : "name";
      let el = document.querySelector<HTMLMetaElement>(
        `meta[${attr}="${name}"]`,
      );
      if (!el) {
        el = document.createElement("meta");
        el.setAttribute(attr, name);
        document.head.appendChild(el);
      }
      el.content = content;
    }

    setMeta("description", description);
    setMeta("og:title", writeup.title, true);
    setMeta("og:description", description, true);

    return () => {
      document.title = "CTF Writeups";
    };
  }, [writeup]);

  // IntersectionObserver for active TOC item
  useEffect(() => {
    if (headings.length === 0) return;

    observerRef.current?.disconnect();
    observerRef.current = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
            break;
          }
        }
      },
      { rootMargin: "-80px 0px -60% 0px", threshold: 0 },
    );

    for (const h of headings) {
      const el = document.getElementById(h.id);
      if (el) observerRef.current.observe(el);
    }

    return () => observerRef.current?.disconnect();
  }, [headings]);

  // ——— Loading ———
  if (isLoading) {
    return (
      <Layout>
        <div className="max-w-5xl mx-auto px-4 py-10">
          <WriteupSkeleton />
        </div>
      </Layout>
    );
  }

  // ——— Error / Not Found ———
  if (isError || !writeup) {
    return (
      <Layout>
        <div
          className="max-w-2xl mx-auto px-4 py-24 text-center"
          data-ocid="writeup.error_state"
        >
          <div className="font-mono text-6xl font-bold text-primary mb-4">
            404
          </div>
          <h1 className="font-display text-2xl font-semibold text-foreground mb-2">
            Writeup not found
          </h1>
          <p className="text-muted-foreground text-sm mb-8 font-body">
            The writeup{" "}
            <code className="font-mono text-primary bg-muted px-1 py-0.5 rounded text-xs">
              /{slug}
            </code>{" "}
            doesn&apos;t exist or was removed.
          </p>
          <Link
            to="/"
            data-ocid="writeup.back_home_link"
            className="inline-flex items-center gap-2 font-mono text-sm text-primary border border-primary/50 px-4 py-2 rounded hover:bg-primary/10 transition-smooth"
          >
            <ArrowLeft className="w-4 h-4" />
            cd ../writeups
          </Link>
        </div>
      </Layout>
    );
  }

  const hasFlag = !!writeup.flag;
  const relatedList = (related ?? []).filter((r) => r.id !== writeup.id);

  return (
    <Layout>
      <article
        className="max-w-5xl mx-auto px-4 sm:px-6 py-8 lg:py-10"
        data-ocid="writeup.page"
      >
        {/* Back nav */}
        <Link
          to="/"
          data-ocid="writeup.back_link"
          className="inline-flex items-center gap-1.5 font-mono text-xs text-muted-foreground hover:text-primary transition-colors mb-7 group"
        >
          <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-0.5 transition-transform duration-150" />
          cd ..
        </Link>

        {/* ——— Page header ——— */}
        <header className="mb-8 space-y-4" data-ocid="writeup.header">
          {/* Title */}
          <h1 className="font-display text-2xl sm:text-3xl lg:text-4xl font-bold text-foreground leading-tight">
            {writeup.title}
          </h1>

          {/* Badges + date */}
          <div className="flex flex-wrap items-center gap-2">
            <CategoryBadge category={writeup.category} size="md" />
            <DifficultyBadge difficulty={writeup.difficulty} size="md" />
            <div className="flex items-center gap-1.5 text-muted-foreground ml-1">
              <Calendar className="w-3.5 h-3.5" />
              <span className="font-mono text-xs">
                {formatDate(writeup.date_solved)}
              </span>
            </div>
          </div>

          {/* Tags */}
          {writeup.tags.length > 0 && (
            <div
              className="flex flex-wrap gap-1.5"
              data-ocid="writeup.tags.list"
            >
              {writeup.tags.map((tag) => (
                <Link
                  key={tag}
                  to="/"
                  search={{ tags: tag } as Record<string, string>}
                  data-ocid="writeup.tag.link"
                  className="font-mono text-[11px] px-2 py-0.5 rounded border border-border bg-muted/50 text-muted-foreground hover:text-primary hover:border-primary/50 transition-colors"
                >
                  #{tag}
                </Link>
              ))}
            </div>
          )}

          {/* Share buttons (right-aligned on desktop) */}
          <div className="flex justify-start sm:justify-end pt-1">
            <ShareButtons title={writeup.title} url={currentUrl} />
          </div>
        </header>

        {/* ——— Mobile TOC (before content) ——— */}
        <TableOfContents items={headings} activeId={activeId} mobileOnly />

        {/* ——— Two-column layout ——— */}
        <div className="flex gap-10 items-start">
          {/* Content column */}
          <div className="flex-1 min-w-0" data-ocid="writeup.content">
            <ContentRenderer content={writeup.content} />

            {/* Flag */}
            {hasFlag && (
              <FlagSection
                flag={writeup.flag}
                flagHidden={writeup.flag_hidden}
              />
            )}
          </div>

          {/* Desktop TOC sidebar */}
          <TableOfContents items={headings} activeId={activeId} desktopOnly />
        </div>

        {/* ——— Related Writeups ——— */}
        {relatedList.length > 0 && (
          <section
            className="mt-16 pt-8 border-t border-border"
            data-ocid="writeup.related.section"
          >
            <div className="flex items-center gap-2 mb-6">
              <span className="font-mono text-sm text-primary">$</span>
              <h2 className="font-display text-xl font-semibold text-foreground">
                Related Writeups
              </h2>
            </div>
            <div
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
              data-ocid="writeup.related.list"
            >
              {relatedList.map((r, i) => (
                <WriteupCard key={r.id.toString()} writeup={r} index={i} />
              ))}
            </div>
          </section>
        )}
      </article>
    </Layout>
  );
}
