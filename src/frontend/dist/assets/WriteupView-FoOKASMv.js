import { c as createLucideIcon, u as useParams, r as reactExports, j as jsxRuntimeExports, L as Layout, b as Link, A as ArrowLeft, a as cn } from "./index-Dq0ueDrX.js";
import { u as ue } from "./index-HRdHMOxe.js";
import { C as CategoryBadge, D as DifficultyBadge } from "./DifficultyBadge-BKgWi1di.js";
import { e as extractHeadings, C as ContentRenderer, a as Copy, b as ChevronUp, c as ChevronDown, E as Eye } from "./ContentRenderer-BNZ7AFTL.js";
import { C as Calendar, W as WriteupCard } from "./WriteupCard-CNQ0O2Yf.js";
import { b as useWriteup, c as useRelatedWriteups } from "./useBackend-f3qlnDla.js";
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
      d: "M10.733 5.076a10.744 10.744 0 0 1 11.205 6.575 1 1 0 0 1 0 .696 10.747 10.747 0 0 1-1.444 2.49",
      key: "ct8e1f"
    }
  ],
  ["path", { d: "M14.084 14.158a3 3 0 0 1-4.242-4.242", key: "151rxh" }],
  [
    "path",
    {
      d: "M17.479 17.499a10.75 10.75 0 0 1-15.417-5.151 1 1 0 0 1 0-.696 10.75 10.75 0 0 1 4.446-5.143",
      key: "13bj9a"
    }
  ],
  ["path", { d: "m2 2 20 20", key: "1ooewy" }]
];
const EyeOff = createLucideIcon("eye-off", __iconNode$2);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$1 = [
  [
    "path",
    {
      d: "M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z",
      key: "c2jq9f"
    }
  ],
  ["rect", { width: "4", height: "12", x: "2", y: "9", key: "mk3on5" }],
  ["circle", { cx: "4", cy: "4", r: "2", key: "bt5ra8" }]
];
const Linkedin = createLucideIcon("linkedin", __iconNode$1);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  [
    "path",
    {
      d: "M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z",
      key: "pff0z6"
    }
  ]
];
const Twitter = createLucideIcon("twitter", __iconNode);
function WriteupSkeleton() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "animate-pulse space-y-6", "data-ocid": "writeup.loading_state", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-8 bg-muted rounded w-3/4" }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-5 bg-muted rounded w-16" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-5 bg-muted rounded w-16" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-5 bg-muted rounded w-24" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex gap-2", children: [1, 2, 3].map((i) => /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-5 bg-muted rounded w-14" }, i)) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-8 mt-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 space-y-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-4 bg-muted rounded w-full" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-4 bg-muted rounded w-5/6" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-4 bg-muted rounded w-4/6" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-20 bg-muted rounded w-full mt-4" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-4 bg-muted rounded w-5/6" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-4 bg-muted rounded w-full" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "hidden lg:block w-56 shrink-0 space-y-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-4 bg-muted rounded w-3/4" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-3 bg-muted rounded w-full" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-3 bg-muted rounded w-5/6" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-3 bg-muted rounded w-4/6 ml-4" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-3 bg-muted rounded w-full" })
      ] })
    ] })
  ] });
}
function TocList({
  items,
  activeId
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx("ul", { className: "space-y-0.5", children: items.map((item) => /* @__PURE__ */ jsxRuntimeExports.jsx("li", { className: item.level === 3 ? "pl-4" : "", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "a",
    {
      href: `#${item.id}`,
      "data-ocid": "writeup.toc.link",
      onClick: (e) => {
        var _a;
        e.preventDefault();
        (_a = document.getElementById(item.id)) == null ? void 0 : _a.scrollIntoView({ behavior: "smooth" });
      },
      className: cn(
        "block text-xs font-mono py-0.5 px-2 rounded transition-colors duration-150 leading-relaxed",
        "hover:text-foreground hover:bg-muted/50",
        item.level === 3 ? "text-[11px]" : "",
        activeId === item.id ? "text-primary bg-primary/10 font-semibold" : "text-muted-foreground"
      ),
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "opacity-50 mr-1", children: item.level === 2 ? "#" : "##" }),
        item.text
      ]
    }
  ) }, item.id)) });
}
function TableOfContents({
  items,
  activeId,
  desktopOnly,
  mobileOnly
}) {
  const [mobileOpen, setMobileOpen] = reactExports.useState(false);
  if (items.length === 0) return null;
  if (desktopOnly) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx(
      "aside",
      {
        className: "hidden lg:block w-56 shrink-0",
        "data-ocid": "writeup.toc.sidebar",
        children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "sticky top-24 rounded-lg border border-border bg-card p-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1.5 mb-3 pb-2 border-b border-border", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-mono text-[10px] text-primary", children: "$" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-mono text-[11px] text-foreground font-semibold tracking-wide uppercase", children: "Contents" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(TocList, { items, activeId })
        ] })
      }
    );
  }
  if (mobileOnly) {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: "lg:hidden mb-6 rounded-lg border border-border bg-card overflow-hidden",
        "data-ocid": "writeup.toc.mobile",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "button",
            {
              type: "button",
              "data-ocid": "writeup.toc.toggle",
              onClick: () => setMobileOpen((o) => !o),
              className: "w-full flex items-center gap-1.5 px-4 py-3 text-sm font-mono font-semibold text-foreground hover:bg-muted/30 transition-colors",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-primary text-xs", children: "$" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "flex-1 text-left text-xs", children: "table_of_contents" }),
                mobileOpen ? /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronUp, { className: "w-4 h-4 text-muted-foreground" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronDown, { className: "w-4 h-4 text-muted-foreground" })
              ]
            }
          ),
          mobileOpen && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "px-3 pb-3 pt-1 border-t border-border", children: /* @__PURE__ */ jsxRuntimeExports.jsx(TocList, { items, activeId }) })
        ]
      }
    );
  }
  return null;
}
function FlagSection({
  flag,
  flagHidden
}) {
  const [revealed, setRevealed] = reactExports.useState(!flagHidden);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: "mt-10 rounded-lg border border-primary/30 bg-primary/5 overflow-hidden",
      "data-ocid": "writeup.flag.section",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1.5 px-4 py-2 border-b border-primary/20 bg-primary/10", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "w-2 h-2 rounded-full bg-destructive opacity-70" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "w-2 h-2 rounded-full bg-[oklch(var(--difficulty-medium))] opacity-70" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "w-2 h-2 rounded-full bg-[oklch(var(--difficulty-easy))] opacity-70" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "ml-2 font-mono text-[11px] text-primary font-semibold tracking-wide", children: "flag.txt" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-4 flex items-center gap-4 flex-wrap", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "code",
            {
              role: !revealed ? "button" : void 0,
              tabIndex: !revealed ? 0 : void 0,
              className: cn(
                "font-mono text-sm text-primary bg-[oklch(var(--code-bg))] px-3 py-2 rounded",
                "border border-[oklch(var(--code-border))] flex-1 min-w-0 break-all",
                !revealed ? "blur-sm select-none cursor-pointer" : "select-all"
              ),
              onClick: () => !revealed && setRevealed(true),
              onKeyDown: (e) => {
                if (!revealed && (e.key === "Enter" || e.key === " ")) {
                  setRevealed(true);
                }
              },
              children: flag || "flag{hidden}"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "button",
            {
              type: "button",
              "data-ocid": "writeup.flag.reveal_button",
              onClick: () => setRevealed((r) => !r),
              className: cn(
                "shrink-0 flex items-center gap-1.5 font-mono text-xs px-3 py-2 rounded border transition-smooth",
                revealed ? "border-border text-muted-foreground hover:text-foreground" : "border-primary text-primary hover:bg-primary/10"
              ),
              children: revealed ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(EyeOff, { className: "w-3.5 h-3.5" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Hide" })
              ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Eye, { className: "w-3.5 h-3.5" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Reveal Flag" })
              ] })
            }
          )
        ] })
      ]
    }
  );
}
function ShareButtons({ title, url }) {
  const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(url)}`;
  const linkedinUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`;
  function copyLink() {
    navigator.clipboard.writeText(url).then(() => {
      ue.success("Link copied!", { duration: 3e3 });
    });
  }
  const btnCls = "flex items-center gap-1.5 font-mono text-xs px-3 py-1.5 rounded border border-border text-muted-foreground hover:text-foreground hover:border-primary/50 transition-smooth";
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", "data-ocid": "writeup.share.section", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-mono text-[11px] text-muted-foreground mr-1 hidden sm:inline", children: "share:" }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "a",
      {
        href: twitterUrl,
        target: "_blank",
        rel: "noopener noreferrer",
        "data-ocid": "writeup.share.twitter_button",
        className: btnCls,
        "aria-label": "Share on Twitter",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Twitter, { className: "w-3.5 h-3.5" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "hidden sm:inline", children: "Twitter" })
        ]
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "a",
      {
        href: linkedinUrl,
        target: "_blank",
        rel: "noopener noreferrer",
        "data-ocid": "writeup.share.linkedin_button",
        className: btnCls,
        "aria-label": "Share on LinkedIn",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Linkedin, { className: "w-3.5 h-3.5" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "hidden sm:inline", children: "LinkedIn" })
        ]
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "button",
      {
        type: "button",
        "data-ocid": "writeup.share.copy_button",
        onClick: copyLink,
        className: btnCls,
        "aria-label": "Copy link",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Copy, { className: "w-3.5 h-3.5" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "hidden sm:inline", children: "Copy" })
        ]
      }
    )
  ] });
}
function formatDate(dateStr) {
  try {
    const d = new Date(dateStr);
    if (Number.isNaN(d.getTime())) return dateStr;
    return d.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric"
    });
  } catch {
    return dateStr;
  }
}
function getFirstTextDescription(content) {
  var _a;
  try {
    const parsed = JSON.parse(content);
    const block = (_a = parsed.blocks) == null ? void 0 : _a.find(
      (b) => b.type === "paragraph" && b.content
    );
    return ((block == null ? void 0 : block.content) ?? "").replace(/<[^>]*>/g, "").slice(0, 160);
  } catch {
    return content.slice(0, 160);
  }
}
function WriteupPage() {
  const { slug } = useParams({ from: "/writeup/$slug" });
  const { data: writeup, isLoading, isError } = useWriteup(slug);
  const { data: related } = useRelatedWriteups((writeup == null ? void 0 : writeup.id) ?? null, 3);
  const [activeId, setActiveId] = reactExports.useState("");
  const observerRef = reactExports.useRef(null);
  const currentUrl = typeof window !== "undefined" ? window.location.href : "";
  const headings = (writeup == null ? void 0 : writeup.content) ? extractHeadings(writeup.content) : [];
  reactExports.useEffect(() => {
    if (!writeup) return;
    document.title = `${writeup.title} | CTF Writeups`;
    const description = getFirstTextDescription(writeup.content);
    function setMeta(name, content, isProp = false) {
      const attr = isProp ? "property" : "name";
      let el = document.querySelector(
        `meta[${attr}="${name}"]`
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
  reactExports.useEffect(() => {
    var _a;
    if (headings.length === 0) return;
    (_a = observerRef.current) == null ? void 0 : _a.disconnect();
    observerRef.current = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
            break;
          }
        }
      },
      { rootMargin: "-80px 0px -60% 0px", threshold: 0 }
    );
    for (const h of headings) {
      const el = document.getElementById(h.id);
      if (el) observerRef.current.observe(el);
    }
    return () => {
      var _a2;
      return (_a2 = observerRef.current) == null ? void 0 : _a2.disconnect();
    };
  }, [headings]);
  if (isLoading) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx(Layout, { children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "max-w-5xl mx-auto px-4 py-10", children: /* @__PURE__ */ jsxRuntimeExports.jsx(WriteupSkeleton, {}) }) });
  }
  if (isError || !writeup) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx(Layout, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: "max-w-2xl mx-auto px-4 py-24 text-center",
        "data-ocid": "writeup.error_state",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-mono text-6xl font-bold text-primary mb-4", children: "404" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display text-2xl font-semibold text-foreground mb-2", children: "Writeup not found" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-muted-foreground text-sm mb-8 font-body", children: [
            "The writeup",
            " ",
            /* @__PURE__ */ jsxRuntimeExports.jsxs("code", { className: "font-mono text-primary bg-muted px-1 py-0.5 rounded text-xs", children: [
              "/",
              slug
            ] }),
            " ",
            "doesn't exist or was removed."
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Link,
            {
              to: "/",
              "data-ocid": "writeup.back_home_link",
              className: "inline-flex items-center gap-2 font-mono text-sm text-primary border border-primary/50 px-4 py-2 rounded hover:bg-primary/10 transition-smooth",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowLeft, { className: "w-4 h-4" }),
                "cd ../writeups"
              ]
            }
          )
        ]
      }
    ) });
  }
  const hasFlag = !!writeup.flag;
  const relatedList = (related ?? []).filter((r) => r.id !== writeup.id);
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Layout, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "article",
    {
      className: "max-w-5xl mx-auto px-4 sm:px-6 py-8 lg:py-10",
      "data-ocid": "writeup.page",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          Link,
          {
            to: "/",
            "data-ocid": "writeup.back_link",
            className: "inline-flex items-center gap-1.5 font-mono text-xs text-muted-foreground hover:text-primary transition-colors mb-7 group",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowLeft, { className: "w-3.5 h-3.5 group-hover:-translate-x-0.5 transition-transform duration-150" }),
              "cd .."
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("header", { className: "mb-8 space-y-4", "data-ocid": "writeup.header", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display text-2xl sm:text-3xl lg:text-4xl font-bold text-foreground leading-tight", children: writeup.title }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap items-center gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(CategoryBadge, { category: writeup.category, size: "md" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(DifficultyBadge, { difficulty: writeup.difficulty, size: "md" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1.5 text-muted-foreground ml-1", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Calendar, { className: "w-3.5 h-3.5" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-mono text-xs", children: formatDate(writeup.date_solved) })
            ] })
          ] }),
          writeup.tags.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx(
            "div",
            {
              className: "flex flex-wrap gap-1.5",
              "data-ocid": "writeup.tags.list",
              children: writeup.tags.map((tag) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
                Link,
                {
                  to: "/",
                  search: { tags: tag },
                  "data-ocid": "writeup.tag.link",
                  className: "font-mono text-[11px] px-2 py-0.5 rounded border border-border bg-muted/50 text-muted-foreground hover:text-primary hover:border-primary/50 transition-colors",
                  children: [
                    "#",
                    tag
                  ]
                },
                tag
              ))
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex justify-start sm:justify-end pt-1", children: /* @__PURE__ */ jsxRuntimeExports.jsx(ShareButtons, { title: writeup.title, url: currentUrl }) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(TableOfContents, { items: headings, activeId, mobileOnly: true }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-10 items-start", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", "data-ocid": "writeup.content", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(ContentRenderer, { content: writeup.content }),
            hasFlag && /* @__PURE__ */ jsxRuntimeExports.jsx(
              FlagSection,
              {
                flag: writeup.flag,
                flagHidden: writeup.flag_hidden
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(TableOfContents, { items: headings, activeId, desktopOnly: true })
        ] }),
        relatedList.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "section",
          {
            className: "mt-16 pt-8 border-t border-border",
            "data-ocid": "writeup.related.section",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 mb-6", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-mono text-sm text-primary", children: "$" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-xl font-semibold text-foreground", children: "Related Writeups" })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "div",
                {
                  className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4",
                  "data-ocid": "writeup.related.list",
                  children: relatedList.map((r, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(WriteupCard, { writeup: r, index: i }, r.id.toString()))
                }
              )
            ]
          }
        )
      ]
    }
  ) });
}
export {
  WriteupPage
};
