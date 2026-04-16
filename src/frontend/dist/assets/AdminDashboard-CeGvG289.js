import { c as createLucideIcon, e as useNavigate, d as useAuth, r as reactExports, j as jsxRuntimeExports, L as Layout, S as Shield, b as Link } from "./index-CKCLOx63.js";
import { S as Skeleton, P as Plus, D as Dialog, a as DialogContent, b as DialogHeader, c as DialogTitle, d as DialogDescription, e as DialogFooter, T as Trash2, B as Badge } from "./skeleton-Bbvb28Gt.js";
import { B as Button } from "./button-Fv9-c4dC.js";
import { u as ue } from "./index-Bz35GNb2.js";
import { C as CategoryBadge, D as DifficultyBadge } from "./DifficultyBadge-Cp9LesU_.js";
import { d as useIsAdmin, e as useClaimAdmin, f as useAllWriteups, g as useImages, h as useDeleteWriteup } from "./useBackend-CUQ31Mfe.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$4 = [
  ["path", { d: "M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z", key: "1rqfz7" }],
  ["path", { d: "M14 2v4a2 2 0 0 0 2 2h4", key: "tnqrlb" }],
  ["path", { d: "M10 9H8", key: "b1mrlr" }],
  ["path", { d: "M16 13H8", key: "t4e002" }],
  ["path", { d: "M16 17H8", key: "z1uh3a" }]
];
const FileText = createLucideIcon("file-text", __iconNode$4);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$3 = [
  ["circle", { cx: "12", cy: "12", r: "10", key: "1mglay" }],
  ["path", { d: "M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20", key: "13o1zl" }],
  ["path", { d: "M2 12h20", key: "9i4pu4" }]
];
const Globe = createLucideIcon("globe", __iconNode$3);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$2 = [
  ["rect", { width: "18", height: "18", x: "3", y: "3", rx: "2", ry: "2", key: "1m3agn" }],
  ["circle", { cx: "9", cy: "9", r: "2", key: "af1f0g" }],
  ["path", { d: "m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21", key: "1xmnt7" }]
];
const Image = createLucideIcon("image", __iconNode$2);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$1 = [
  ["path", { d: "m16 17 5-5-5-5", key: "1bji2h" }],
  ["path", { d: "M21 12H9", key: "dn1m92" }],
  ["path", { d: "M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4", key: "1uf3rs" }]
];
const LogOut = createLucideIcon("log-out", __iconNode$1);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["path", { d: "M12 20h9", key: "t2du7b" }],
  [
    "path",
    {
      d: "M16.376 3.622a1 1 0 0 1 3.002 3.002L7.368 18.635a2 2 0 0 1-.855.506l-2.872.838a.5.5 0 0 1-.62-.62l.838-2.872a2 2 0 0 1 .506-.854z",
      key: "1ykcvy"
    }
  ]
];
const PenLine = createLucideIcon("pen-line", __iconNode);
function StatsCard({
  icon,
  label,
  value,
  loading
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-card border border-border rounded-lg p-4 flex items-center gap-4", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-10 h-10 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center flex-shrink-0", children: icon }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-mono text-muted-foreground uppercase tracking-widest", children: label }),
      loading ? /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-6 w-12 mt-1" }) : /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-2xl font-display font-bold text-foreground", children: value })
    ] })
  ] });
}
function WriteupRow({
  writeup,
  index,
  onDelete
}) {
  const date = writeup.dateSolved ? new Date(writeup.dateSolved).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric"
  }) : "—";
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "tr",
    {
      className: "border-b border-border/50 hover:bg-muted/20 transition-colors group",
      "data-ocid": `dashboard.writeup_row.item.${index}`,
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("td", { className: "px-4 py-3 max-w-[220px]", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-body text-sm font-medium text-foreground truncate block", children: writeup.title }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-mono text-xs text-muted-foreground/60 truncate block", children: [
            "/",
            writeup.slug
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3 hidden sm:table-cell", children: /* @__PURE__ */ jsxRuntimeExports.jsx(CategoryBadge, { category: writeup.category }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3 hidden md:table-cell", children: /* @__PURE__ */ jsxRuntimeExports.jsx(DifficultyBadge, { difficulty: writeup.difficulty }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
          Badge,
          {
            variant: writeup.draft ? "secondary" : "default",
            className: "font-mono text-xs",
            "data-ocid": `dashboard.writeup_status.${index}`,
            children: writeup.draft ? "draft" : "published"
          }
        ) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3 hidden lg:table-cell", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-mono text-xs text-muted-foreground", children: date }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1.5 justify-end", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Button,
            {
              asChild: true,
              variant: "ghost",
              size: "sm",
              className: "h-7 px-2 font-mono text-xs",
              "data-ocid": `dashboard.edit_button.${index}`,
              children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
                Link,
                {
                  to: "/admin/writeup/$id",
                  params: { id: writeup.id.toString() },
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(PenLine, { className: "w-3.5 h-3.5 mr-1" }),
                    "Edit"
                  ]
                }
              )
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Button,
            {
              variant: "ghost",
              size: "sm",
              onClick: () => onDelete(writeup),
              className: "h-7 px-2 font-mono text-xs text-destructive hover:text-destructive hover:bg-destructive/10",
              "data-ocid": `dashboard.delete_button.${index}`,
              children: /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { className: "w-3.5 h-3.5" })
            }
          )
        ] }) })
      ]
    }
  );
}
function AdminDashboardPage() {
  const navigate = useNavigate();
  const { isAuthenticated, isInitializing, logout } = useAuth();
  const { data: isAdmin } = useIsAdmin();
  const claimAdmin = useClaimAdmin();
  const { data: writeups, isLoading: writeupsLoading } = useAllWriteups();
  const { data: images, isLoading: imagesLoading } = useImages();
  const deleteWriteup = useDeleteWriteup();
  const [deleteTarget, setDeleteTarget] = reactExports.useState(null);
  const [deleteConfirming, setDeleteConfirming] = reactExports.useState(false);
  reactExports.useEffect(() => {
    if (!isInitializing && !isAuthenticated) {
      navigate({ to: "/admin/login" });
    }
  }, [isAuthenticated, isInitializing, navigate]);
  reactExports.useEffect(() => {
    if (isAuthenticated && isAdmin === false && !claimAdmin.isPending) {
      claimAdmin.mutate(void 0, {
        onError: (err) => {
          console.warn("claimAdmin:", err);
        }
      });
    }
  }, [isAuthenticated, isAdmin, claimAdmin]);
  const handleLogout = () => {
    logout();
    navigate({ to: "/" });
  };
  const handleDeleteConfirm = async () => {
    if (!deleteTarget) return;
    setDeleteConfirming(true);
    try {
      await deleteWriteup.mutateAsync(deleteTarget.id);
      ue.success(`"${deleteTarget.title}" deleted`);
      setDeleteTarget(null);
    } catch (err) {
      ue.error(err instanceof Error ? err.message : "Delete failed");
    } finally {
      setDeleteConfirming(false);
    }
  };
  if (isInitializing || !isAuthenticated && !isInitializing) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx(Layout, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-6xl mx-auto px-4 sm:px-6 py-8 space-y-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-8 w-48" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-2 md:grid-cols-4 gap-4", children: [1, 2, 3, 4].map((i) => /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-20 rounded-lg" }, i)) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-64 rounded-lg" })
    ] }) });
  }
  const total = (writeups == null ? void 0 : writeups.length) ?? 0;
  const published = (writeups == null ? void 0 : writeups.filter((w) => !w.draft).length) ?? 0;
  const drafts = (writeups == null ? void 0 : writeups.filter((w) => w.draft).length) ?? 0;
  const totalImages = (images == null ? void 0 : images.length) ?? 0;
  const sortedWriteups = [...writeups ?? []].sort(
    (a, b) => Number(b.createdAt) - Number(a.createdAt)
  );
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(Layout, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: "max-w-6xl mx-auto px-4 sm:px-6 py-8 space-y-8",
        "data-ocid": "admin_dashboard.page",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col sm:flex-row sm:items-center justify-between gap-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-8 h-8 rounded-lg bg-primary/10 border border-primary/30 flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Shield, { className: "w-4 h-4 text-primary" }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-xl font-display font-semibold text-foreground", children: "Admin Dashboard" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-mono text-muted-foreground", children: "Manage CTF writeups" })
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Button,
                {
                  asChild: true,
                  size: "sm",
                  className: "font-mono text-xs",
                  "data-ocid": "dashboard.new_writeup_button",
                  children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/admin/writeup/new", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "w-3.5 h-3.5 mr-1.5" }),
                    "New Writeup"
                  ] })
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                Button,
                {
                  variant: "ghost",
                  size: "sm",
                  onClick: handleLogout,
                  className: "font-mono text-xs text-muted-foreground",
                  "data-ocid": "dashboard.logout_button",
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(LogOut, { className: "w-3.5 h-3.5 mr-1.5" }),
                    "Logout"
                  ]
                }
              )
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "div",
            {
              className: "grid grid-cols-2 md:grid-cols-4 gap-4",
              "data-ocid": "dashboard.stats",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  StatsCard,
                  {
                    icon: /* @__PURE__ */ jsxRuntimeExports.jsx(FileText, { className: "w-5 h-5 text-primary" }),
                    label: "Total",
                    value: total,
                    loading: writeupsLoading
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  StatsCard,
                  {
                    icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Globe, { className: "w-5 h-5 text-accent" }),
                    label: "Published",
                    value: published,
                    loading: writeupsLoading
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  StatsCard,
                  {
                    icon: /* @__PURE__ */ jsxRuntimeExports.jsx(PenLine, { className: "w-5 h-5 text-muted-foreground" }),
                    label: "Drafts",
                    value: drafts,
                    loading: writeupsLoading
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  StatsCard,
                  {
                    icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Image, { className: "w-5 h-5 text-primary/80" }),
                    label: "Images",
                    value: totalImages,
                    loading: imagesLoading
                  }
                )
              ]
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "div",
            {
              className: "bg-card border border-border rounded-xl overflow-hidden",
              "data-ocid": "dashboard.writeups_table",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "px-4 py-3 border-b border-border flex items-center justify-between", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-sm font-semibold text-foreground", children: "Writeups" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-mono text-xs text-muted-foreground", children: [
                    total,
                    " total"
                  ] })
                ] }),
                writeupsLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-4 space-y-2", children: [1, 2, 3, 4, 5].map((i) => /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-12 rounded-md" }, i)) }) : sortedWriteups.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  "div",
                  {
                    className: "py-16 text-center space-y-3",
                    "data-ocid": "dashboard.writeups_table.empty_state",
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(FileText, { className: "w-10 h-10 text-muted-foreground/30 mx-auto" }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-mono text-sm text-muted-foreground", children: "No writeups yet" }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        Button,
                        {
                          asChild: true,
                          size: "sm",
                          variant: "outline",
                          className: "font-mono text-xs",
                          children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/admin/writeup/new", children: [
                            /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "w-3.5 h-3.5 mr-1.5" }),
                            "Create first writeup"
                          ] })
                        }
                      )
                    ]
                  }
                ) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "overflow-x-auto", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("table", { className: "w-full text-sm", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("thead", { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { className: "border-b border-border bg-muted/20", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-4 py-2 text-left font-mono text-xs text-muted-foreground uppercase tracking-widest", children: "Title" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-4 py-2 text-left font-mono text-xs text-muted-foreground uppercase tracking-widest hidden sm:table-cell", children: "Category" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-4 py-2 text-left font-mono text-xs text-muted-foreground uppercase tracking-widest hidden md:table-cell", children: "Difficulty" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-4 py-2 text-left font-mono text-xs text-muted-foreground uppercase tracking-widest", children: "Status" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-4 py-2 text-left font-mono text-xs text-muted-foreground uppercase tracking-widest hidden lg:table-cell", children: "Date" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-4 py-2 text-right font-mono text-xs text-muted-foreground uppercase tracking-widest", children: "Actions" })
                  ] }) }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("tbody", { children: sortedWriteups.map((w, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(
                    WriteupRow,
                    {
                      writeup: w,
                      index: i + 1,
                      onDelete: setDeleteTarget
                    },
                    w.id.toString()
                  )) })
                ] }) })
              ]
            }
          )
        ]
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      Dialog,
      {
        open: !!deleteTarget,
        onOpenChange: (open) => !open && setDeleteTarget(null),
        children: /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogContent, { "data-ocid": "dashboard.delete_dialog", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogHeader, { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(DialogTitle, { className: "font-display", children: "Delete Writeup?" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogDescription, { className: "font-body", children: [
              "This will permanently delete",
              " ",
              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-semibold text-foreground", children: [
                "“",
                deleteTarget == null ? void 0 : deleteTarget.title,
                "”"
              ] }),
              ". This action cannot be undone."
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogFooter, { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Button,
              {
                variant: "outline",
                onClick: () => setDeleteTarget(null),
                disabled: deleteConfirming,
                className: "font-mono text-xs",
                "data-ocid": "dashboard.delete_dialog.cancel_button",
                children: "Cancel"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Button,
              {
                variant: "destructive",
                onClick: handleDeleteConfirm,
                disabled: deleteConfirming,
                className: "font-mono text-xs",
                "data-ocid": "dashboard.delete_dialog.confirm_button",
                children: deleteConfirming ? /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-2", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "w-3.5 h-3.5 border-2 border-destructive-foreground/40 border-t-destructive-foreground rounded-full animate-spin" }),
                  "Deleting..."
                ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-2", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { className: "w-3.5 h-3.5" }),
                  "Delete"
                ] })
              }
            )
          ] })
        ] })
      }
    )
  ] });
}
export {
  AdminDashboardPage
};
