import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Skeleton } from "@/components/ui/skeleton";
import { Link, useNavigate } from "@tanstack/react-router";
import {
  FileText,
  Globe,
  Image,
  LogOut,
  PenLine,
  Plus,
  Shield,
  Trash2,
} from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { CategoryBadge } from "../components/CategoryBadge";
import { DifficultyBadge } from "../components/DifficultyBadge";
import { Layout } from "../components/Layout";
import { useAuth } from "../hooks/useAuth";
import {
  useAllWriteups,
  useClaimAdmin,
  useDeleteWriteup,
  useImages,
  useIsAdmin,
} from "../hooks/useBackend";
import { CATEGORY_LABELS, DIFFICULTY_LABELS } from "../types";
import type { Writeup } from "../types";

function StatsCard({
  icon,
  label,
  value,
  loading,
}: {
  icon: React.ReactNode;
  label: string;
  value: number | string;
  loading?: boolean;
}) {
  return (
    <div className="bg-card border border-border rounded-lg p-4 flex items-center gap-4">
      <div className="w-10 h-10 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center flex-shrink-0">
        {icon}
      </div>
      <div className="min-w-0">
        <p className="text-xs font-mono text-muted-foreground uppercase tracking-widest">
          {label}
        </p>
        {loading ? (
          <Skeleton className="h-6 w-12 mt-1" />
        ) : (
          <p className="text-2xl font-display font-bold text-foreground">
            {value}
          </p>
        )}
      </div>
    </div>
  );
}

function WriteupRow({
  writeup,
  index,
  onDelete,
}: {
  writeup: Writeup;
  index: number;
  onDelete: (writeup: Writeup) => void;
}) {
  const date = writeup.dateSolved
    ? new Date(writeup.dateSolved).toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      })
    : "—";

  return (
    <tr
      className="border-b border-border/50 hover:bg-muted/20 transition-colors group"
      data-ocid={`dashboard.writeup_row.item.${index}`}
    >
      <td className="px-4 py-3 max-w-[220px]">
        <span className="font-body text-sm font-medium text-foreground truncate block">
          {writeup.title}
        </span>
        <span className="font-mono text-xs text-muted-foreground/60 truncate block">
          /{writeup.slug}
        </span>
      </td>
      <td className="px-4 py-3 hidden sm:table-cell">
        <CategoryBadge category={writeup.category} />
      </td>
      <td className="px-4 py-3 hidden md:table-cell">
        <DifficultyBadge difficulty={writeup.difficulty} />
      </td>
      <td className="px-4 py-3">
        <Badge
          variant={writeup.draft ? "secondary" : "default"}
          className="font-mono text-xs"
          data-ocid={`dashboard.writeup_status.${index}`}
        >
          {writeup.draft ? "draft" : "published"}
        </Badge>
      </td>
      <td className="px-4 py-3 hidden lg:table-cell">
        <span className="font-mono text-xs text-muted-foreground">{date}</span>
      </td>
      <td className="px-4 py-3">
        <div className="flex items-center gap-1.5 justify-end">
          <Button
            asChild
            variant="ghost"
            size="sm"
            className="h-7 px-2 font-mono text-xs"
            data-ocid={`dashboard.edit_button.${index}`}
          >
            <Link
              to="/admin/writeup/$id"
              params={{ id: writeup.id.toString() }}
            >
              <PenLine className="w-3.5 h-3.5 mr-1" />
              Edit
            </Link>
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onDelete(writeup)}
            className="h-7 px-2 font-mono text-xs text-destructive hover:text-destructive hover:bg-destructive/10"
            data-ocid={`dashboard.delete_button.${index}`}
          >
            <Trash2 className="w-3.5 h-3.5" />
          </Button>
        </div>
      </td>
    </tr>
  );
}

