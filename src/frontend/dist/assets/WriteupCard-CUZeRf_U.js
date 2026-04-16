import { c as createLucideIcon, j as jsxRuntimeExports, b as Link, a as cn } from "./index-CKCLOx63.js";
import { C as CategoryBadge, D as DifficultyBadge } from "./DifficultyBadge-Cp9LesU_.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$1 = [
  ["path", { d: "M8 2v4", key: "1cmpym" }],
  ["path", { d: "M16 2v4", key: "4m81vk" }],
  ["rect", { width: "18", height: "18", x: "3", y: "4", rx: "2", key: "1hopcy" }],
  ["path", { d: "M3 10h18", key: "8toen8" }]
];
const Calendar = createLucideIcon("calendar", __iconNode$1);
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
      d: "M12.586 2.586A2 2 0 0 0 11.172 2H4a2 2 0 0 0-2 2v7.172a2 2 0 0 0 .586 1.414l8.704 8.704a2.426 2.426 0 0 0 3.42 0l6.58-6.58a2.426 2.426 0 0 0 0-3.42z",
      key: "vktsd0"
    }
  ],
  ["circle", { cx: "7.5", cy: "7.5", r: ".5", fill: "currentColor", key: "kqv944" }]
];
const Tag = createLucideIcon("tag", __iconNode);
function getPreviewText(content) {
  var _a;
  try {
    const parsed = JSON.parse(content);
    const block = (_a = parsed.blocks) == null ? void 0 : _a.find(
      (b) => b.type === "paragraph" && b.content
    );
    const raw = (block == null ? void 0 : block.content) ?? "";
    return raw.replace(/<[^>]*>/g, "").slice(0, 150);
  } catch {
    return content.slice(0, 150);
  }
}
function WriteupCard({
  writeup,
  index = 0,
  className
}) {
  const preview = getPreviewText(writeup.content);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    Link,
    {
      to: "/writeup/$slug",
      params: { slug: writeup.slug },
      "data-ocid": `writeup.item.${index + 1}`,
      className: cn(
        "group block rounded-lg border border-border bg-card hover:border-primary/50",
        "transition-smooth hover:shadow-[0_0_20px_oklch(var(--primary)/0.1)]",
        "overflow-hidden",
        className
      ),
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1.5 px-4 py-2.5 border-b border-border bg-muted/30", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "w-2.5 h-2.5 rounded-full bg-[oklch(var(--category-rev))] opacity-70" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "w-2.5 h-2.5 rounded-full bg-[oklch(var(--category-osint))] opacity-70" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "w-2.5 h-2.5 rounded-full bg-[oklch(var(--category-misc))] opacity-70" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "ml-auto font-mono text-[10px] text-muted-foreground", children: writeup.slug })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-4 space-y-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap gap-1.5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(CategoryBadge, { category: writeup.category }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(DifficultyBadge, { difficulty: writeup.difficulty })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display font-semibold text-foreground text-base leading-snug group-hover:text-primary transition-colors line-clamp-2", children: writeup.title }),
          preview && /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm text-muted-foreground line-clamp-2 font-body leading-relaxed", children: [
            preview,
            preview.length >= 150 ? "…" : ""
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between pt-1 gap-2 flex-wrap", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1.5 text-muted-foreground", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Calendar, { className: "w-3 h-3" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-mono text-[11px]", children: writeup.dateSolved })
            ] }),
            writeup.tags.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1 flex-wrap", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Tag, { className: "w-3 h-3 text-muted-foreground" }),
              writeup.tags.slice(0, 3).map((tag) => /* @__PURE__ */ jsxRuntimeExports.jsx(
                "span",
                {
                  className: "font-mono text-[10px] px-1.5 py-0.5 rounded bg-muted text-muted-foreground border border-border",
                  children: tag
                },
                tag
              )),
              writeup.tags.length > 3 && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-mono text-[10px] text-muted-foreground", children: [
                "+",
                writeup.tags.length - 3
              ] })
            ] })
          ] })
        ] })
      ]
    }
  );
}
export {
  Calendar as C,
  WriteupCard as W
};
