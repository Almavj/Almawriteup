export { Category, Difficulty } from "./api";

export type {
  Writeup,
  WriteupInput,
  PagedWriteups,
  ImageRecord,
} from "./api";

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

export interface FileBlockData {
  type: "file";
  url: string;
  filename: string;
  description?: string;
}

export interface LinkBlockData {
  type: "link";
  url: string;
  label: string;
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
  | FileBlockData
  | LinkBlockData
  | DividerBlock
  | NoteBlock;

export interface WriteupContent {
  blocks: ContentBlock[];
}

export const CATEGORY_LABELS: Record<string, string> = {
  pwn: "pwn",
  web: "web",
  crypto: "crypto",
  forensics: "forensics",
  rev: "rev",
  misc: "misc",
  osint: "osint",
};

export const CATEGORY_COLORS: Record<string, string> = {
  pwn: "category-pwn",
  web: "category-web",
  crypto: "category-crypto",
  forensics: "category-forensics",
  rev: "category-rev",
  misc: "category-misc",
  osint: "category-osint",
};

export const DIFFICULTY_LABELS: Record<string, string> = {
  easy: "easy",
  medium: "medium",
  hard: "hard",
  insane: "insane",
};

export const DIFFICULTY_COLORS: Record<string, string> = {
  easy: "difficulty-easy",
  medium: "difficulty-medium",
  hard: "difficulty-hard",
  insane: "difficulty-insane",
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
