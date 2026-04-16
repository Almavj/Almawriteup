import { c as createLucideIcon, d as useAuth, e as useNavigate, r as reactExports, j as jsxRuntimeExports, S as Shield, T as Terminal } from "./index-CKCLOx63.js";
import { B as Button } from "./button-Fv9-c4dC.js";
import { u as ue } from "./index-Bz35GNb2.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["rect", { width: "18", height: "11", x: "3", y: "11", rx: "2", ry: "2", key: "1w4ew1" }],
  ["path", { d: "M7 11V7a5 5 0 0 1 10 0v4", key: "fwvmzm" }]
];
const Lock = createLucideIcon("lock", __iconNode);
function AdminLoginPage() {
  const { isAuthenticated, isInitializing, isLoggingIn, login, loginError } = useAuth();
  const navigate = useNavigate();
  reactExports.useEffect(() => {
    if (isAuthenticated) {
      navigate({ to: "/admin/dashboard" });
    }
  }, [isAuthenticated, navigate]);
  reactExports.useEffect(() => {
    if (loginError) {
      ue.error("Authentication failed. Please try again.");
    }
  }, [loginError]);
  const handleLogin = async () => {
    try {
      await login();
    } catch {
      ue.error("Login failed. Please try again.");
    }
  };
  if (isInitializing) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "min-h-screen bg-background flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 font-mono text-sm text-muted-foreground animate-pulse", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "span",
        {
          className: "w-2 h-2 rounded-full bg-primary animate-bounce",
          style: { animationDelay: "0ms" }
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "span",
        {
          className: "w-2 h-2 rounded-full bg-primary animate-bounce",
          style: { animationDelay: "150ms" }
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "span",
        {
          className: "w-2 h-2 rounded-full bg-primary animate-bounce",
          style: { animationDelay: "300ms" }
        }
      )
    ] }) });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: "min-h-screen bg-background flex items-center justify-center px-4 relative overflow-hidden",
      "data-ocid": "admin_login.page",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            className: "absolute inset-0 pointer-events-none opacity-[0.035]",
            style: {
              backgroundImage: "linear-gradient(oklch(0.75 0.23 260) 1px, transparent 1px), linear-gradient(90deg, oklch(0.75 0.23 260) 1px, transparent 1px)",
              backgroundSize: "40px 40px"
            }
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full bg-primary/5 blur-3xl pointer-events-none" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative w-full max-w-sm", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "div",
            {
              className: "bg-card border border-border rounded-xl p-8 shadow-[0_0_40px_oklch(var(--primary)/0.08)] space-y-8",
              "data-ocid": "admin_login.card",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center space-y-4", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "inline-flex w-14 h-14 rounded-xl bg-primary/10 border border-primary/30 items-center justify-center mx-auto", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Shield, { className: "w-6 h-6 text-primary" }) }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-center gap-2 mb-1", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(Terminal, { className: "w-3.5 h-3.5 text-primary" }),
                      /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-mono font-bold text-sm tracking-tight", children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-primary", children: "0x" }),
                        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-foreground", children: "PwnHub" })
                      ] })
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-xl font-display font-semibold text-foreground", children: "Admin Access" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground mt-1.5 font-body", children: "Authenticate with Internet Identity to manage writeups" })
                  ] })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 flex items-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-full border-t border-border" }) }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "relative flex justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "bg-card px-3 text-xs font-mono text-muted-foreground/60 uppercase tracking-widest", children: "secure login" }) })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-3", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Button,
                    {
                      onClick: handleLogin,
                      disabled: isLoggingIn,
                      className: "w-full font-mono tracking-wide",
                      size: "lg",
                      "data-ocid": "admin_login.login_button",
                      children: isLoggingIn ? /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-2", children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "w-4 h-4 border-2 border-primary-foreground/40 border-t-primary-foreground rounded-full animate-spin" }),
                        "Authenticating..."
                      ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-2", children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx(Lock, { className: "w-4 h-4" }),
                        "Login with Internet Identity"
                      ] })
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-center text-xs text-muted-foreground/60 font-mono", children: "Only authorized principals can access admin" })
                ] })
              ]
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-center mt-4 font-mono text-xs text-muted-foreground/40", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-primary", children: "$" }),
            " sudo access-ctf-admin"
          ] })
        ] })
      ]
    }
  );
}
export {
  AdminLoginPage
};
