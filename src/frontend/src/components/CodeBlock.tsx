import Prism from "prismjs";
import { useEffect, useRef, useState } from "react";
import "prismjs/components/prism-python";
import "prismjs/components/prism-bash";
import "prismjs/components/prism-javascript";
import "prismjs/components/prism-typescript";
import "prismjs/components/prism-c";
import "prismjs/components/prism-cpp";
import "prismjs/components/prism-java";
import "prismjs/components/prism-ruby";
import "prismjs/components/prism-php";
import "prismjs/components/prism-sql";
import "prismjs/components/prism-json";
import "prismjs/components/prism-yaml";
import "prismjs/components/prism-markup";
import "prismjs/components/prism-css";
import "prismjs/components/prism-go";
import "prismjs/components/prism-rust";
import "prismjs/components/prism-asm6502";
import { cn } from "@/lib/utils";
import { Check, ChevronDown, ChevronUp, Copy, Terminal } from "lucide-react";

const COLLAPSE_THRESHOLD = 30;

const LANG_MAP: Record<string, string> = {
  python: "python",
  bash: "bash",
  sh: "bash",
  shell: "bash",
  javascript: "javascript",
  js: "javascript",
  typescript: "typescript",
  ts: "typescript",
  c: "c",
  cpp: "cpp",
  "c++": "cpp",
  java: "java",
  ruby: "ruby",
  rb: "ruby",
  php: "php",
  sql: "sql",
  json: "json",
  yaml: "yaml",
  yml: "yaml",
  html: "markup",
  css: "css",
  go: "go",
  rust: "rust",
  rs: "rust",
  asm: "asm6502",
  assembly: "asm6502",
};

interface CodeBlockProps {
  code: string;
  language?: string;
  lineNumbers?: boolean;
  filename?: string;
  className?: string;
}

export function CodeBlock({
  code,
  language = "plaintext",
  lineNumbers = true,
  filename,
  className,
}: CodeBlockProps) {
  const [copied, setCopied] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const codeRef = useRef<HTMLElement>(null);

  const prismLang = LANG_MAP[language.toLowerCase()] ?? "plaintext";
  const lines = code.split("\n");
  const totalLines = lines.length;
  const isCollapsible = totalLines > COLLAPSE_THRESHOLD;
  const displayedCode =
    isCollapsible && !expanded
      ? lines.slice(0, COLLAPSE_THRESHOLD).join("\n")
      : code;

  useEffect(() => {
    if (codeRef.current) {
      // Set content manually to avoid Prism encoding issues
      codeRef.current.textContent = displayedCode;
      Prism.highlightElement(codeRef.current);
    }
  }, [displayedCode]);

  const handleCopy = () => {
    navigator.clipboard.writeText(code).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  const lineCount =
    isCollapsible && !expanded ? COLLAPSE_THRESHOLD : totalLines;

  return (
    <div
      className={cn(
        "rounded-lg border border-[oklch(var(--code-border))] bg-[oklch(var(--code-bg))] code-glow overflow-hidden",
        className,
      )}
      data-ocid="code_block"
    >
      {/* Header bar */}
      <div className="flex items-center justify-between px-4 py-2 border-b border-[oklch(var(--code-border))] bg-[oklch(0.1_0_0)]">
        <div className="flex items-center gap-2">
          <Terminal className="w-3.5 h-3.5 text-muted-foreground" />
          {filename ? (
            <span className="font-mono text-xs text-muted-foreground">
              {filename}
            </span>
          ) : (
            <span className="font-mono text-xs text-muted-foreground uppercase tracking-widest">
              {language}
            </span>
          )}
        </div>
        <button
          type="button"
          onClick={handleCopy}
          data-ocid="code_block.copy_button"
          aria-label="Copy code"
          className="flex items-center gap-1.5 text-xs font-mono text-muted-foreground hover:text-foreground transition-colors px-2 py-1 rounded hover:bg-muted/40"
        >
          {copied ? (
            <Check className="w-3.5 h-3.5 text-accent" />
          ) : (
            <Copy className="w-3.5 h-3.5" />
          )}
          <span>{copied ? "copied" : "copy"}</span>
        </button>
      </div>

      {/* Code area */}
      <div className="overflow-x-auto">
        <div className="flex min-w-0">
          {lineNumbers && (
            <div
              aria-hidden="true"
              className="select-none flex-shrink-0 border-r border-[oklch(var(--code-border))] bg-[oklch(0.09_0_0)] px-3 py-4"
            >
              {Array.from({ length: lineCount }, (_, i) => (
                <div
                  key={`ln-${i + 1}`}
                  className="font-mono text-xs text-muted-foreground/40 text-right leading-6"
                >
                  {i + 1}
                </div>
              ))}
            </div>
          )}
          <pre
            className="flex-1 overflow-x-auto py-4 px-4 m-0 bg-transparent text-sm font-mono leading-6"
            style={{
              whiteSpace: "pre",
              overflowWrap: "normal",
              wordBreak: "normal",
            }}
          >
            <code
              ref={codeRef}
              className={`language-${prismLang}`}
              style={{ whiteSpace: "pre" }}
            />
          </pre>
        </div>
      </div>

      {/* Expand / Collapse */}
      {isCollapsible && (
        <button
          type="button"
          onClick={() => setExpanded((v) => !v)}
          data-ocid="code_block.expand_button"
          className="w-full flex items-center justify-center gap-2 py-2 font-mono text-xs text-muted-foreground hover:text-foreground border-t border-[oklch(var(--code-border))] bg-[oklch(0.1_0_0)] hover:bg-muted/20 transition-colors"
        >
          {expanded ? (
            <>
              <ChevronUp className="w-3.5 h-3.5" />
              Collapse
            </>
          ) : (
            <>
              <ChevronDown className="w-3.5 h-3.5" />
              Show {totalLines - COLLAPSE_THRESHOLD} more lines
            </>
          )}
        </button>
      )}
    </div>
  );
}
