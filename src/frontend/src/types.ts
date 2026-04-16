import { Category, Difficulty } from "./backend";

export { Category, Difficulty };

// Re-export backend types for convenience
export type {
  Writeup,
  WriteupInput,
  PagedWriteups,
  ImageRecord,
} from "./backend";

// Content block types for JSON-based writeup content
export interface ParagraphBlock {
  type: "paragraph";
  content: string;
}

export interface HeadingBlock {
  type: "heading";
  level: 2 | 3;
  content: string;
  id?: string;
}

export interface ListBlock {
  type: "list";
  ordered: boolean;
  items: string[];
}

export interface CodeBlockData {
  type: "code";
  language: string;
  code: string;
  lineNumbers?: boolean;
  filename?: string;
}

export interface ImageBlockData {
  type: "image";
  url: string;
  caption?: string;
  alt?: string;
}

export interface DividerBlock {
  type: "divider";
}

export interface NoteBlock {
  type: "note";
  variant: "info" | "warning" | "success" | "danger";
  content: string;
}

export type ContentBlock =
  | ParagraphBlock
  | HeadingBlock
  | ListBlock
  | CodeBlockData
  | ImageBlockData
  | DividerBlock
  | NoteBlock;

export interface WriteupContent {
  blocks: ContentBlock[];
}

// Category metadata
export const CATEGORY_LABELS: Record<Category, string> = {
  [Category.pwn]: "pwn",
  [Category.web]: "web",
  [Category.crypto]: "crypto",
  [Category.forensics]: "forensics",
  [Category.rev]: "rev",
  [Category.misc]: "misc",
  [Category.osint]: "osint",
};

export const CATEGORY_COLORS: Record<Category, string> = {
  [Category.pwn]: "category-pwn",
  [Category.web]: "category-web",
  [Category.crypto]: "category-crypto",
  [Category.forensics]: "category-forensics",
  [Category.rev]: "category-rev",
  [Category.misc]: "category-misc",
  [Category.osint]: "category-osint",
};

export const DIFFICULTY_LABELS: Record<Difficulty, string> = {
  [Difficulty.easy]: "easy",
  [Difficulty.medium]: "medium",
  [Difficulty.hard]: "hard",
  [Difficulty.insane]: "insane",
};

export const DIFFICULTY_COLORS: Record<Difficulty, string> = {
  [Difficulty.easy]: "difficulty-easy",
  [Difficulty.medium]: "difficulty-medium",
  [Difficulty.hard]: "difficulty-hard",
  [Difficulty.insane]: "difficulty-insane",
};

export const LANGUAGE_OPTIONS = [
  "python",
  "bash",
  "javascript",
  "typescript",
  "c",
  "cpp",
  "java",
  "ruby",
  "php",
  "sql",
  "json",
  "yaml",
  "html",
  "css",
  "go",
  "rust",
  "asm",
  "plaintext",
] as const;

export type Language = (typeof LANGUAGE_OPTIONS)[number];