export function AdminDashboardPage() {
  const navigate = useNavigate();
  const { isAuthenticated, isInitializing, logout } = useAuth();
  const { data: isAdmin } = useIsAdmin();
  const claimAdmin = useClaimAdmin();
  const { data: writeups, isLoading: writeupsLoading } = useAllWriteups();
  const { data: images, isLoading: imagesLoading } = useImages();
  const deleteWriteup = useDeleteWriteup();

  const [deleteTarget, setDeleteTarget] = useState<Writeup | null>(null);
  const [deleteConfirming, setDeleteConfirming] = useState(false);

  // Redirect if not authenticated
  useEffect(() => {
    if (!isInitializing && !isAuthenticated) {
      navigate({ to: "/admin/login" });
    }
  }, [isAuthenticated, isInitializing, navigate]);

  // Claim admin on first load
  useEffect(() => {
    if (isAuthenticated && isAdmin === false && !claimAdmin.isPending) {
      claimAdmin.mutate(undefined, {
        onError: (err) => {
          // Silently ignore — admin may already be claimed
          console.warn("claimAdmin:", err);
        },
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
      toast.success(`"${deleteTarget.title}" deleted`);
      setDeleteTarget(null);
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Delete failed");
    } finally {
      setDeleteConfirming(false);
    }
  };

  if (isInitializing || (!isAuthenticated && !isInitializing)) {
    return (
      <Layout>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8 space-y-6">
          <Skeleton className="h-8 w-48" />
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[1, 2, 3, 4].map((i) => (
              <Skeleton key={i} className="h-20 rounded-lg" />
            ))}
          </div>
          <Skeleton className="h-64 rounded-lg" />
        </div>
      </Layout>
    );
  }

  const total = writeups?.length ?? 0;
  const published = writeups?.filter((w) => !w.draft).length ?? 0;
  const drafts = writeups?.filter((w) => w.draft).length ?? 0;
  const totalImages = images?.length ?? 0;

  const sortedWriteups = [...(writeups ?? [])].sort(
    (a, b) => Number(b.createdAt) - Number(a.createdAt),
  );

  return (
    <Layout>
      <div
        className="max-w-6xl mx-auto px-4 sm:px-6 py-8 space-y-8"
        data-ocid="admin_dashboard.page"
      >
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-primary/10 border border-primary/30 flex items-center justify-center">
              <Shield className="w-4 h-4 text-primary" />
            </div>
            <div>
              <h1 className="text-xl font-display font-semibold text-foreground">
                Admin Dashboard
              </h1>
              <p className="text-xs font-mono text-muted-foreground">
                Manage CTF writeups
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button
              asChild
              size="sm"
              className="font-mono text-xs"
              data-ocid="dashboard.new_writeup_button"
            >
              <Link to="/admin/writeup/new">
                <Plus className="w-3.5 h-3.5 mr-1.5" />
                New Writeup
              </Link>
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={handleLogout}
              className="font-mono text-xs text-muted-foreground"
              data-ocid="dashboard.logout_button"
            >
              <LogOut className="w-3.5 h-3.5 mr-1.5" />
              Logout
            </Button>
          </div>
        </div>

        {/* Stats */}
        <div
          className="grid grid-cols-2 md:grid-cols-4 gap-4"
          data-ocid="dashboard.stats"
        >
          <StatsCard
            icon={<FileText className="w-5 h-5 text-primary" />}
            label="Total"
            value={total}
            loading={writeupsLoading}
          />
          <StatsCard
            icon={<Globe className="w-5 h-5 text-accent" />}
            label="Published"
            value={published}
            loading={writeupsLoading}
          />
          <StatsCard
            icon={<PenLine className="w-5 h-5 text-muted-foreground" />}
            label="Drafts"
            value={drafts}
            loading={writeupsLoading}
          />
          <StatsCard
            icon={<Image className="w-5 h-5 text-primary/80" />}
            label="Images"
            value={totalImages}
            loading={imagesLoading}
          />
        </div>

        {/* Writeups Table */}
        <div
          className="bg-card border border-border rounded-xl overflow-hidden"
          data-ocid="dashboard.writeups_table"
        >
          <div className="px-4 py-3 border-b border-border flex items-center justify-between">
            <h2 className="font-display text-sm font-semibold text-foreground">
              Writeups
            </h2>
            <span className="font-mono text-xs text-muted-foreground">
              {total} total
            </span>
          </div>

          {writeupsLoading ? (
            <div className="p-4 space-y-2">
              {[1, 2, 3, 4, 5].map((i) => (
                <Skeleton key={i} className="h-12 rounded-md" />
              ))}
            </div>
          ) : sortedWriteups.length === 0 ? (
            <div
              className="py-16 text-center space-y-3"
              data-ocid="dashboard.writeups_table.empty_state"
            >
              <FileText className="w-10 h-10 text-muted-foreground/30 mx-auto" />
              <p className="font-mono text-sm text-muted-foreground">
                No writeups yet
              </p>
              <Button
                asChild
                size="sm"
                variant="outline"
                className="font-mono text-xs"
              >
                <Link to="/admin/writeup/new">
                  <Plus className="w-3.5 h-3.5 mr-1.5" />
                  Create first writeup
                </Link>
              </Button>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border bg-muted/20">
                    <th className="px-4 py-2 text-left font-mono text-xs text-muted-foreground uppercase tracking-widest">
                      Title
                    </th>
                    <th className="px-4 py-2 text-left font-mono text-xs text-muted-foreground uppercase tracking-widest hidden sm:table-cell">
                      Category
                    </th>
                    <th className="px-4 py-2 text-left font-mono text-xs text-muted-foreground uppercase tracking-widest hidden md:table-cell">
                      Difficulty
                    </th>
                    <th className="px-4 py-2 text-left font-mono text-xs text-muted-foreground uppercase tracking-widest">
                      Status
                    </th>
                    <th className="px-4 py-2 text-left font-mono text-xs text-muted-foreground uppercase tracking-widest hidden lg:table-cell">
                      Date
                    </th>
                    <th className="px-4 py-2 text-right font-mono text-xs text-muted-foreground uppercase tracking-widest">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {sortedWriteups.map((w, i) => (
                    <WriteupRow
                      key={w.id.toString()}
                      writeup={w}
                      index={i + 1}
                      onDelete={setDeleteTarget}
                    />
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>

      {/* Delete Confirmation Dialog */}
      <Dialog
        open={!!deleteTarget}
        onOpenChange={(open) => !open && setDeleteTarget(null)}
      >
        <DialogContent data-ocid="dashboard.delete_dialog">
          <DialogHeader>
            <DialogTitle className="font-display">Delete Writeup?</DialogTitle>
            <DialogDescription className="font-body">
              This will permanently delete{" "}
              <span className="font-semibold text-foreground">
                &ldquo;{deleteTarget?.title}&rdquo;
              </span>
              . This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setDeleteTarget(null)}
              disabled={deleteConfirming}
              className="font-mono text-xs"
              data-ocid="dashboard.delete_dialog.cancel_button"
            >
              Cancel
            </Button>
            <Button
              variant="destructive"
              onClick={handleDeleteConfirm}
              disabled={deleteConfirming}
              className="font-mono text-xs"
              data-ocid="dashboard.delete_dialog.confirm_button"
            >
              {deleteConfirming ? (
                <span className="flex items-center gap-2">
                  <span className="w-3.5 h-3.5 border-2 border-destructive-foreground/40 border-t-destructive-foreground rounded-full animate-spin" />
                  Deleting...
                </span>
              ) : (
                <span className="flex items-center gap-2">
                  <Trash2 className="w-3.5 h-3.5" />
                  Delete
                </span>
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </Layout>
  );
}
