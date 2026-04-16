import { Link } from "@tanstack/react-router";
import { ArrowLeft, Terminal } from "lucide-react";
import { Layout } from "../components/Layout";

export function NotFound() {
  return (
    <Layout>
      <div
        className="min-h-[60vh] flex flex-col items-center justify-center px-4 text-center"
        data-ocid="not_found.page"
      >
        {/* Terminal window */}
        <div className="w-full max-w-md rounded-lg border border-border bg-card code-glow overflow-hidden">
          <div className="flex items-center gap-1.5 px-4 py-2.5 border-b border-border bg-muted/30">
            <span className="w-2.5 h-2.5 rounded-full bg-[oklch(var(--difficulty-insane))]" />
            <span className="w-2.5 h-2.5 rounded-full bg-[oklch(var(--difficulty-hard))]" />
            <span className="w-2.5 h-2.5 rounded-full bg-[oklch(var(--difficulty-easy))]" />
            <span className="ml-auto font-mono text-[10px] text-muted-foreground">
              bash
            </span>
          </div>
          <div className="p-6 font-mono text-sm space-y-2">
            <div className="flex items-center gap-2 text-muted-foreground">
              <Terminal className="w-4 h-4 text-primary" />
              <span className="text-primary">$</span>
              <span>cat /path/to/page</span>
            </div>
            <div className="text-destructive">
              cat: /path/to/page: No such file or directory
            </div>
            <div className="flex items-center gap-2 text-muted-foreground">
              <span className="text-primary">$</span>
              <span>echo $?</span>
            </div>
            <div className="text-[oklch(var(--difficulty-insane))] text-4xl font-bold pt-2">
              404
            </div>
            <div className="text-muted-foreground text-xs pt-1">
              Page not found. The exploit failed.
            </div>
          </div>
        </div>

        <Link
          to="/"
          data-ocid="not_found.home_link"
          className="mt-8 inline-flex items-center gap-2 font-mono text-sm text-muted-foreground hover:text-foreground border border-border rounded-lg px-4 py-2 hover:border-primary/50 transition-smooth hover:bg-muted/20"
        >
          <ArrowLeft className="w-4 h-4" />
          cd ~/writeups
        </Link>
      </div>
    </Layout>
  );
}
