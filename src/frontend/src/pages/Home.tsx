import { cn } from "@/lib/utils";
import { Link } from "@tanstack/react-router";
import {
  ChevronLeft,
  ChevronRight,
  Filter,
  Search,
  SlidersHorizontal,
  X,
} from "lucide-react";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { CategoryBadge } from "../components/CategoryBadge";
import { DifficultyBadge } from "../components/DifficultyBadge";
import { Layout } from "../components/Layout";
import { WriteupCard } from "../components/WriteupCard";
import { useAllPublishedWriteups, useTags } from "../hooks/useBackend";
import { Category, Difficulty, type Writeup } from "../types";

const PAGE_SIZE = 10;

const DIFFICULTY_RANK: Record<Difficulty, number> = {
  [Difficulty.easy]: 0,
  [Difficulty.medium]: 1,
  [Difficulty.hard]: 2,
  [Difficulty.insane]: 3,
};

const ALL_CATEGORIES = Object.values(Category) as Category[];
const ALL_DIFFICULTIES = Object.values(Difficulty) as Difficulty[];

// ——— URL param helpers ———
function getParam(search: URLSearchParams, key: string): string {
  return search.get(key) ?? "";
}
function getMultiParam(search: URLSearchParams, key: string): string[] {
  const val = search.get(key);
  return val ? val.split(",").filter(Boolean) : [];
}

// ——— Skeleton card ———
function SkeletonCard() {
  return (
    <div className="rounded-lg border border-border bg-card overflow-hidden animate-pulse">
      <div className="flex items-center gap-1.5 px-4 py-2.5 border-b border-border bg-muted/30">
        <span className="w-2.5 h-2.5 rounded-full bg-muted" />
        <span className="w-2.5 h-2.5 rounded-full bg-muted" />
        <span className="w-2.5 h-2.5 rounded-full bg-muted" />
        <span className="ml-auto w-24 h-3 rounded bg-muted" />
      </div>
      <div className="p-4 space-y-3">
        <div className="flex gap-1.5">
          <span className="w-14 h-4 rounded bg-muted" />
          <span className="w-14 h-4 rounded bg-muted" />
        </div>
        <div className="w-3/4 h-4 rounded bg-muted" />
        <div className="space-y-1.5">
          <div className="w-full h-3 rounded bg-muted/70" />
          <div className="w-2/3 h-3 rounded bg-muted/70" />
        </div>
        <div className="flex justify-between pt-1">
          <div className="w-20 h-3 rounded bg-muted/50" />
          <div className="w-28 h-3 rounded bg-muted/50" />
        </div>
      </div>
    </div>
  );
}

// ——— Stats bar ———
function StatsBar({
  total,
  filtered,
  writeups,
}: {
  total: number;
  filtered: number;
  writeups: Writeup[];
}) {
  const counts = useMemo(() => {
    const c: Partial<Record<Difficulty, number>> = {};
    for (const w of writeups) {
      c[w.difficulty] = (c[w.difficulty] ?? 0) + 1;
    }
    return c;
  }, [writeups]);

  return (
    <div className="flex flex-wrap items-center gap-x-4 gap-y-1.5 px-3 py-2.5 rounded-lg bg-muted/30 border border-border font-mono text-xs text-muted-foreground">
      <span>
        <span className="text-foreground font-semibold">{filtered}</span>
        {filtered !== total ? ` of ${total}` : ""} writeup
        {total !== 1 ? "s" : ""}
      </span>
      <span className="text-border">|</span>
      {ALL_DIFFICULTIES.map((d) =>
        counts[d] ? (
          <span key={d} className="flex items-center gap-1">
            <DifficultyBadge difficulty={d} size="sm" />
            <span>{counts[d]}</span>
          </span>
        ) : null,
      )}
    </div>
  );
}

