import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useNavigate } from "@tanstack/react-router";
import { Lock, Shield, Terminal } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { useAuth } from "../hooks/useAuth";

export function AdminLoginPage() {
  const { isAuthenticated, isInitializing, isLoggingIn, login, loginError } =
    useAuth();
  const navigate = useNavigate();
  const [password, setPassword] = useState("");

  useEffect(() => {
    if (isAuthenticated) {
      navigate({ to: "/admin/dashboard" });
    }
  }, [isAuthenticated, navigate]);

  useEffect(() => {
    if (loginError) {
      toast.error("Authentication failed. Please try again.");
    }
  }, [loginError]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await login(password);
    } catch {
      toast.error("Login failed. Please try again.");
    }
  };

  if (isInitializing) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="flex items-center gap-2 font-mono text-sm text-muted-foreground animate-pulse">
          <span
            className="w-2 h-2 rounded-full bg-primary animate-bounce"
            style={{ animationDelay: "0ms" }}
          />
          <span
            className="w-2 h-2 rounded-full bg-primary animate-bounce"
            style={{ animationDelay: "150ms" }}
          />
          <span
            className="w-2 h-2 rounded-full bg-primary animate-bounce"
            style={{ animationDelay: "300ms" }}
          />
        </div>
      </div>
    );
  }

  return (
    <div
      className="min-h-screen bg-background flex items-center justify-center px-4 relative overflow-hidden"
      data-ocid="admin_login.page"
    >
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.035]"
        style={{
          backgroundImage:
            "linear-gradient(oklch(0.75 0.23 260) 1px, transparent 1px), linear-gradient(90deg, oklch(0.75 0.23 260) 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
      />
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full bg-primary/5 blur-3xl pointer-events-none" />

      <div className="relative w-full max-w-sm">
        <div
          className="bg-card border border-border rounded-xl p-8 shadow-[0_0_40px_oklch(var(--primary)/0.08)] space-y-8"
          data-ocid="admin_login.card"
        >
          <div className="text-center space-y-4">
            <div className="inline-flex w-14 h-14 rounded-xl bg-primary/10 border border-primary/30 items-center justify-center mx-auto">
              <Shield className="w-6 h-6 text-primary" />
            </div>
            <div>
              <div className="flex items-center justify-center gap-2 mb-1">
                <Terminal className="w-3.5 h-3.5 text-primary" />
                <span className="font-mono font-bold text-sm tracking-tight">
                  <span className="text-primary">0x</span>
                  <span className="text-foreground">PwnHub</span>
                </span>
              </div>
              <h1 className="text-xl font-display font-semibold text-foreground">
                Admin Access
              </h1>
              <p className="text-sm text-muted-foreground mt-1.5 font-body">
                Enter your admin password to manage writeups
              </p>
            </div>
          </div>

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-border" />
            </div>
            <div className="relative flex justify-center">
              <span className="bg-card px-3 text-xs font-mono text-muted-foreground/60 uppercase tracking-widest">
                secure login
              </span>
            </div>
          </div>

          <form onSubmit={handleLogin} className="space-y-3">
            <div className="space-y-2">
              <Input
                type="password"
                placeholder="Enter admin password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="font-mono"
                data-ocid="admin_login.password_input"
              />
            </div>
            <Button
              type="submit"
              disabled={isLoggingIn}
              className="w-full font-mono tracking-wide"
              size="lg"
              data-ocid="admin_login.login_button"
            >
              {isLoggingIn ? (
                <span className="flex items-center gap-2">
                  <span className="w-4 h-4 border-2 border-primary-foreground/40 border-t-primary-foreground rounded-full animate-spin" />
                  Authenticating...
                </span>
              ) : (
                <span className="flex items-center gap-2">
                  <Lock className="w-4 h-4" />
                  Login
                </span>
              )}
            </Button>
          </form>
        </div>

        <p className="text-center mt-4 font-mono text-xs text-muted-foreground/40">
          <span className="text-primary">$</span> sudo access-ctf-admin
        </p>
      </div>
    </div>
  );
}
