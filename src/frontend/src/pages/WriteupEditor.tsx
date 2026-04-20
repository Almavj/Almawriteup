import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";
import { Switch } from "@/components/ui/switch";
import { useNavigate, useParams } from "@tanstack/react-router";
import {
  AlertTriangle,
  ChevronDown,
  ChevronUp,
  Code2,
  Eye,
  FileImage,
  GripVertical,
  Heading,
  List,
  Loader2,
  Pilcrow,
  Plus,
  Save,
  Trash2,
  X,
} from "lucide-react";
import {
  type DragEvent,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import { toast } from "sonner";
import { CodeBlock } from "../components/CodeBlock";
import { ContentRenderer } from "../components/ContentRenderer";
import { Layout } from "../components/Layout";
import { useAuth } from "../hooks/useAuth";
import {
  useCreateWriteup,
  useDeleteWriteup,
  useUpdateWriteup,
  useUploadImage,
  useUploadFile,
  useWriteupById,
} from "../hooks/useBackend";
import {
  CATEGORY_LABELS,
  type Category,
  DIFFICULTY_LABELS,
  type Difficulty,
  LANGUAGE_OPTIONS,
} from "../types";
import { api } from "../api";
import type { ContentBlock } from "../types";

interface ChallengeFileMeta {
  filename: string;
  original_name: string;
  url: string;
}

interface EditorMeta {
  title: string;
  slug: string;
  category: string;
  difficulty: string;
  dateSolved: string;
  tags: string[];
  flag: string;
  flagHidden: boolean;
  draft: boolean;
  challenge_url: string;
  challenge_files: ChallengeFileMeta[];
}

interface CodeModalState {
  open: boolean;
  language: string;
  code: string;
  lineNumbers: boolean;
}

function slugify(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

const AUTO_SAVE_INTERVAL = 30_000;

function BlockControls({
  onUp,
  onDown,
  onDelete,
  disableUp,
  disableDown,
  ocidPrefix,
}: {
  onUp: () => void;
  onDown: () => void;
  onDelete: () => void;
  disableUp: boolean;
  disableDown: boolean;
  ocidPrefix: string;
}) {
  return (
    <div className="flex flex-col gap-0.5 flex-shrink-0 opacity-0 group-hover:opacity-100 transition-opacity">
      <button
        type="button"
        onClick={onUp}
        disabled={disableUp}
        aria-label="Move block up"
        data-ocid={`${ocidPrefix}.move_up`}
        className="p-1 rounded text-muted-foreground hover:text-foreground hover:bg-muted/40 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
      >
        <ChevronUp className="w-3.5 h-3.5" />
      </button>
      <button
        type="button"
        onClick={onDown}
        disabled={disableDown}
        aria-label="Move block down"
        data-ocid={`${ocidPrefix}.move_down`}
        className="p-1 rounded text-muted-foreground hover:text-foreground hover:bg-muted/40 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
      >
        <ChevronDown className="w-3.5 h-3.5" />
      </button>
      <button
        type="button"
        onClick={onDelete}
        aria-label="Delete block"
        data-ocid={`${ocidPrefix}.delete_button`}
        className="p-1 rounded text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition-colors"
      >
        <X className="w-3.5 h-3.5" />
      </button>
    </div>
  );
}

function ParagraphBlockEditor({
  block,
  onChange,
}: {
  block: Extract<ContentBlock, { type: "paragraph" }>;
  onChange: (content: string) => void;
}) {
  return (
    <textarea
      value={block.content}
      onChange={(e) => onChange(e.target.value)}
      placeholder="Write your paragraph here... (supports basic HTML: <b>, <i>, <a href='...'>link</a>)"
      rows={4}
      className="w-full bg-background border border-input rounded-md px-3 py-2 text-sm font-body text-foreground placeholder:text-muted-foreground resize-y focus:outline-none focus:ring-1 focus:ring-ring min-h-[80px]"
      data-ocid="editor.paragraph_input"
    />
  );
}

function HeadingBlockEditor({
  block,
  onChange,
}: {
  block: Extract<ContentBlock, { type: "heading" }>;
  onChange: (updates: Partial<typeof block>) => void;
}) {
  return (
    <div className="flex items-center gap-2">
      <Select
        value={String(block.level)}
        onValueChange={(v) => onChange({ level: Number(v) as 2 | 3 })}
      >
        <SelectTrigger
          className="w-20 h-8 font-mono text-xs"
          data-ocid="editor.heading_level_select"
        >
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="2" className="font-mono text-xs">
            H2
          </SelectItem>
          <SelectItem value="3" className="font-mono text-xs">
            H3
          </SelectItem>
        </SelectContent>
      </Select>
      <Input
        value={block.content}
        onChange={(e) => onChange({ content: e.target.value })}
        placeholder="Section heading..."
        className={`flex-1 font-display font-semibold ${block.level === 2 ? "text-lg" : "text-base"}`}
        data-ocid="editor.heading_input"
      />
    </div>
  );
}

function ListBlockEditor({
  block,
  onChange,
}: {
  block: Extract<ContentBlock, { type: "list" }>;
  onChange: (updates: Partial<typeof block>) => void;
}) {
  const text = block.items.join("\n");
  return (
    <div className="space-y-2">
      <div className="flex items-center gap-2">
        <button
          type="button"
          onClick={() => onChange({ ordered: false })}
          className={`px-3 py-1 rounded font-mono text-xs border transition-colors ${!block.ordered ? "bg-primary text-primary-foreground border-primary" : "border-border text-muted-foreground hover:border-foreground"}`}
          data-ocid="editor.list_unordered_toggle"
        >
          Unordered
        </button>
        <button
          type="button"
          onClick={() => onChange({ ordered: true })}
          className={`px-3 py-1 rounded font-mono text-xs border transition-colors ${block.ordered ? "bg-primary text-primary-foreground border-primary" : "border-border text-muted-foreground hover:border-foreground"}`}
          data-ocid="editor.list_ordered_toggle"
        >
          Ordered
        </button>
      </div>
      <textarea
        value={text}
        onChange={(e) =>
          onChange({ items: e.target.value.split("\n").filter(Boolean) })
        }
        placeholder="One item per line..."
        rows={4}
        className="w-full bg-background border border-input rounded-md px-3 py-2 text-sm font-body text-foreground placeholder:text-muted-foreground resize-y focus:outline-none focus:ring-1 focus:ring-ring"
        data-ocid="editor.list_input"
      />
    </div>
  );
}

function ImageBlockEditorView({
  block,
  onChange,
}: {
  block: Extract<ContentBlock, { type: "image" }>;
  onChange: (caption: string) => void;
}) {
  return (
    <div className="space-y-2">
      <img
        src={block.url}
        alt={block.caption ?? "Uploaded image"}
        className="max-w-full rounded-md border border-border max-h-64 object-contain"
      />
      <Input
        value={block.caption ?? ""}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Image caption (optional)"
        className="text-sm"
        data-ocid="editor.image_caption_input"
      />
    </div>
  );
}

function CodeBlockModal({
  state,
  onStateChange,
  onInsert,
  onClose,
}: {
  state: CodeModalState;
  onStateChange: (s: Partial<CodeModalState>) => void;
  onInsert: () => void;
  onClose: () => void;
}) {
  return (
    <Dialog open={state.open} onOpenChange={(o) => !o && onClose()}>
      <DialogContent
        className="max-w-2xl max-h-[90vh] flex flex-col"
        data-ocid="editor.code_modal.dialog"
      >
        <DialogHeader>
          <DialogTitle className="font-display flex items-center gap-2">
            <Code2 className="w-4 h-4 text-primary" />
            Insert Code Block
          </DialogTitle>
        </DialogHeader>

        <div className="flex-1 overflow-y-auto space-y-4">
          <div className="flex items-center gap-4 flex-wrap">
            <div className="flex-1 min-w-[160px] space-y-1">
              <Label className="font-mono text-xs text-muted-foreground">
                Language
              </Label>
              <Select
                value={state.language}
                onValueChange={(v) => onStateChange({ language: v })}
              >
                <SelectTrigger
                  className="font-mono text-xs"
                  data-ocid="editor.code_modal.language_select"
                >
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {LANGUAGE_OPTIONS.map((lang) => (
                    <SelectItem
                      key={lang}
                      value={lang}
                      className="font-mono text-xs capitalize"
                    >
                      {lang}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="flex items-center gap-2 pt-5">
              <Checkbox
                id="lineNumbers"
                checked={state.lineNumbers}
                onCheckedChange={(v) =>
                  onStateChange({ lineNumbers: Boolean(v) })
                }
                data-ocid="editor.code_modal.line_numbers_checkbox"
              />
              <Label
                htmlFor="lineNumbers"
                className="font-mono text-xs text-muted-foreground cursor-pointer"
              >
                Line numbers
              </Label>
            </div>
          </div>

          <div className="space-y-1">
            <Label className="font-mono text-xs text-muted-foreground">
              Code
            </Label>
            <textarea
              value={state.code}
              onChange={(e) => onStateChange({ code: e.target.value })}
              placeholder="Paste your code here..."
              rows={18}
              spellCheck={false}
              className="w-full bg-[oklch(var(--code-bg))] border border-[oklch(var(--code-border))] rounded-md px-4 py-3 text-sm font-mono text-foreground placeholder:text-muted-foreground/50 resize-none focus:outline-none focus:ring-1 focus:ring-primary overflow-x-auto"
              style={{
                whiteSpace: "pre",
                overflowX: "auto",
                overflowWrap: "normal",
              }}
              data-ocid="editor.code_modal.code_textarea"
            />
          </div>

          {state.code.trim() && (
            <div className="space-y-1">
              <p className="font-mono text-xs text-muted-foreground">Preview</p>
              <CodeBlock
                code={state.code}
                language={state.language}
                lineNumbers={state.lineNumbers}
              />
            </div>
          )}
        </div>

        <DialogFooter className="pt-4 border-t border-border">
          <Button
            variant="outline"
            onClick={onClose}
            className="font-mono text-xs"
            data-ocid="editor.code_modal.cancel_button"
          >
            Cancel
          </Button>
          <Button
            onClick={onInsert}
            disabled={!state.code.trim()}
            className="font-mono text-xs"
            data-ocid="editor.code_modal.insert_button"
          >
            <Plus className="w-3.5 h-3.5 mr-1.5" />
            Insert Block
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

function PreviewModal({
  open,
  onClose,
  meta,
  blocks,
}: {
  open: boolean;
  onClose: () => void;
  meta: EditorMeta;
  blocks: ContentBlock[];
}) {
  const contentJson = JSON.stringify({ blocks });
  return (
    <Dialog open={open} onOpenChange={(o) => !o && onClose()}>
      <DialogContent
        className="max-w-3xl max-h-[90vh] flex flex-col"
        data-ocid="editor.preview_modal.dialog"
      >
        <DialogHeader>
          <DialogTitle className="font-display flex items-center gap-2">
            <Eye className="w-4 h-4 text-primary" />
            Preview
          </DialogTitle>
        </DialogHeader>
        <div className="flex-1 overflow-y-auto space-y-6 py-2">
          <div className="space-y-2">
            <h1 className="text-2xl font-display font-bold text-foreground">
              {meta.title || "Untitled"}
            </h1>
            <div className="flex items-center gap-2 flex-wrap">
              <span className="font-mono text-xs px-2 py-0.5 rounded bg-primary/10 text-primary">
                {CATEGORY_LABELS[meta.category]}
              </span>
              <span className="font-mono text-xs px-2 py-0.5 rounded bg-muted text-muted-foreground">
                {DIFFICULTY_LABELS[meta.difficulty]}
              </span>
              {meta.dateSolved && (
                <span className="font-mono text-xs text-muted-foreground">
                  {meta.dateSolved}
                </span>
              )}
            </div>
            {meta.tags.length > 0 && (
              <div className="flex items-center gap-1 flex-wrap">
                {meta.tags.map((t) => (
                  <Badge
                    key={t}
                    variant="secondary"
                    className="font-mono text-xs"
                  >
                    {t}
                  </Badge>
                ))}
              </div>
            )}
          </div>
          <ContentRenderer content={contentJson} />
          {meta.flag && (
            <div className="bg-card border border-border rounded-lg p-4">
              <p className="font-mono text-xs text-muted-foreground mb-2">
                FLAG
              </p>
              <p className="font-mono text-sm text-accent blur-sm hover:blur-none transition-all cursor-pointer select-none">
                {meta.flag}
              </p>
            </div>
          )}
        </div>
        <DialogFooter className="border-t border-border pt-4">
          <Button
            variant="outline"
            onClick={onClose}
            className="font-mono text-xs"
            data-ocid="editor.preview_modal.close_button"
          >
            Close
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

function ImageUploadZone({
  onUpload,
  uploading,
}: {
  onUpload: (file: File) => void;
  uploading: boolean;
}) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [dragging, setDragging] = useState(false);

  const handleDrop = (e: DragEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setDragging(false);
    const file = e.dataTransfer.files[0];
    if (file?.type.startsWith("image/")) onUpload(file);
  };

  return (
    <button
      type="button"
      onClick={() => inputRef.current?.click()}
      onDragOver={(e) => {
        e.preventDefault();
        setDragging(true);
      }}
      onDragLeave={() => setDragging(false)}
      onDrop={handleDrop}
      disabled={uploading}
      aria-label="Upload image"
      data-ocid="editor.image_dropzone"
      className={`border-2 border-dashed rounded-lg px-3 py-1.5 flex items-center gap-2 cursor-pointer transition-colors h-7 font-mono text-xs ${
        dragging
          ? "border-primary bg-primary/5 text-primary"
          : "border-border text-muted-foreground hover:border-primary/50 hover:bg-muted/20 hover:text-foreground"
      }`}
    >
      {uploading ? (
        <Loader2 className="w-3.5 h-3.5 animate-spin" />
      ) : (
        <FileImage className="w-3.5 h-3.5" />
      )}
      <span>{uploading ? "Uploading..." : "Image"}</span>
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={(e) => {
          const file = e.target.files?.[0];
          if (file) onUpload(file);
          e.target.value = "";
        }}
        data-ocid="editor.image_upload_input"
      />
    </button>
  );
}

function FileUploadZone({
  onUpload,
  uploading,
}: {
  onUpload: (file: File) => void;
  uploading: boolean;
}) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [dragging, setDragging] = useState(false);

  const handleDrop = (e: DragEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setDragging(false);
    const file = e.dataTransfer.files[0];
    if (file) onUpload(file);
  };

  return (
    <button
      type="button"
      onClick={() => inputRef.current?.click()}
      onDragOver={(e) => {
        e.preventDefault();
        setDragging(true);
      }}
      onDragLeave={() => setDragging(false)}
      onDrop={handleDrop}
      disabled={uploading}
      aria-label="Upload file"
      data-ocid="editor.file_dropzone"
      className={`border-2 border-dashed rounded-lg px-3 py-1.5 flex items-center gap-2 cursor-pointer transition-colors h-7 font-mono text-xs ${
        dragging
          ? "border-primary bg-primary/5 text-primary"
          : "border-border text-muted-foreground hover:border-primary/50 hover:bg-muted/20 hover:text-foreground"
      }`}
    >
      {uploading ? (
        <Loader2 className="w-3.5 h-3.5 animate-spin" />
      ) : (
        <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4" />
        </svg>
      )}
      <span>{uploading ? "Uploading..." : "File"}</span>
      <input
        ref={inputRef}
        type="file"
        className="hidden"
        onChange={(e) => {
          const file = e.target.files?.[0];
          if (file) onUpload(file);
          e.target.value = "";
        }}
        data-ocid="editor.file_upload_input"
      />
    </button>
  );
}

const DEFAULT_META: EditorMeta = {
  title: "",
  slug: "",
  category: "web",
  difficulty: "medium",
  dateSolved: new Date().toISOString().slice(0, 10),
  tags: [],
  flag: "",
  flagHidden: true,
  draft: true,
  challenge_url: "",
  challenge_files: [],
};

function WriteupEditorInner({
  id,
  mode,
}: {
  id: number | null;
  mode: "new" | "edit";
}) {
  const navigate = useNavigate();
  const { isAuthenticated, isInitializing } = useAuth();
  const { data: existingWriteup, isLoading: loadingWriteup } =
    useWriteupById(id);
  const createWriteup = useCreateWriteup();
  const updateWriteup = useUpdateWriteup();
  const deleteWriteup = useDeleteWriteup();
  const uploadImage = useUploadImage();
  const uploadFile = useUploadFile();

  const draftKey =
    mode === "new" ? "ctf-writeup-new" : `ctf-writeup-draft-${id}`;

  const [meta, setMeta] = useState<EditorMeta>(DEFAULT_META);
  const [blocks, setBlocks] = useState<ContentBlock[]>([]);
  const [tagInput, setTagInput] = useState("");
  const [slugManuallyEdited, setSlugManuallyEdited] = useState(false);
  const [showDraftBanner, setShowDraftBanner] = useState(false);
  const [imageUploading, setImageUploading] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [showPreview, setShowPreview] = useState(false);
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [codeModal, setCodeModal] = useState<CodeModalState>({
    open: false,
    language: "python",
    code: "",
    lineNumbers: true,
  });

  useEffect(() => {
    if (mode === "edit" && existingWriteup) {
      setMeta({
        title: existingWriteup.title,
        slug: existingWriteup.slug,
        category: existingWriteup.category,
        difficulty: existingWriteup.difficulty,
        dateSolved: existingWriteup.date_solved,
        tags: existingWriteup.tags,
        flag: existingWriteup.flag,
        flagHidden: existingWriteup.flag_hidden,
        draft: existingWriteup.draft,
        challenge_url: (existingWriteup as any).challenge_url || "",
        challenge_files: (existingWriteup as any).challenge_files || [],
      });
      setSlugManuallyEdited(true);
      try {
        const parsed = JSON.parse(existingWriteup.content) as {
          blocks: ContentBlock[];
        };
        if (Array.isArray(parsed.blocks)) setBlocks(parsed.blocks);
      } catch {
        setBlocks([{ type: "paragraph", content: existingWriteup.content }]);
      }
    }
  }, [mode, existingWriteup]);

  useEffect(() => {
    const saved = localStorage.getItem(draftKey);
    if (saved && mode === "new") {
      setShowDraftBanner(true);
    }
  }, [draftKey, mode]);

  useEffect(() => {
    const timer = setInterval(() => {
      const state = { meta, blocks };
      localStorage.setItem(draftKey, JSON.stringify(state));
    }, AUTO_SAVE_INTERVAL);
    return () => clearInterval(timer);
  }, [meta, blocks, draftKey]);

  useEffect(() => {
    if (!isInitializing && !isAuthenticated) {
      navigate({ to: "/admin/login" });
    }
  }, [isAuthenticated, isInitializing, navigate]);

  const updateMeta = (updates: Partial<EditorMeta>) => {
    setMeta((prev) => {
      const next = { ...prev, ...updates };
      if (updates.title !== undefined && !slugManuallyEdited) {
        next.slug = slugify(updates.title);
      }
      return next;
    });
  };

  const restoreDraft = () => {
    const saved = localStorage.getItem(draftKey);
    if (!saved) return;
    try {
      const { meta: savedMeta, blocks: savedBlocks } = JSON.parse(saved) as {
        meta: EditorMeta;
        blocks: ContentBlock[];
      };
      setMeta(savedMeta);
      setBlocks(savedBlocks);
      toast.success("Draft restored");
    } catch {
      toast.error("Failed to restore draft");
    }
    setShowDraftBanner(false);
  };

  const moveBlock = (index: number, dir: "up" | "down") => {
    setBlocks((prev) => {
      const next = [...prev];
      const swapIdx = dir === "up" ? index - 1 : index + 1;
      [next[index], next[swapIdx]] = [next[swapIdx], next[index]];
      return next;
    });
  };

  const deleteBlock = (index: number) => {
    setBlocks((prev) => prev.filter((_, i) => i !== index));
  };

  const updateBlock = (index: number, updates: Partial<ContentBlock>) => {
    setBlocks((prev) =>
      prev.map((b, i) =>
        i === index ? ({ ...b, ...updates } as ContentBlock) : b,
      ),
    );
  };

  const addBlock = (block: ContentBlock) => {
    setBlocks((prev) => [...prev, block]);
  };

  const handleImageUpload = async (file: File) => {
    setImageUploading(true);
    try {
      const url = await uploadImage.mutateAsync(file);
      addBlock({ type: "image", url, caption: "" });
      toast.success("Image uploaded");
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Upload failed");
    } finally {
      setImageUploading(false);
    }
  };

  const handleFileUpload = async (file: File) => {
    setImageUploading(true);
    try {
      const result = await uploadFile.mutateAsync(file);
      addBlock({ 
        type: "file", 
        url: result.url, 
        filename: file.name,
        description: "" 
      });
      toast.success("File uploaded");
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Upload failed");
    } finally {
      setImageUploading(false);
    }
  };

  const insertCodeBlock = () => {
    addBlock({
      type: "code",
      language: codeModal.language,
      code: codeModal.code,
      lineNumbers: codeModal.lineNumbers,
    });
    setCodeModal({
      open: false,
      language: "python",
      code: "",
      lineNumbers: true,
    });
  };

  const handleSave = async () => {
    console.log("[handleSave] Called, mode:", mode, "id:", id, "meta:", meta);
    if (!meta.title.trim()) {
      console.log("[handleSave] Title empty, showing error");
      toast.error("Title is required");
      return;
    }
    setSaving(true);
    console.log("[handleSave] Saving flag set to true");
    const input = {
      title: meta.title,
      slug: meta.slug || slugify(meta.title),
      category: meta.category as Category,
      difficulty: meta.difficulty as Difficulty,
      date_solved: meta.dateSolved,
      tags: meta.tags,
      flag: meta.flag,
      flag_hidden: meta.flagHidden,
      draft: meta.draft,
      challenge_url: meta.challenge_url,
      challenge_files: meta.challenge_files,
      content: JSON.stringify({ blocks }),
    };
    console.log("[handleSave] Input prepared:", input);
    console.log("[handleSave] Draft status:", meta.draft);

    try {
      if (mode === "new") {
        console.log("[handleSave] Creating new writeup...");
        const result = await createWriteup.mutateAsync(input);
        console.log("[handleSave] Create result:", result);
        localStorage.removeItem(draftKey);
        toast.success("Writeup created!");
        navigate({ to: "/admin/dashboard" });
      } else if (id !== null) {
        console.log("[handleSave] Updating writeup id:", id);
        const result = await updateWriteup.mutateAsync({ id, input });
        console.log("[handleSave] Update result:", result);
        localStorage.removeItem(draftKey);
        toast.success("Writeup saved!");
      }
    } catch (err) {
      console.error("[handleSave] Error:", err);
      toast.error(err instanceof Error ? err.message : "Save failed");
    } finally {
      console.log("[handleSave] Finally block, setting saving to false");
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    if (id === null) return;
    setDeleting(true);
    try {
      await deleteWriteup.mutateAsync(id);
      localStorage.removeItem(draftKey);
      toast.success("Writeup deleted");
      navigate({ to: "/admin/dashboard" });
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Delete failed");
    } finally {
      setDeleting(false);
      setShowDeleteConfirm(false);
    }
  };

  if (isInitializing || (mode === "edit" && loadingWriteup)) {
    return (
      <Layout>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8 space-y-4">
          <Skeleton className="h-8 w-64" />
          <Skeleton className="h-12 rounded-lg" />
          <Skeleton className="h-12 rounded-lg" />
          <Skeleton className="h-48 rounded-lg" />
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div
        className="max-w-4xl mx-auto px-4 sm:px-6 py-8 space-y-8"
        data-ocid="writeup_editor.page"
      >
        {showDraftBanner && (
          <div
            className="flex items-center justify-between gap-4 bg-card border border-primary/30 rounded-lg px-4 py-3"
            data-ocid="editor.draft_banner"
          >
            <div className="flex items-center gap-2 text-sm font-body">
              <AlertTriangle className="w-4 h-4 text-primary flex-shrink-0" />
              <span className="text-foreground">
                A saved draft was found. Restore it?
              </span>
            </div>
            <div className="flex gap-2">
              <Button
                size="sm"
                variant="outline"
                className="font-mono text-xs h-7"
                onClick={restoreDraft}
                data-ocid="editor.draft_banner.restore_button"
              >
                Restore
              </Button>
              <Button
                size="sm"
                variant="ghost"
                className="font-mono text-xs h-7 text-muted-foreground"
                onClick={() => setShowDraftBanner(false)}
                data-ocid="editor.draft_banner.dismiss_button"
              >
                Dismiss
              </Button>
            </div>
          </div>
        )}

        <div className="flex items-center justify-between gap-4">
          <h1 className="text-xl font-display font-semibold text-foreground">
            {mode === "new" ? "New Writeup" : "Edit Writeup"}
          </h1>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setShowPreview(true)}
              className="font-mono text-xs"
              data-ocid="editor.preview_button"
            >
              <Eye className="w-3.5 h-3.5 mr-1.5" />
              Preview
            </Button>
            {mode === "edit" && (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowDeleteConfirm(true)}
                className="font-mono text-xs text-destructive hover:text-destructive hover:bg-destructive/10"
                data-ocid="editor.delete_button"
              >
                <Trash2 className="w-3.5 h-3.5 mr-1.5" />
                Delete
              </Button>
            )}
            <Button
              type="button"
              size="sm"
              onClick={() => {
                console.log("[Save] Button clicked, saving:", saving);
                handleSave();
              }}
              disabled={saving}
              className="font-mono text-xs"
              data-ocid="editor.save_button"
            >
              {saving ? (
                <span className="flex items-center gap-1.5">
                  <Loader2 className="w-3.5 h-3.5 animate-spin" />
                  Saving...
                </span>
              ) : (
                <span className="flex items-center gap-1.5">
                  <Save className="w-3.5 h-3.5" />
                  Save
                </span>
              )}
            </Button>
            <Button
              type="button"
              size="sm"
              variant="secondary"
              onClick={async () => {
                if (!meta.title.trim()) {
                  toast.error("Title is required");
                  return;
                }
                setSaving(true);
                const input = {
                  title: meta.title,
                  slug: meta.slug || slugify(meta.title),
                  category: meta.category as Category,
                  difficulty: meta.difficulty as Difficulty,
                  date_solved: meta.dateSolved,
                  tags: meta.tags,
                  flag: meta.flag,
                  flag_hidden: meta.flagHidden,
                  draft: false,
                  challenge_url: meta.challenge_url,
                  challenge_files: meta.challenge_files,
                  content: JSON.stringify({ blocks }),
                };
                try {
                  if (mode === "new") {
                    await createWriteup.mutateAsync(input);
                    localStorage.removeItem(draftKey);
                    toast.success("Writeup published!");
                    navigate({ to: "/admin/dashboard" });
                  } else if (id !== null) {
                    await updateWriteup.mutateAsync({ id, input });
                    localStorage.removeItem(draftKey);
                    toast.success("Writeup published!");
                  }
                } catch (err) {
                  toast.error(err instanceof Error ? err.message : "Publish failed");
                } finally {
                  setSaving(false);
                }
              }}
              disabled={saving}
              className="font-mono text-xs"
              data-ocid="editor.publish_button"
            >
              {saving ? (
                <Loader2 className="w-3.5 h-3.5 animate-spin" />
              ) : (
                <span className="flex items-center gap-1.5">
                  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4" />
                  </svg>
                  Publish
                </span>
              )}
            </Button>
          </div>
        </div>

        <div
          className="bg-card border border-border rounded-xl p-6 space-y-5"
          data-ocid="editor.metadata_section"
        >
          <h2 className="font-display text-sm font-semibold text-foreground border-b border-border pb-2">
            Metadata
          </h2>

          <div className="space-y-2">
            <Label
              htmlFor="title"
              className="font-mono text-xs text-muted-foreground"
            >
              Title *
            </Label>
            <Input
              id="title"
              value={meta.title}
              onChange={(e) => updateMeta({ title: e.target.value })}
              placeholder="Buffer Overflow in CTF Service..."
              className="font-display text-lg font-semibold"
              data-ocid="editor.title_input"
            />
            <div className="flex items-center gap-2">
              <span className="font-mono text-xs text-muted-foreground flex-shrink-0">
                /writeup/
              </span>
              <Input
                value={meta.slug}
                onChange={(e) => {
                  setSlugManuallyEdited(true);
                  updateMeta({ slug: e.target.value });
                }}
                placeholder="buffer-overflow-ctf"
                className="font-mono text-xs h-7"
                data-ocid="editor.slug_input"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <Label className="font-mono text-xs text-muted-foreground">
                Category
              </Label>
              <Select
                value={meta.category}
                onValueChange={(v) => updateMeta({ category: v })}
              >
                <SelectTrigger
                  className="font-mono text-xs"
                  data-ocid="editor.category_select"
                >
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {Object.entries(CATEGORY_LABELS).map(([k, v]) => (
                    <SelectItem key={k} value={k} className="font-mono text-xs">
                      {v}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-1.5">
              <Label className="font-mono text-xs text-muted-foreground">
                Difficulty
              </Label>
              <Select
                value={meta.difficulty}
                onValueChange={(v) => updateMeta({ difficulty: v })}
              >
                <SelectTrigger
                  className="font-mono text-xs"
                  data-ocid="editor.difficulty_select"
                >
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {Object.entries(DIFFICULTY_LABELS).map(([k, v]) => (
                    <SelectItem
                      key={k}
                      value={k}
                      className="font-mono text-xs capitalize"
                    >
                      {v}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 items-start">
            <div className="space-y-1.5">
              <Label
                htmlFor="dateSolved"
                className="font-mono text-xs text-muted-foreground"
              >
                Date Solved
              </Label>
              <Input
                id="dateSolved"
                type="date"
                value={meta.dateSolved}
                onChange={(e) => updateMeta({ dateSolved: e.target.value })}
                className="font-mono text-xs"
                data-ocid="editor.date_input"
              />
            </div>
            <div className="space-y-1.5 pt-1">
              <Label className="font-mono text-xs text-muted-foreground">
                Status
              </Label>
              <div className="flex items-center gap-2 pt-1.5">
                <Switch
                  checked={!meta.draft}
                  onCheckedChange={(v) => updateMeta({ draft: !v })}
                  data-ocid="editor.published_toggle"
                />
                <span className="font-mono text-xs text-foreground">
                  {meta.draft ? "Draft" : "Published"}
                </span>
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <Label
              htmlFor="challengeUrl"
              className="font-mono text-xs text-muted-foreground"
            >
              Challenge URL (for web challenges)
            </Label>
            <Input
              id="challengeUrl"
              type="url"
              value={meta.challenge_url}
              onChange={(e) => updateMeta({ challenge_url: e.target.value })}
              placeholder="https://challenge.example.com:8080"
              className="font-mono text-xs"
              data-ocid="editor.challenge_url_input"
            />
          </div>

          <div className="space-y-2">
            <Label className="font-mono text-xs text-muted-foreground">
              Challenge Files
            </Label>
            <div className="border border-dashed border-border rounded-lg p-4">
              <input
                type="file"
                id="challengeFileUpload"
                multiple
                className="hidden"
                onChange={async (e) => {
                  const files = e.target.files;
                  if (!files) return;
                  for (const file of files) {
                    try {
                      const result = await api.uploadChallengeFile(
                        id || 0,
                        file
                      );
                      updateMeta({
                        challenge_files: [
                          ...meta.challenge_files,
                          {
                            filename: result.filename,
                            original_name: result.original_name,
                            url: result.url,
                          },
                        ],
                      });
                      toast.success(`Uploaded: ${file.name}`);
                    } catch (err) {
                      toast.error(`Failed to upload: ${file.name}`);
                    }
                  }
                  e.target.value = "";
                }}
              />
              <label
                htmlFor="challengeFileUpload"
                className="flex flex-col items-center justify-center cursor-pointer py-4"
              >
                <FileImage className="h-8 w-8 text-muted-foreground mb-2" />
                <span className="text-xs text-muted-foreground">
                  Click to upload challenge files
                </span>
                <span className="text-xs text-muted-foreground mt-1">
                  (zip, binary, source code, etc.)
                </span>
              </label>
            </div>
            {meta.challenge_files.length > 0 && (
              <div className="space-y-2 mt-2">
                {meta.challenge_files.map((file, idx) => (
                  <div
                    key={idx}
                    className="flex items-center justify-between bg-muted/30 rounded px-3 py-2"
                  >
                    <a
                      href={file.url}
                      download={file.original_name}
                      className="text-xs text-primary hover:underline truncate flex-1"
                    >
                      {file.original_name}
                    </a>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => {
                        updateMeta({
                          challenge_files: meta.challenge_files.filter(
                            (_, i) => i !== idx
                          ),
                        });
                      }}
                    >
                      <X className="h-3 w-3" />
                    </Button>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="space-y-2">
            <Label className="font-mono text-xs text-muted-foreground">
              Tags
            </Label>
            <div className="flex gap-2">
              <Input
                value={tagInput}
                onChange={(e) => setTagInput(e.target.value)}
                onKeyDown={(e) => {
                  if ((e.key === "Enter" || e.key === ",") && tagInput.trim()) {
                    e.preventDefault();
                    const tag = tagInput.trim().replace(/,$/, "");
                    if (tag && !meta.tags.includes(tag)) {
                      updateMeta({ tags: [...meta.tags, tag] });
                    }
                    setTagInput("");
                  }
                }}
                placeholder="pwn, buffer-overflow, rop..."
                className="font-mono text-xs flex-1"
                data-ocid="editor.tags_input"
              />
              <Button
                type="button"
                variant="outline"
                size="sm"
                className="font-mono text-xs"
                onClick={() => {
                  const tags = tagInput
                    .split(",")
                    .map((t) => t.trim())
                    .filter(Boolean);
                  const newTags = tags.filter((t) => !meta.tags.includes(t));
                  if (newTags.length)
                    updateMeta({ tags: [...meta.tags, ...newTags] });
                  setTagInput("");
                }}
                data-ocid="editor.tags_add_button"
              >
                Add
              </Button>
            </div>
            {meta.tags.length > 0 && (
              <div
                className="flex flex-wrap gap-1.5"
                data-ocid="editor.tags_list"
              >
                {meta.tags.map((tag) => (
                  <Badge
                    key={tag}
                    variant="secondary"
                    className="font-mono text-xs flex items-center gap-1 pr-1"
                  >
                    {tag}
                    <button
                      type="button"
                      onClick={() =>
                        updateMeta({ tags: meta.tags.filter((t) => t !== tag) })
                      }
                      className="hover:text-destructive transition-colors ml-0.5"
                      aria-label={`Remove tag ${tag}`}
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </Badge>
                ))}
              </div>
            )}
          </div>

          <div className="space-y-2">
            <Label
              htmlFor="flag"
              className="font-mono text-xs text-muted-foreground"
            >
              Flag
            </Label>
            <Input
              id="flag"
              value={meta.flag}
              onChange={(e) => updateMeta({ flag: e.target.value })}
              placeholder="CTF{example_flag_here}"
              className="font-mono text-sm"
              data-ocid="editor.flag_input"
            />
            <div className="flex items-center gap-2">
              <Checkbox
                id="flagHidden"
                checked={meta.flagHidden}
                onCheckedChange={(v) => updateMeta({ flagHidden: Boolean(v) })}
                data-ocid="editor.flag_hidden_checkbox"
              />
              <Label
                htmlFor="flagHidden"
                className="font-mono text-xs text-muted-foreground cursor-pointer"
              >
                Hide flag until clicked (default)
              </Label>
            </div>
          </div>
        </div>

        <div className="space-y-4" data-ocid="editor.blocks_section">
          <div className="flex items-center gap-1.5 flex-wrap bg-card border border-border rounded-lg px-3 py-2">
            <span className="font-mono text-xs text-muted-foreground mr-2">
              Add:
            </span>
            <Button
              variant="ghost"
              size="sm"
              className="h-7 px-2 font-mono text-xs"
              onClick={() => addBlock({ type: "paragraph", content: "" })}
              data-ocid="editor.add_paragraph_button"
            >
              <Pilcrow className="w-3.5 h-3.5 mr-1" />
              Paragraph
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className="h-7 px-2 font-mono text-xs"
              onClick={() =>
                addBlock({
                  type: "heading",
                  level: 2,
                  content: "",
                  id: `h-${Date.now()}`,
                })
              }
              data-ocid="editor.add_heading_button"
            >
              <Heading className="w-3.5 h-3.5 mr-1" />
              Heading
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className="h-7 px-2 font-mono text-xs"
              onClick={() =>
                addBlock({ type: "list", ordered: false, items: [] })
              }
              data-ocid="editor.add_list_button"
            >
              <List className="w-3.5 h-3.5 mr-1" />
              List
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className="h-7 px-2 font-mono text-xs"
              onClick={() => setCodeModal((s) => ({ ...s, open: true }))}
              data-ocid="editor.add_code_button"
            >
              <Code2 className="w-3.5 h-3.5 mr-1" />
              Code Block
            </Button>
            <ImageUploadZone
              onUpload={handleImageUpload}
              uploading={imageUploading}
            />
            <FileUploadZone
              onUpload={handleFileUpload}
              uploading={imageUploading}
            />
          </div>

          {blocks.length === 0 ? (
            <div
              className="border-2 border-dashed border-border rounded-xl py-12 text-center space-y-2"
              data-ocid="editor.blocks_empty_state"
            >
              <GripVertical className="w-8 h-8 text-muted-foreground/30 mx-auto" />
              <p className="font-mono text-sm text-muted-foreground">
                No content blocks yet. Use the toolbar above to add content.
              </p>
            </div>
          ) : (
            <div className="space-y-3">
              {blocks.map((block, index) => (
                <div
                  key={`block-${index}`}
                  className="group flex gap-2 items-start"
                  data-ocid={`editor.block.item.${index + 1}`}
                >
                  <div className="flex-1 min-w-0 bg-card border border-border rounded-lg p-3">
                    <div className="flex items-center gap-1.5 mb-2">
                      <span className="font-mono text-[10px] text-muted-foreground/50 uppercase tracking-widest px-1.5 py-0.5 rounded bg-muted/40">
                        {block.type}
                      </span>
                    </div>

                    {block.type === "paragraph" && (
                      <ParagraphBlockEditor
                        block={block}
                        onChange={(content) => updateBlock(index, { content })}
                      />
                    )}

                    {block.type === "heading" && (
                      <HeadingBlockEditor
                        block={block}
                        onChange={(updates) => updateBlock(index, updates)}
                      />
                    )}

                    {block.type === "list" && (
                      <ListBlockEditor
                        block={block}
                        onChange={(updates) => updateBlock(index, updates)}
                      />
                    )}

                    {block.type === "code" && (
                      <div className="space-y-2">
                        <CodeBlock
                          code={block.code}
                          language={block.language}
                          lineNumbers={block.lineNumbers ?? true}
                        />
                        <Button
                          variant="outline"
                          size="sm"
                          className="font-mono text-xs h-7"
                          onClick={() =>
                            setCodeModal({
                              open: true,
                              language: block.language,
                              code: block.code,
                              lineNumbers: block.lineNumbers ?? true,
                            })
                          }
                          data-ocid={`editor.block.edit_code_button.${index + 1}`}
                        >
                          Edit Code
                        </Button>
                      </div>
                    )}

                    {block.type === "image" && (
                      <ImageBlockEditorView
                        block={block}
                        onChange={(caption) => updateBlock(index, { caption })}
                      />
                    )}

                    {block.type === "divider" && (
                      <hr className="border-border" />
                    )}
                  </div>

                  <BlockControls
                    onUp={() => moveBlock(index, "up")}
                    onDown={() => moveBlock(index, "down")}
                    onDelete={() => deleteBlock(index)}
                    disableUp={index === 0}
                    disableDown={index === blocks.length - 1}
                    ocidPrefix={`editor.block_controls.${index + 1}`}
                  />
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      <CodeBlockModal
        state={codeModal}
        onStateChange={(s) => setCodeModal((prev) => ({ ...prev, ...s }))}
        onInsert={insertCodeBlock}
        onClose={() =>
          setCodeModal({
            open: false,
            language: "python",
            code: "",
            lineNumbers: true,
          })
        }
      />

      <PreviewModal
        open={showPreview}
        onClose={() => setShowPreview(false)}
        meta={meta}
        blocks={blocks}
      />

      <Dialog
        open={showDeleteConfirm}
        onOpenChange={(open) => !open && setShowDeleteConfirm(false)}
      >
        <DialogContent data-ocid="editor.delete_dialog">
          <DialogHeader>
            <DialogTitle className="font-display">
              Delete this writeup?
            </DialogTitle>
          </DialogHeader>
          <p className="text-sm font-body text-muted-foreground">
            This will permanently delete &ldquo;{meta.title}&rdquo;. This action
            cannot be undone.
          </p>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setShowDeleteConfirm(false)}
              disabled={deleting}
              className="font-mono text-xs"
              data-ocid="editor.delete_dialog.cancel_button"
            >
              Cancel
            </Button>
            <Button
              variant="destructive"
              onClick={handleDelete}
              disabled={deleting}
              className="font-mono text-xs"
              data-ocid="editor.delete_dialog.confirm_button"
            >
              {deleting ? (
                <span className="flex items-center gap-2">
                  <Loader2 className="w-3.5 h-3.5 animate-spin" />
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

export function NewWriteupPage() {
  return <WriteupEditorInner id={null} mode="new" />;
}

export function EditWriteupPage() {
  const { id } = useParams({ from: "/admin/writeup/$id" });
  const numId = id ? Number.parseInt(id, 10) : null;
  return <WriteupEditorInner id={numId} mode="edit" />;
}