// ——— Filter panel ———
interface FilterPanelProps {
  selectedCategories: Category[];
  selectedDifficulties: Difficulty[];
  selectedTags: string[];
  allTags: string[];
  onToggleCategory: (c: Category) => void;
  onToggleDifficulty: (d: Difficulty) => void;
  onToggleTag: (t: string) => void;
  onClearAll: () => void;
  hasFilters: boolean;
}

function FilterPanel({
  selectedCategories,
  selectedDifficulties,
  selectedTags,
  allTags,
  onToggleCategory,
  onToggleDifficulty,
  onToggleTag,
  onClearAll,
  hasFilters,
}: FilterPanelProps) {
  return (
    <div className="space-y-5">
      {/* Category */}
      <div>
        <p className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground mb-2">
          Category
        </p>
        <div className="space-y-1.5">
          {ALL_CATEGORIES.map((cat) => (
            <label
              key={cat}
              className="flex items-center gap-2 cursor-pointer group"
              data-ocid={`filter.category.${cat}`}
            >
              <input
                type="checkbox"
                checked={selectedCategories.includes(cat)}
                onChange={() => onToggleCategory(cat)}
                className="sr-only"
              />
              <span
                className={cn(
                  "w-3.5 h-3.5 rounded border flex items-center justify-center flex-shrink-0 transition-colors",
                  selectedCategories.includes(cat)
                    ? "bg-primary border-primary"
                    : "border-border group-hover:border-primary/60",
                )}
              >
                {selectedCategories.includes(cat) && (
                  <span className="w-1.5 h-1.5 rounded-sm bg-primary-foreground" />
                )}
              </span>
              <CategoryBadge category={cat} size="sm" />
            </label>
          ))}
        </div>
      </div>

      {/* Difficulty */}
      <div>
        <p className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground mb-2">
          Difficulty
        </p>
        <div className="space-y-1.5">
          {ALL_DIFFICULTIES.map((diff) => (
            <label
              key={diff}
              className="flex items-center gap-2 cursor-pointer group"
              data-ocid={`filter.difficulty.${diff}`}
            >
              <input
                type="checkbox"
                checked={selectedDifficulties.includes(diff)}
                onChange={() => onToggleDifficulty(diff)}
                className="sr-only"
              />
              <span
                className={cn(
                  "w-3.5 h-3.5 rounded border flex items-center justify-center flex-shrink-0 transition-colors",
                  selectedDifficulties.includes(diff)
                    ? "bg-primary border-primary"
                    : "border-border group-hover:border-primary/60",
                )}
              >
                {selectedDifficulties.includes(diff) && (
                  <span className="w-1.5 h-1.5 rounded-sm bg-primary-foreground" />
                )}
              </span>
              <DifficultyBadge difficulty={diff} size="sm" />
            </label>
          ))}
        </div>
      </div>

      {/* Tags */}
      {allTags.length > 0 && (
        <div>
          <p className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground mb-2">
            Tags
          </p>
          <div className="flex flex-wrap gap-1.5">
            {allTags.map((tag) => (
              <button
                key={tag}
                type="button"
                onClick={() => onToggleTag(tag)}
                data-ocid="filter.tag"
                className={cn(
                  "font-mono text-[10px] px-2 py-0.5 rounded border transition-smooth",
                  selectedTags.includes(tag)
                    ? "bg-primary text-primary-foreground border-primary"
                    : "bg-muted text-muted-foreground border-border hover:border-primary/60 hover:text-foreground",
                )}
              >
                {tag}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Clear */}
      {hasFilters && (
        <button
          type="button"
          onClick={onClearAll}
          data-ocid="filter.clear_button"
          className="w-full font-mono text-xs py-1.5 rounded border border-destructive/40 text-destructive hover:bg-destructive/10 transition-smooth"
        >
          Clear all filters
        </button>
      )}
    </div>
  );
}

// ——— Main page ———
export function HomePage() {
  const [searchParams, setSearchParams] = useState<URLSearchParams>(
    () => new URLSearchParams(window.location.search),
  );

  const updateParams = useCallback((updater: (p: URLSearchParams) => void) => {
    const next = new URLSearchParams(window.location.search);
    updater(next);
    const newSearch = next.toString();
    const url = newSearch ? `?${newSearch}` : window.location.pathname;
    window.history.replaceState(null, "", url);
    setSearchParams(new URLSearchParams(newSearch));
  }, []);

  const query = getParam(searchParams, "q");
  const sortParam = getParam(searchParams, "sort") || "newest";
  const page = Number.parseInt(getParam(searchParams, "page") || "1", 10);
  const selectedCategories = getMultiParam(
    searchParams,
    "category",
  ) as Category[];
  const selectedDifficulties = getMultiParam(
    searchParams,
    "difficulty",
  ) as Difficulty[];
  const selectedTags = getMultiParam(searchParams, "tags");

  // Debounced search
  const [searchInput, setSearchInput] = useState(query);
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const handleSearchChange = (val: string) => {
    setSearchInput(val);
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => {
      updateParams((p) => {
        if (val) p.set("q", val);
        else p.delete("q");
        p.delete("page");
      });
    }, 300);
  };

  const [filtersOpen, setFiltersOpen] = useState(false);

  const {
    data: allWriteups = [],
    isLoading,
    isError,
  } = useAllPublishedWriteups();
  const { data: allTags = [] } = useTags();

  // Filter + sort logic
  const filteredWriteups = useMemo(() => {
    let list = [...allWriteups]; // already published-only from backend

    if (query.trim()) {
      const q = query.toLowerCase();
      list = list.filter((w) => {
        if (w.title.toLowerCase().includes(q)) return true;
        if (w.tags.some((t) => t.toLowerCase().includes(q))) return true;
        try {
          return JSON.stringify(JSON.parse(w.content))
            .toLowerCase()
            .includes(q);
        } catch {
          return w.content.toLowerCase().includes(q);
        }
      });
    }

    if (selectedCategories.length > 0) {
      list = list.filter((w) => selectedCategories.includes(w.category));
    }

    if (selectedDifficulties.length > 0) {
      list = list.filter((w) => selectedDifficulties.includes(w.difficulty));
    }

    if (selectedTags.length > 0) {
      list = list.filter((w) => selectedTags.some((t) => w.tags.includes(t)));
    }

    return [...list].sort((a, b) => {
      if (sortParam === "oldest")
        return Number(a.createdAt) - Number(b.createdAt);
      if (sortParam === "hardest")
        return DIFFICULTY_RANK[b.difficulty] - DIFFICULTY_RANK[a.difficulty];
      return Number(b.createdAt) - Number(a.createdAt);
    });
  }, [
    allWriteups,
    query,
    selectedCategories,
    selectedDifficulties,
    selectedTags,
    sortParam,
  ]);

  const totalPages = Math.max(
    1,
    Math.ceil(filteredWriteups.length / PAGE_SIZE),
  );
  const safePage = Math.min(Math.max(1, page), totalPages);
  const pagedWriteups = filteredWriteups.slice(
    (safePage - 1) * PAGE_SIZE,
    safePage * PAGE_SIZE,
  );

  const hasFilters =
    selectedCategories.length > 0 ||
    selectedDifficulties.length > 0 ||
    selectedTags.length > 0 ||
    query.trim().length > 0;

  const handleToggleCategory = (cat: Category) => {
    updateParams((p) => {
      const curr = getMultiParam(p, "category") as Category[];
      const next = curr.includes(cat)
        ? curr.filter((c) => c !== cat)
        : [...curr, cat];
      if (next.length) p.set("category", next.join(","));
      else p.delete("category");
      p.delete("page");
    });
  };

  const handleToggleDifficulty = (diff: Difficulty) => {
    updateParams((p) => {
      const curr = getMultiParam(p, "difficulty") as Difficulty[];
      const next = curr.includes(diff)
        ? curr.filter((d) => d !== diff)
        : [...curr, diff];
      if (next.length) p.set("difficulty", next.join(","));
      else p.delete("difficulty");
      p.delete("page");
    });
  };

  const handleToggleTag = (tag: string) => {
    updateParams((p) => {
      const curr = getMultiParam(p, "tags");
      const next = curr.includes(tag)
        ? curr.filter((t) => t !== tag)
        : [...curr, tag];
      if (next.length) p.set("tags", next.join(","));
      else p.delete("tags");
      p.delete("page");
    });
  };

  const handleClearAll = () => {
    setSearchInput("");
    if (debounceRef.current) clearTimeout(debounceRef.current);
    updateParams((p) => {
      p.delete("q");
      p.delete("category");
      p.delete("difficulty");
      p.delete("tags");
      p.delete("page");
    });
  };

  const handleSort = (val: string) => {
    updateParams((p) => {
      p.set("sort", val);
      p.delete("page");
    });
  };

  const handlePage = (next: number) => {
    updateParams((p) => {
      if (next === 1) p.delete("page");
      else p.set("page", String(next));
    });
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  useEffect(() => {
    return () => {
      if (debounceRef.current) clearTimeout(debounceRef.current);
    };
  }, []);

  const publishedTotal = allWriteups.length;

  return (
    <Layout>
      <div className="min-h-screen bg-background">
        {/* ——— Page Header ——— */}
        <div className="border-b border-border bg-card">
          <div className="max-w-6xl mx-auto px-4 py-10 md:py-14">
            <div className="flex items-start gap-3 mb-2">
              <span className="font-mono text-primary text-sm mt-1 select-none">
                $&gt;
              </span>
              <div>
                <h1 className="font-display text-3xl md:text-4xl font-bold text-foreground tracking-tight">
                  CTF Writeups
                </h1>
                <p className="text-muted-foreground font-body mt-1.5 text-sm md:text-base">
                  Capture The Flag challenge solutions — pwn, web, crypto &amp;
                  beyond.
                </p>
              </div>
            </div>

            {/* Search bar */}
            <div className="mt-6 relative max-w-2xl">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
              <input
                type="text"
                value={searchInput}
                onChange={(e) => handleSearchChange(e.target.value)}
                placeholder="Search writeups, tags, content..."
                data-ocid="home.search_input"
                className={cn(
                  "w-full pl-9 pr-9 py-2.5 rounded-lg border border-border bg-input",
                  "font-mono text-sm text-foreground placeholder:text-muted-foreground",
                  "focus:outline-none focus:ring-1 focus:ring-ring transition-colors",
                )}
              />
              {searchInput && (
                <button
                  type="button"
                  onClick={() => handleSearchChange("")}
                  data-ocid="home.search_clear_button"
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                  aria-label="Clear search"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
          </div>
        </div>

        {/* ——— Body ——— */}
        <div className="max-w-6xl mx-auto px-4 py-6">
          <div className="flex gap-6">
            {/* Desktop sidebar */}
            <aside className="hidden lg:block w-52 xl:w-60 shrink-0">
              <div className="sticky top-6 rounded-lg border border-border bg-card p-4">
                <div className="flex items-center gap-2 mb-4 pb-3 border-b border-border">
                  <Filter className="w-3.5 h-3.5 text-muted-foreground" />
                  <span className="font-mono text-xs font-semibold text-foreground uppercase tracking-wider">
                    Filters
                  </span>
                </div>
                <FilterPanel
                  selectedCategories={selectedCategories}
                  selectedDifficulties={selectedDifficulties}
                  selectedTags={selectedTags}
                  allTags={allTags}
                  onToggleCategory={handleToggleCategory}
                  onToggleDifficulty={handleToggleDifficulty}
                  onToggleTag={handleToggleTag}
                  onClearAll={handleClearAll}
                  hasFilters={hasFilters}
                />
              </div>
            </aside>

            {/* Main content area */}
            <div className="flex-1 min-w-0">
              {/* Mobile toolbar */}
              <div className="lg:hidden flex items-center gap-2 mb-4">
                <button
                  type="button"
                  onClick={() => setFiltersOpen((v) => !v)}
                  data-ocid="home.filters_toggle"
                  className={cn(
                    "flex items-center gap-1.5 font-mono text-xs px-3 py-1.5 rounded-lg border transition-smooth",
                    filtersOpen || hasFilters
                      ? "bg-primary text-primary-foreground border-primary"
                      : "bg-card text-muted-foreground border-border hover:border-primary/60",
                  )}
                >
                  <SlidersHorizontal className="w-3.5 h-3.5" />
                  Filters
                  {selectedCategories.length +
                    selectedDifficulties.length +
                    selectedTags.length >
                    0 && (
                    <span className="ml-0.5 px-1 rounded bg-primary-foreground/20 text-[10px]">
                      {selectedCategories.length +
                        selectedDifficulties.length +
                        selectedTags.length}
                    </span>
                  )}
                </button>

                <select
                  value={sortParam}
                  onChange={(e) => handleSort(e.target.value)}
                  data-ocid="home.sort_select_mobile"
                  className="ml-auto font-mono text-xs px-2 py-1.5 rounded-lg border border-border bg-card text-foreground focus:outline-none focus:ring-1 focus:ring-ring"
                >
                  <option value="newest">Newest first</option>
                  <option value="oldest">Oldest first</option>
                  <option value="hardest">Hardest first</option>
                </select>
              </div>

              {/* Mobile filter panel */}
              {filtersOpen && (
                <div className="lg:hidden mb-4 rounded-lg border border-border bg-card p-4">
                  <FilterPanel
                    selectedCategories={selectedCategories}
                    selectedDifficulties={selectedDifficulties}
                    selectedTags={selectedTags}
                    allTags={allTags}
                    onToggleCategory={handleToggleCategory}
                    onToggleDifficulty={handleToggleDifficulty}
                    onToggleTag={handleToggleTag}
                    onClearAll={handleClearAll}
                    hasFilters={hasFilters}
                  />
                </div>
              )}

              {/* Desktop: stats + sort row */}
              <div className="hidden lg:flex items-center justify-between gap-3 mb-4">
                {isLoading ? (
                  <div className="w-48 h-8 rounded bg-muted/40 animate-pulse" />
                ) : (
                  <StatsBar
                    total={publishedTotal}
                    filtered={filteredWriteups.length}
                    writeups={filteredWriteups}
                  />
                )}
                <select
                  value={sortParam}
                  onChange={(e) => handleSort(e.target.value)}
                  data-ocid="home.sort_select"
                  className="font-mono text-xs px-3 py-1.5 rounded-lg border border-border bg-card text-foreground focus:outline-none focus:ring-1 focus:ring-ring"
                >
                  <option value="newest">Newest first</option>
                  <option value="oldest">Oldest first</option>
                  <option value="hardest">Hardest first</option>
                </select>
              </div>

              {/* Mobile stats */}
              {!isLoading && (
                <div className="lg:hidden mb-4">
                  <StatsBar
                    total={publishedTotal}
                    filtered={filteredWriteups.length}
                    writeups={filteredWriteups}
                  />
                </div>
              )}

              {/* Writeup list / states */}
              {isLoading ? (
                <div className="grid gap-3" data-ocid="home.loading_state">
                  {Array.from({ length: 5 }).map((_, i) => (
                    // biome-ignore lint/suspicious/noArrayIndexKey: skeleton items are static
                    <SkeletonCard key={i} />
                  ))}
                </div>
              ) : isError ? (
                <div
                  className="flex flex-col items-center justify-center py-16 text-center"
                  data-ocid="home.error_state"
                >
                  <span className="font-mono text-destructive text-sm mb-2">
                    Error loading writeups
                  </span>
                  <p className="text-muted-foreground text-xs font-mono">
                    Check your connection and reload.
                  </p>
                </div>
              ) : publishedTotal === 0 ? (
                <div
                  className="flex flex-col items-center justify-center py-20 text-center gap-4"
                  data-ocid="home.empty_state"
                >
                  <div className="w-12 h-12 rounded-lg border border-dashed border-border flex items-center justify-center">
                    <span className="font-mono text-lg text-muted-foreground">
                      {">"}_
                    </span>
                  </div>
                  <div>
                    <p className="font-display font-semibold text-foreground">
                      No writeups yet
                    </p>
                    <p className="text-muted-foreground text-sm mt-1 font-mono">
                      Head to{" "}
                      <Link
                        to="/admin/dashboard"
                        className="text-primary underline underline-offset-2"
                        data-ocid="home.admin_link"
                      >
                        admin dashboard
                      </Link>{" "}
                      to create your first writeup.
                    </p>
                  </div>
                </div>
              ) : filteredWriteups.length === 0 ? (
                <div
                  className="flex flex-col items-center justify-center py-20 text-center gap-4"
                  data-ocid="home.no_results_state"
                >
                  <div className="w-12 h-12 rounded-lg border border-dashed border-border flex items-center justify-center">
                    <Search className="w-5 h-5 text-muted-foreground" />
                  </div>
                  <div>
                    <p className="font-display font-semibold text-foreground">
                      No writeups match your search
                    </p>
                    <p className="text-muted-foreground text-sm mt-1 font-mono">
                      Try adjusting your filters or search query.
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={handleClearAll}
                    data-ocid="home.clear_filters_button"
                    className="font-mono text-sm px-4 py-2 rounded-lg border border-primary text-primary hover:bg-primary hover:text-primary-foreground transition-smooth"
                  >
                    Clear filters
                  </button>
                </div>
              ) : (
                <>
                  <div className="grid gap-3" data-ocid="home.writeup_list">
                    {pagedWriteups.map((writeup, i) => (
                      <WriteupCard
                        key={writeup.id.toString()}
                        writeup={writeup}
                        index={(safePage - 1) * PAGE_SIZE + i}
                      />
                    ))}
                  </div>

                  {/* Pagination */}
                  {totalPages > 1 && (
                    <div className="flex items-center justify-between mt-6 pt-4 border-t border-border">
                      <button
                        type="button"
                        onClick={() => handlePage(safePage - 1)}
                        disabled={safePage <= 1}
                        data-ocid="home.pagination_prev"
                        className={cn(
                          "flex items-center gap-1.5 font-mono text-xs px-3 py-1.5 rounded-lg border transition-smooth",
                          safePage <= 1
                            ? "border-border text-muted-foreground cursor-not-allowed opacity-50"
                            : "border-border text-foreground hover:border-primary/60 hover:text-primary",
                        )}
                      >
                        <ChevronLeft className="w-3.5 h-3.5" />
                        Prev
                      </button>

                      <span
                        className="font-mono text-xs text-muted-foreground"
                        data-ocid="home.pagination_info"
                      >
                        Page{" "}
                        <span className="text-foreground font-semibold">
                          {safePage}
                        </span>{" "}
                        of{" "}
                        <span className="text-foreground font-semibold">
                          {totalPages}
                        </span>
                      </span>

                      <button
                        type="button"
                        onClick={() => handlePage(safePage + 1)}
                        disabled={safePage >= totalPages}
                        data-ocid="home.pagination_next"
                        className={cn(
                          "flex items-center gap-1.5 font-mono text-xs px-3 py-1.5 rounded-lg border transition-smooth",
                          safePage >= totalPages
                            ? "border-border text-muted-foreground cursor-not-allowed opacity-50"
                            : "border-border text-foreground hover:border-primary/60 hover:text-primary",
                        )}
                      >
                        Next
                        <ChevronRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  )}
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
