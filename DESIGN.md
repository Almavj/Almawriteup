# CTF Portfolio — Design Brief

## Tone & Purpose
Industrial cybersecurity aesthetic. Dark terminal UI with professional polish. Purpose: showcase technical CTF writeups with readable code blocks and semantic category/difficulty visualization.

## Differentiation
Subtle code-block glows (cyan accent), semantic category badges (pwn=orange, web=purple, crypto=warm-orange, forensics=indigo, rev=red, misc=teal, osint=yellow), traffic-light difficulty indicators (easy=green, medium=yellow, hard=orange, insane=red). Code blocks scroll horizontally without wrapping; never constrain line width.

## Color Palette (OKLCH)

| Token | Light | Dark | Usage |
|-------|-------|------|-------|
| primary | 0.7 0.22 260 | 0.75 0.23 260 | CTAs, active states, nav highlight (cyan) |
| accent | 0.65 0.2 130 | 0.7 0.25 130 | Code glows, success indicators (green) |
| destructive | 0.58 0.22 25 | 0.65 0.2 25 | Warnings, error states (red) |
| background | 0.98 0 0 | 0.08 0 0 | Page background |
| card | 0.96 0 0 | 0.12 0 0 | Writeup cards, modals |
| muted | 0.88 0 0 | 0.18 0 0 | Secondary text, borders |
| code-bg | 0.08 0 0 | 0.06 0 0 | Code block background |

## Typography
- **Display**: General Sans (geometric, professional) — headings, titles
- **Body**: DM Sans (humanist, readable) — paragraphs, metadata
- **Mono**: Geist Mono (terminal-style) — code snippets, inline code

## Structural Zones
- **Header**: Solid card background with bottom border; logo, nav, dark-mode toggle
- **Hero/Featured**: Large writeup card with accent border glow on code blocks
- **Content Sections**: Alternating card (bg-card) and transparent backgrounds for rhythm
- **Code Blocks**: Dark code-bg with subtle borders; scrollable x-overflow; syntax coloring via Prism
- **Footer**: Muted background, reduced opacity text, centered layout

## Spacing & Rhythm
Mobile-first: `sm` (640px), `md` (768px), `lg` (1024px), `xl` (1280px). Dense spacing on mobile (1rem), relaxed on desktop (2rem sections). Consistent 8px unit grid.

## Component Patterns
1. **Writeup Card**: Title + metadata row (category/difficulty/date) + tags + code snippet preview + CTAs
2. **Code Block**: Language label top-left, line numbers (optional), syntax highlighting, copy button top-right, horizontal scroll
3. **Category Badge**: Semantic background color + white text, rounded corners, uppercase label
4. **Difficulty Badge**: Traffic-light color (easy/medium/hard/insane) + white text
5. **Flag Block**: Hidden by default (blur/opacity), "Reveal" button to toggle visibility

## Motion & Micro-interactions
- Smooth transitions (0.3s cubic-bezier) on all interactive elements
- Code-block hover: enhance glow intensity (code-glow-active)
- Link underlines slide in on hover
- Dark-mode toggle: subtle fade transition

## Constraints
- No generic blue CTA buttons — cyan primary for tech direction
- No full-page gradients — depth via layered cards and shadows
- Code lines never wrap; horizontal scroll required
- Minimum contrast AA+ in both light and dark modes
- No more than 3 accent colors per zone

## Signature Detail
Glowing cyan accent around code blocks in dark mode. Semantic category/difficulty colors tied to CTF taxonomy. Terminal-grade monospace for all code. Professional-grade type system: geometric display font pairs with humanist body font for readability at any size.
