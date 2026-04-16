import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export class ExternalBlob {
    getBytes(): Promise<Uint8Array<ArrayBuffer>>;
    getDirectURL(): string;
    static fromURL(url: string): ExternalBlob;
    static fromBytes(blob: Uint8Array<ArrayBuffer>): ExternalBlob;
    withUploadProgress(onProgress: (percentage: number) => void): ExternalBlob;
}
export type Timestamp = bigint;
export type Result_2 = {
    __kind__: "ok";
    ok: bigint;
} | {
    __kind__: "err";
    err: string;
};
export interface WriteupInput {
    title: string;
    content: string;
    flag: string;
    difficulty: Difficulty;
    slug: string;
    tags: Array<string>;
    flagHidden: boolean;
    category: Category;
    dateSolved: string;
    draft: boolean;
}
export type Result_1 = {
    __kind__: "ok";
    ok: null;
} | {
    __kind__: "err";
    err: string;
};
export type Result = {
    __kind__: "ok";
    ok: string;
} | {
    __kind__: "err";
    err: string;
};
export interface Writeup {
    id: bigint;
    title: string;
    content: string;
    flag: string;
    difficulty: Difficulty;
    createdAt: Timestamp;
    slug: string;
    tags: Array<string>;
    updatedAt: Timestamp;
    flagHidden: boolean;
    category: Category;
    dateSolved: string;
    draft: boolean;
}
export interface PagedWriteups {
    total: bigint;
    writeups: Array<Writeup>;
}
export interface ImageRecord {
    url: string;
    thumbnailUrl: string;
    blob: ExternalBlob;
    mimeType: string;
    filename: string;
    uploadedAt: Timestamp;
}
export enum Category {
    pwn = "pwn",
    rev = "rev",
    web = "web",
    osint = "osint",
    misc = "misc",
    forensics = "forensics",
    crypto = "crypto"
}
export enum Difficulty {
    easy = "easy",
    hard = "hard",
    insane = "insane",
    medium = "medium"
}
export interface backendInterface {
    claimAdmin(): Promise<Result_1>;
    createWriteup(input: WriteupInput): Promise<Result_2>;
    deleteImage(url: string): Promise<Result_1>;
    deleteWriteup(id: bigint): Promise<Result_1>;
    getAllTags(): Promise<Array<string>>;
    getRelatedWriteups(id: bigint, limit: bigint): Promise<Array<Writeup>>;
    getRssFeed(): Promise<string>;
    getSitemap(): Promise<string>;
    getWriteup(id: bigint): Promise<Writeup | null>;
    getWriteupBySlug(slug: string): Promise<Writeup | null>;
    getWriteupsByCategory(category: string): Promise<Array<Writeup>>;
    getWriteupsByTag(tag: string): Promise<Array<Writeup>>;
    isAdmin(): Promise<boolean>;
    listAllPublishedWriteups(): Promise<Array<Writeup>>;
    listAllWriteups(): Promise<Array<Writeup>>;
    listImages(): Promise<Array<ImageRecord>>;
    listPublishedWriteups(page: bigint, pageSize: bigint): Promise<PagedWriteups>;
    searchWriteups(queryText: string): Promise<Array<Writeup>>;
    updateWriteup(id: bigint, input: WriteupInput): Promise<Result_1>;
    uploadImage(filename: string, mimeType: string, blob: ExternalBlob): Promise<Result>;
}
