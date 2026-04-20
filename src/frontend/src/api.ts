const API_BASE_URL = import.meta.env.VITE_API_URL || (import.meta.env.PROD ? "https://almawriteup-api.onrender.com" : "http://localhost:8000");

export const Category = {
  pwn: "pwn",
  web: "web",
  crypto: "crypto",
  forensics: "forensics",
  rev: "rev",
  misc: "misc",
  osint: "osint",
} as const;

export type Category = (typeof Category)[keyof typeof Category];

export const Difficulty = {
  easy: "easy",
  medium: "medium",
  hard: "hard",
  insane: "insane",
} as const;

export type Difficulty = (typeof Difficulty)[keyof typeof Difficulty];

export interface Writeup {
  id: number;
  title: string;
  slug: string;
  category: Category;
  difficulty: Difficulty;
  date_solved: string;
  content: string;
  flag: string;
  flag_hidden: boolean;
  tags: string[];
  draft: boolean;
  challenge_url: string;
  challenge_files: Array<{
    filename: string;
    original_name: string;
    url: string;
  }>;
  created_at: string;
  updated_at: string;
}

export interface WriteupInput {
  title: string;
  slug: string;
  category: Category;
  difficulty: Difficulty;
  date_solved: string;
  content: string;
  flag: string;
  flag_hidden: boolean;
  tags: string[];
  draft: boolean;
  challenge_url: string;
  challenge_files: Array<{
    filename: string;
    original_name: string;
    url: string;
  }>;
}

export interface PagedWriteups {
  total: number;
  writeups: Writeup[];
}

export interface ImageRecord {
  id: number;
  filename: string;
  url: string;
  thumbnail_url: string;
  mime_type: string;
  uploaded_at: string;
}

export interface ImageUploadResponse {
  url: string;
}

export interface Result {
  ok?: unknown;
  err?: string;
}

