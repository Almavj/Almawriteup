import { useIsMobile } from "@/hooks/use-mobile";
import { cn } from "@/lib/utils";
import { Link, useRouterState } from "@tanstack/react-router";
import { Menu, Moon, Shield, Sun, Terminal, X } from "lucide-react";
import { useTheme } from "next-themes";
import { useState } from "react";
import type { ReactNode } from "react";
import { useAuth } from "../hooks/useAuth";

interface LayoutProps {
  children: ReactNode;
}

function NavLink({
  to,
  children,
  onClick,
}: {
  to: string;
  children: ReactNode;
  onClick?: () => void;
}) {
  const router = useRouterState();
  const isActive =
    router.location.pathname === to ||
    router.location.pathname.startsWith(`${to}/`);

  return (
    <Link
      to={to}
      onClick={onClick}
      className={cn(
        "font-mono text-sm tracking-wide transition-colors px-3 py-1.5 rounded",
        isActive
          ? "text-primary bg-primary/10"
          : "text-muted-foreground hover:text-foreground hover:bg-muted/40",
      )}
    >
      {children}
    </Link>
  );
}

export function Layout({ children }: LayoutProps) {
  const { theme, setTheme } = useTheme();
  const isMobile = useIsMobile();
  const [menuOpen, setMenuOpen] = useState(false);
  const { isAuthenticated } = useAuth();
  const currentYear = new Date().getFullYear();
  const hostname = encodeURIComponent(
    typeof window !== "undefined" ? window.location.hostname : "",
  );

  const navLinks = (
    <>
      <NavLink to="/" onClick={() => setMenuOpen(false)}>
        ~/writeups
      </NavLink>
      {isAuthenticated && (
        <NavLink to="/admin/dashboard" onClick={() => setMenuOpen(false)}>
          ~/admin
        </NavLink>
      )}
      {!isAuthenticated && (
        <NavLink to="/admin/login" onClick={() => setMenuOpen(false)}>
          <span className="flex items-center gap-1.5">
            <Shield className="w-3.5 h-3.5" />
            login
          </span>
        </NavLink>
      )}
    </>
  );

  return (
    <div className="min-h-screen flex flex-col bg-background">
      {/* Header */}
      <header
        className="sticky top-0 z-40 bg-card border-b border-border shadow-[0_1px_0_oklch(var(--border))]"
        data-ocid="nav"
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-14 flex items-center justify-between">
          {/* Logo */}
          <Link
            to="/"
            className="flex items-center gap-2 group"
            data-ocid="nav.home_link"
          >
            <div className="w-7 h-7 rounded bg-primary/10 border border-primary/30 flex items-center justify-center group-hover:border-primary/60 transition-colors">
              <Terminal className="w-3.5 h-3.5 text-primary" />
            </div>
            <span className="font-mono font-bold text-sm tracking-tight">
              <span className="text-primary">0x</span>
              <span className="text-foreground">PwnHub</span>
            </span>
          </Link>

          {/* Desktop nav */}
          {!isMobile && (
            <nav
              className="flex items-center gap-1"
              aria-label="Main navigation"
            >
              {navLinks}
            </nav>
          )}

          {/* Right controls */}
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              aria-label="Toggle theme"
              data-ocid="nav.theme_toggle"
              className="p-2 rounded hover:bg-muted/40 text-muted-foreground hover:text-foreground transition-colors"
            >
              {theme === "dark" ? (
                <Sun className="w-4 h-4" />
              ) : (
                <Moon className="w-4 h-4" />
              )}
            </button>

            {isMobile && (
              <button
                type="button"
                onClick={() => setMenuOpen((v) => !v)}
                aria-label="Toggle menu"
                data-ocid="nav.menu_toggle"
                className="p-2 rounded hover:bg-muted/40 text-muted-foreground hover:text-foreground transition-colors"
              >
                {menuOpen ? (
                  <X className="w-4 h-4" />
                ) : (
                  <Menu className="w-4 h-4" />
                )}
              </button>
            )}
          </div>
        </div>

        {/* Mobile menu */}
        {isMobile && menuOpen && (
          <div
            className="border-t border-border bg-card px-4 py-3 flex flex-col gap-1"
            data-ocid="nav.mobile_menu"
          >
            {navLinks}
          </div>
        )}
      </header>

      {/* Main content */}
      <main className="flex-1 bg-background">{children}</main>

      {/* Footer */}
      <footer
        className="bg-card border-t border-border mt-auto"
        data-ocid="footer"
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-6 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <Terminal className="w-3.5 h-3.5 text-primary" />
            <span className="font-mono text-xs text-muted-foreground">
              <span className="text-primary">0x</span>PwnHub
            </span>
          </div>
          <p className="text-xs text-muted-foreground font-body text-center">
            © {currentYear}. Built with love.
          </p>
          <div className="flex items-center gap-1 font-mono text-[10px] text-muted-foreground/50">
            <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
            <span>online</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
