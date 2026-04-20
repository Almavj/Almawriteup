import { c as createLucideIcon, r as reactExports, j as jsxRuntimeExports, L as Layout, a as cn, X, b as Link, D as Difficulty, C as Category } from "./index-Dq0ueDrX.js";
import { C as CategoryBadge, D as DifficultyBadge } from "./DifficultyBadge-BKgWi1di.js";
import { W as WriteupCard } from "./WriteupCard-CNQ0O2Yf.js";
import { u as useAllPublishedWriteups, a as useTags } from "./useBackend-f3qlnDla.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$4 = [["path", { d: "m15 18-6-6 6-6", key: "1wnfg3" }]];
const ChevronLeft = createLucideIcon("chevron-left", __iconNode$4);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$3 = [["path", { d: "m9 18 6-6-6-6", key: "mthhwq" }]];
const ChevronRight = createLucideIcon("chevron-right", __iconNode$3);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$2 = [
  [
    "path",
    {
      d: "M10 20a1 1 0 0 0 .553.895l2 1A1 1 0 0 0 14 21v-7a2 2 0 0 1 .517-1.341L21.74 4.67A1 1 0 0 0 21 3H3a1 1 0 0 0-.742 1.67l7.225 7.989A2 2 0 0 1 10 14z",
      key: "sc7q7i"
    }
  ]
];
const Funnel = createLucideIcon("funnel", __iconNode$2);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$1 = [
  ["path", { d: "m21 21-4.34-4.34", key: "14j7rj" }],
  ["circle", { cx: "11", cy: "11", r: "8", key: "4ej97u" }]
];
const Search = createLucideIcon("search", __iconNode$1);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["line", { x1: "21", x2: "14", y1: "4", y2: "4", key: "obuewd" }],
  ["line", { x1: "10", x2: "3", y1: "4", y2: "4", key: "1q6298" }],
  ["line", { x1: "21", x2: "12", y1: "12", y2: "12", key: "1iu8h1" }],
  ["line", { x1: "8", x2: "3", y1: "12", y2: "12", key: "ntss68" }],
  ["line", { x1: "21", x2: "16", y1: "20", y2: "20", key: "14d8ph" }],
  ["line", { x1: "12", x2: "3", y1: "20", y2: "20", key: "m0wm8r" }],
  ["line", { x1: "14", x2: "14", y1: "2", y2: "6", key: "14e1ph" }],
  ["line", { x1: "8", x2: "8", y1: "10", y2: "14", key: "1i6ji0" }],
  ["line", { x1: "16", x2: "16", y1: "18", y2: "22", key: "1lctlv" }]
];
const SlidersHorizontal = createLucideIcon("sliders-horizontal", __iconNode);
const PAGE_SIZE = 10;
const DIFFICULTY_RANK = {
  [Difficulty.easy]: 0,
  [Difficulty.medium]: 1,
  [Difficulty.hard]: 2,
  [Difficulty.insane]: 3
};
const ALL_CATEGORIES = Object.values(Category);
const ALL_DIFFICULTIES = Object.values(Difficulty);
function getParam(search, key) {
  return search.get(key) ?? "";
}
function getMultiParam(search, key) {
  const val = search.get(key);
  return val ? val.split(",").filter(Boolean) : [];
}
function SkeletonCard() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-lg border border-border bg-card overflow-hidden animate-pulse", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1.5 px-4 py-2.5 border-b border-border bg-muted/30", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "w-2.5 h-2.5 rounded-full bg-muted" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "w-2.5 h-2.5 rounded-full bg-muted" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "w-2.5 h-2.5 rounded-full bg-muted" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "ml-auto w-24 h-3 rounded bg-muted" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-4 space-y-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-1.5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "w-14 h-4 rounded bg-muted" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "w-14 h-4 rounded bg-muted" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-3/4 h-4 rounded bg-muted" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-full h-3 rounded bg-muted/70" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-2/3 h-3 rounded bg-muted/70" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between pt-1", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-20 h-3 rounded bg-muted/50" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-28 h-3 rounded bg-muted/50" })
      ] })
    ] })
  ] });
}
function StatsBar({
  total,
  filtered,
  writeups
}) {
  const counts = reactExports.useMemo(() => {
    const c = {};
    for (const w of writeups) {
      c[w.difficulty] = (c[w.difficulty] ?? 0) + 1;
    }
    return c;
  }, [writeups]);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap items-center gap-x-4 gap-y-1.5 px-3 py-2.5 rounded-lg bg-muted/30 border border-border font-mono text-xs text-muted-foreground", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-foreground font-semibold", children: filtered }),
      filtered !== total ? ` of ${total}` : "",
      " writeup",
      total !== 1 ? "s" : ""
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-border", children: "|" }),
    ALL_DIFFICULTIES.map(
      (d) => counts[d] ? /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-1", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(DifficultyBadge, { difficulty: d, size: "sm" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: counts[d] })
      ] }, d) : null
    )
  ] });
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
  hasFilters
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-5", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-mono text-[10px] uppercase tracking-widest text-muted-foreground mb-2", children: "Category" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-1.5", children: ALL_CATEGORIES.map((cat) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "label",
        {
          className: "flex items-center gap-2 cursor-pointer group",
          "data-ocid": `filter.category.${cat}`,
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "input",
              {
                type: "checkbox",
                checked: selectedCategories.includes(cat),
                onChange: () => onToggleCategory(cat),
                className: "sr-only"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "span",
              {
                className: cn(
                  "w-3.5 h-3.5 rounded border flex items-center justify-center flex-shrink-0 transition-colors",
                  selectedCategories.includes(cat) ? "bg-primary border-primary" : "border-border group-hover:border-primary/60"
                ),
                children: selectedCategories.includes(cat) && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "w-1.5 h-1.5 rounded-sm bg-primary-foreground" })
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(CategoryBadge, { category: cat, size: "sm" })
          ]
        },
        cat
      )) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-mono text-[10px] uppercase tracking-widest text-muted-foreground mb-2", children: "Difficulty" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-1.5", children: ALL_DIFFICULTIES.map((diff) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "label",
        {
          className: "flex items-center gap-2 cursor-pointer group",
          "data-ocid": `filter.difficulty.${diff}`,
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "input",
              {
                type: "checkbox",
                checked: selectedDifficulties.includes(diff),
                onChange: () => onToggleDifficulty(diff),
                className: "sr-only"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "span",
              {
                className: cn(
                  "w-3.5 h-3.5 rounded border flex items-center justify-center flex-shrink-0 transition-colors",
                  selectedDifficulties.includes(diff) ? "bg-primary border-primary" : "border-border group-hover:border-primary/60"
                ),
                children: selectedDifficulties.includes(diff) && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "w-1.5 h-1.5 rounded-sm bg-primary-foreground" })
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(DifficultyBadge, { difficulty: diff, size: "sm" })
          ]
        },
        diff
      )) })
    ] }),
    allTags.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-mono text-[10px] uppercase tracking-widest text-muted-foreground mb-2", children: "Tags" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-wrap gap-1.5", children: allTags.map((tag) => /* @__PURE__ */ jsxRuntimeExports.jsx(
        "button",
        {
          type: "button",
          onClick: () => onToggleTag(tag),
          "data-ocid": "filter.tag",
          className: cn(
            "font-mono text-[10px] px-2 py-0.5 rounded border transition-smooth",
            selectedTags.includes(tag) ? "bg-primary text-primary-foreground border-primary" : "bg-muted text-muted-foreground border-border hover:border-primary/60 hover:text-foreground"
          ),
          children: tag
        },
        tag
      )) })
    ] }),
    hasFilters && /* @__PURE__ */ jsxRuntimeExports.jsx(
      "button",
      {
        type: "button",
        onClick: onClearAll,
        "data-ocid": "filter.clear_button",
        className: "w-full font-mono text-xs py-1.5 rounded border border-destructive/40 text-destructive hover:bg-destructive/10 transition-smooth",
        children: "Clear all filters"
      }
    )
  ] });
}
function HomePage() {
  const [searchParams, setSearchParams] = reactExports.useState(
    () => new URLSearchParams(window.location.search)
  );
  const updateParams = reactExports.useCallback((updater) => {
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
    "category"
  );
  const selectedDifficulties = getMultiParam(
    searchParams,
    "difficulty"
  );
  const selectedTags = getMultiParam(searchParams, "tags");
  const [searchInput, setSearchInput] = reactExports.useState(query);
  const debounceRef = reactExports.useRef(null);
  const handleSearchChange = (val) => {
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
  const [filtersOpen, setFiltersOpen] = reactExports.useState(false);
  const {
    data: allWriteups = [],
    isLoading,
    isError
  } = useAllPublishedWriteups();
  const { data: allTags = [] } = useTags();
  const filteredWriteups = reactExports.useMemo(() => {
    let list = [...allWriteups];
    if (query.trim()) {
      const q = query.toLowerCase();
      list = list.filter((w) => {
        if (w.title.toLowerCase().includes(q)) return true;
        if (w.tags.some((t) => t.toLowerCase().includes(q))) return true;
        try {
          return JSON.stringify(JSON.parse(w.content)).toLowerCase().includes(q);
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
        return new Date(a.created_at).getTime() - new Date(b.created_at).getTime();
      if (sortParam === "hardest")
        return DIFFICULTY_RANK[b.difficulty] - DIFFICULTY_RANK[a.difficulty];
      return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
    });
  }, [
    allWriteups,
    query,
    selectedCategories,
    selectedDifficulties,
    selectedTags,
    sortParam
  ]);
  const totalPages = Math.max(
    1,
    Math.ceil(filteredWriteups.length / PAGE_SIZE)
  );
  const safePage = Math.min(Math.max(1, page), totalPages);
  const pagedWriteups = filteredWriteups.slice(
    (safePage - 1) * PAGE_SIZE,
    safePage * PAGE_SIZE
  );
  const hasFilters = selectedCategories.length > 0 || selectedDifficulties.length > 0 || selectedTags.length > 0 || query.trim().length > 0;
  const handleToggleCategory = (cat) => {
    updateParams((p) => {
      const curr = getMultiParam(p, "category");
      const next = curr.includes(cat) ? curr.filter((c) => c !== cat) : [...curr, cat];
      if (next.length) p.set("category", next.join(","));
      else p.delete("category");
      p.delete("page");
    });
  };
  const handleToggleDifficulty = (diff) => {
    updateParams((p) => {
      const curr = getMultiParam(p, "difficulty");
      const next = curr.includes(diff) ? curr.filter((d) => d !== diff) : [...curr, diff];
      if (next.length) p.set("difficulty", next.join(","));
      else p.delete("difficulty");
      p.delete("page");
    });
  };
  const handleToggleTag = (tag) => {
    updateParams((p) => {
      const curr = getMultiParam(p, "tags");
      const next = curr.includes(tag) ? curr.filter((t) => t !== tag) : [...curr, tag];
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
  const handleSort = (val) => {
    updateParams((p) => {
      p.set("sort", val);
      p.delete("page");
    });
  };
  const handlePage = (next) => {
    updateParams((p) => {
      if (next === 1) p.delete("page");
      else p.set("page", String(next));
    });
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
  reactExports.useEffect(() => {
    return () => {
      if (debounceRef.current) clearTimeout(debounceRef.current);
    };
  }, []);
  const publishedTotal = allWriteups.length;
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Layout, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-h-screen bg-background", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "border-b border-border bg-card", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-6xl mx-auto px-4 py-10 md:py-14", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start gap-3 mb-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-mono text-primary text-sm mt-1 select-none", children: "$>" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display text-3xl md:text-4xl font-bold text-foreground tracking-tight", children: "CTF Writeups" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground font-body mt-1.5 text-sm md:text-base", children: "Capture The Flag challenge solutions — pwn, web, crypto & beyond." })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-6 relative max-w-2xl", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Search, { className: "absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "input",
          {
            type: "text",
            value: searchInput,
            onChange: (e) => handleSearchChange(e.target.value),
            placeholder: "Search writeups, tags, content...",
            "data-ocid": "home.search_input",
            className: cn(
              "w-full pl-9 pr-9 py-2.5 rounded-lg border border-border bg-input",
              "font-mono text-sm text-foreground placeholder:text-muted-foreground",
              "focus:outline-none focus:ring-1 focus:ring-ring transition-colors"
            )
          }
        ),
        searchInput && /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            type: "button",
            onClick: () => handleSearchChange(""),
            "data-ocid": "home.search_clear_button",
            className: "absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors",
            "aria-label": "Clear search",
            children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "w-3.5 h-3.5" })
          }
        )
      ] })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "max-w-6xl mx-auto px-4 py-6", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("aside", { className: "hidden lg:block w-52 xl:w-60 shrink-0", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "sticky top-6 rounded-lg border border-border bg-card p-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 mb-4 pb-3 border-b border-border", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Funnel, { className: "w-3.5 h-3.5 text-muted-foreground" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-mono text-xs font-semibold text-foreground uppercase tracking-wider", children: "Filters" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          FilterPanel,
          {
            selectedCategories,
            selectedDifficulties,
            selectedTags,
            allTags,
            onToggleCategory: handleToggleCategory,
            onToggleDifficulty: handleToggleDifficulty,
            onToggleTag: handleToggleTag,
            onClearAll: handleClearAll,
            hasFilters
          }
        )
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "lg:hidden flex items-center gap-2 mb-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "button",
            {
              type: "button",
              onClick: () => setFiltersOpen((v) => !v),
              "data-ocid": "home.filters_toggle",
              className: cn(
                "flex items-center gap-1.5 font-mono text-xs px-3 py-1.5 rounded-lg border transition-smooth",
                filtersOpen || hasFilters ? "bg-primary text-primary-foreground border-primary" : "bg-card text-muted-foreground border-border hover:border-primary/60"
              ),
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(SlidersHorizontal, { className: "w-3.5 h-3.5" }),
                "Filters",
                selectedCategories.length + selectedDifficulties.length + selectedTags.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "ml-0.5 px-1 rounded bg-primary-foreground/20 text-[10px]", children: selectedCategories.length + selectedDifficulties.length + selectedTags.length })
              ]
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "select",
            {
              value: sortParam,
              onChange: (e) => handleSort(e.target.value),
              "data-ocid": "home.sort_select_mobile",
              className: "ml-auto font-mono text-xs px-2 py-1.5 rounded-lg border border-border bg-card text-foreground focus:outline-none focus:ring-1 focus:ring-ring",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "newest", children: "Newest first" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "oldest", children: "Oldest first" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "hardest", children: "Hardest first" })
              ]
            }
          )
        ] }),
        filtersOpen && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "lg:hidden mb-4 rounded-lg border border-border bg-card p-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
          FilterPanel,
          {
            selectedCategories,
            selectedDifficulties,
            selectedTags,
            allTags,
            onToggleCategory: handleToggleCategory,
            onToggleDifficulty: handleToggleDifficulty,
            onToggleTag: handleToggleTag,
            onClearAll: handleClearAll,
            hasFilters
          }
        ) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "hidden lg:flex items-center justify-between gap-3 mb-4", children: [
          isLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-48 h-8 rounded bg-muted/40 animate-pulse" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(
            StatsBar,
            {
              total: publishedTotal,
              filtered: filteredWriteups.length,
              writeups: filteredWriteups
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "select",
            {
              value: sortParam,
              onChange: (e) => handleSort(e.target.value),
              "data-ocid": "home.sort_select",
              className: "font-mono text-xs px-3 py-1.5 rounded-lg border border-border bg-card text-foreground focus:outline-none focus:ring-1 focus:ring-ring",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "newest", children: "Newest first" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "oldest", children: "Oldest first" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "hardest", children: "Hardest first" })
              ]
            }
          )
        ] }),
        !isLoading && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "lg:hidden mb-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
          StatsBar,
          {
            total: publishedTotal,
            filtered: filteredWriteups.length,
            writeups: filteredWriteups
          }
        ) }),
        isLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid gap-3", "data-ocid": "home.loading_state", children: Array.from({ length: 5 }).map((_, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(SkeletonCard, {}, i)) }) : isError ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            className: "flex flex-col items-center justify-center py-16 text-center",
            "data-ocid": "home.error_state",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-mono text-destructive text-sm mb-2", children: "Error loading writeups" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-xs font-mono", children: "Check your connection and reload." })
            ]
          }
        ) : publishedTotal === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            className: "flex flex-col items-center justify-center py-20 text-center gap-4",
            "data-ocid": "home.empty_state",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-12 h-12 rounded-lg border border-dashed border-border flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-mono text-lg text-muted-foreground", children: [
                ">",
                "_"
              ] }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-display font-semibold text-foreground", children: "No writeups yet" }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-muted-foreground text-sm mt-1 font-mono", children: [
                  "Head to",
                  " ",
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Link,
                    {
                      to: "/admin/dashboard",
                      className: "text-primary underline underline-offset-2",
                      "data-ocid": "home.admin_link",
                      children: "admin dashboard"
                    }
                  ),
                  " ",
                  "to create your first writeup."
                ] })
              ] })
            ]
          }
        ) : filteredWriteups.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            className: "flex flex-col items-center justify-center py-20 text-center gap-4",
            "data-ocid": "home.no_results_state",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-12 h-12 rounded-lg border border-dashed border-border flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Search, { className: "w-5 h-5 text-muted-foreground" }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-display font-semibold text-foreground", children: "No writeups match your search" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-sm mt-1 font-mono", children: "Try adjusting your filters or search query." })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "button",
                {
                  type: "button",
                  onClick: handleClearAll,
                  "data-ocid": "home.clear_filters_button",
                  className: "font-mono text-sm px-4 py-2 rounded-lg border border-primary text-primary hover:bg-primary hover:text-primary-foreground transition-smooth",
                  children: "Clear filters"
                }
              )
            ]
          }
        ) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid gap-3", "data-ocid": "home.writeup_list", children: pagedWriteups.map((writeup, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(
            WriteupCard,
            {
              writeup,
              index: (safePage - 1) * PAGE_SIZE + i
            },
            writeup.id.toString()
          )) }),
          totalPages > 1 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between mt-6 pt-4 border-t border-border", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "button",
              {
                type: "button",
                onClick: () => handlePage(safePage - 1),
                disabled: safePage <= 1,
                "data-ocid": "home.pagination_prev",
                className: cn(
                  "flex items-center gap-1.5 font-mono text-xs px-3 py-1.5 rounded-lg border transition-smooth",
                  safePage <= 1 ? "border-border text-muted-foreground cursor-not-allowed opacity-50" : "border-border text-foreground hover:border-primary/60 hover:text-primary"
                ),
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronLeft, { className: "w-3.5 h-3.5" }),
                  "Prev"
                ]
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "span",
              {
                className: "font-mono text-xs text-muted-foreground",
                "data-ocid": "home.pagination_info",
                children: [
                  "Page",
                  " ",
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-foreground font-semibold", children: safePage }),
                  " ",
                  "of",
                  " ",
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-foreground font-semibold", children: totalPages })
                ]
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "button",
              {
                type: "button",
                onClick: () => handlePage(safePage + 1),
                disabled: safePage >= totalPages,
                "data-ocid": "home.pagination_next",
                className: cn(
                  "flex items-center gap-1.5 font-mono text-xs px-3 py-1.5 rounded-lg border transition-smooth",
                  safePage >= totalPages ? "border-border text-muted-foreground cursor-not-allowed opacity-50" : "border-border text-foreground hover:border-primary/60 hover:text-primary"
                ),
                children: [
                  "Next",
                  /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronRight, { className: "w-3.5 h-3.5" })
                ]
              }
            )
          ] })
        ] })
      ] })
    ] }) })
  ] }) });
}
export {
  HomePage
};