class ApiClient {
  private baseUrl: string;
  private token: string | null = null;

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl;
    this.token = localStorage.getItem("auth_token");
  }

  private async request<T>(
    endpoint: string,
    options: RequestInit = {},
  ): Promise<T> {
    const headers: Record<string, string> = {
      "Content-Type": "application/json",
      ...(options.headers as Record<string, string> || {}),
    };

    const token = localStorage.getItem("auth_token");
    if (token) {
      headers.Authorization = `Bearer ${token}`;
    }

    const response = await fetch(`${this.baseUrl}${endpoint}`, {
      ...options,
      headers,
    });

    if (!response.ok) {
      const error = await response
        .json()
        .catch(() => ({ detail: response.statusText }));
      throw new Error(error.detail || error.message || "Request failed");
    }

    if (response.status === 204) {
      return {} as T;
    }

    return response.json();
  }

  setToken(token: string | null) {
    this.token = token;
    if (token) {
      localStorage.setItem("auth_token", token);
    } else {
      localStorage.removeItem("auth_token");
    }
  }

  getToken(): string | null {
    return localStorage.getItem("auth_token");
  }

  async login(password: string): Promise<string> {
    const response = await fetch(`${this.baseUrl}/api/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password }),
    });

    if (!response.ok) {
      throw new Error("Invalid password");
    }

    const data = await response.json();
    this.setToken(data.access_token);
    return data.access_token;
  }

  logout() {
    this.setToken(null);
  }

  async isAdmin(): Promise<boolean> {
    try {
      await this.request("/api/auth/status");
      return true;
    } catch {
      return false;
    }
  }

  async claimAdmin(): Promise<void> {
    await this.request("/api/auth/claim", { method: "POST" });
  }

  async getWriteups(page = 1, pageSize = 10): Promise<PagedWriteups> {
    return this.request(`/api/writeups?page=${page}&page_size=${pageSize}`);
  }

  async getWriteup(id: number): Promise<Writeup | null> {
    try {
      return await this.request(`/api/writeups/${id}`);
    } catch {
      return null;
    }
  }

  async getWriteupBySlug(slug: string): Promise<Writeup | null> {
    try {
      return await this.request(`/api/writeups/slug/${slug}`);
    } catch {
      return null;
    }
  }

  async listAllWriteups(): Promise<Writeup[]> {
    return this.request("/api/writeups/all");
  }

  async listAllPublishedWriteups(): Promise<Writeup[]> {
    return this.request("/api/writeups/published");
  }

  async searchWriteups(query: string): Promise<Writeup[]> {
    return this.request(`/api/writeups/search?q=${encodeURIComponent(query)}`);
  }

  async getWriteupsByCategory(category: string): Promise<Writeup[]> {
    return this.request(`/api/writeups/category/${category}`);
  }

  async getWriteupsByTag(tag: string): Promise<Writeup[]> {
    return this.request(`/api/writeups/tag/${encodeURIComponent(tag)}`);
  }

  async getRelatedWriteups(id: number, limit = 5): Promise<Writeup[]> {
    return this.request(`/api/writeups/related/${id}?limit=${limit}`);
  }

  async getAllTags(): Promise<string[]> {
    return this.request("/api/writeups/tags");
  }

  async createWriteup(input: WriteupInput): Promise<number> {
    const response = await this.request<{ ok: number }>("/api/writeups", {
      method: "POST",
      body: JSON.stringify(input),
    });
    return response.ok;
  }

  async updateWriteup(id: number, input: WriteupInput): Promise<void> {
    await this.request(`/api/writeups/${id}`, {
      method: "PUT",
      body: JSON.stringify(input),
    });
  }

  async deleteWriteup(id: number): Promise<void> {
    await this.request(`/api/writeups/${id}`, { method: "DELETE" });
  }

  async uploadImage(file: File): Promise<string> {
    const formData = new FormData();
    formData.append("file", file);

    const headers: Record<string, string> = {};
    if (this.token) {
      headers.Authorization = `Bearer ${this.token}`;
    }

    const response = await fetch(`${this.baseUrl}/api/images/upload`, {
      method: "POST",
      headers,
      body: formData,
    });

    if (!response.ok) {
      throw new Error("Upload failed");
    }

    const data = await response.json();
    return data.url;
  }

  async uploadFile(file: File): Promise<{ url: string; filename: string }> {
    const formData = new FormData();
    formData.append("file", file);

    const headers: Record<string, string> = {};
    if (this.token) {
      headers.Authorization = `Bearer ${this.token}`;
    }

    const response = await fetch(`${this.baseUrl}/api/images/upload-file`, {
      method: "POST",
      headers,
      body: formData,
    });

    if (!response.ok) {
      throw new Error("File upload failed");
    }

    return response.json();
  }

  async listImages(): Promise<ImageRecord[]> {
    return this.request("/api/images");
  }

  async deleteImage(filename: string): Promise<void> {
    await this.request(`/api/images/${encodeURIComponent(filename)}`, {
      method: "DELETE",
    });
  }

  async getRssFeed(): Promise<string> {
    const response = await fetch(`${this.baseUrl}/rss.xml`);
    return response.text();
  }

  async getSitemap(): Promise<string> {
    const response = await fetch(`${this.baseUrl}/sitemap.xml`);
    return response.text();
  }

  async uploadChallengeFile(writeupId: number, file: File): Promise<{
    filename: string;
    original_name: string;
    url: string;
  }> {
    const formData = new FormData();
    formData.append("file", file);

    const headers: Record<string, string> = {};
    if (this.token) {
      headers.Authorization = `Bearer ${this.token}`;
    }

    const response = await fetch(
      `${this.baseUrl}/api/challenge-files/upload/${writeupId}`,
      {
        method: "POST",
        headers,
        body: formData,
      }
    );

    if (!response.ok) {
      throw new Error("Challenge file upload failed");
    }

    return response.json();
  }

  async listChallengeFiles(
    writeupId: number
  ): Promise<Array<{
    id: number;
    filename: string;
    original_name: string;
    url: string;
    writeup_id: number;
    uploaded_at: string;
  }>> {
    return this.request(`/api/challenge-files/writeup/${writeupId}`);
  }

  async deleteChallengeFile(fileId: number): Promise<void> {
    await this.request(`/api/challenge-files/${fileId}`, { method: "DELETE" });
  }
}

export const api = new ApiClient(API_BASE_URL);
