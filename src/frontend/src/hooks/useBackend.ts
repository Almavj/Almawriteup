import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { api } from "../api";
import type { ImageRecord, PagedWriteups, Writeup, WriteupInput } from "../api";

export function useWriteups(page = 1, pageSize = 10) {
  return useQuery<PagedWriteups>({
    queryKey: ["writeups", page, pageSize],
    queryFn: () => api.getWriteups(page, pageSize),
    staleTime: 30_000,
  });
}

export function useWriteup(slug: string) {
  return useQuery<Writeup | null>({
    queryKey: ["writeup", slug],
    queryFn: () => api.getWriteupBySlug(slug),
    enabled: !!slug,
    staleTime: 60_000,
  });
}

export function useWriteupById(id: number | null) {
  return useQuery<Writeup | null>({
    queryKey: ["writeup-id", id?.toString()],
    queryFn: () => (id !== null ? api.getWriteup(id) : null),
    enabled: id !== null,
    staleTime: 60_000,
  });
}

export function useAllWriteups() {
  return useQuery<Writeup[]>({
    queryKey: ["all-writeups"],
    queryFn: () => api.listAllWriteups(),
    staleTime: 30_000,
  });
}

export function useAllPublishedWriteups() {
  return useQuery<Writeup[]>({
    queryKey: ["all-published-writeups"],
    queryFn: () => api.listAllPublishedWriteups(),
    staleTime: 30_000,
  });
}

export function useTags() {
  return useQuery<string[]>({
    queryKey: ["tags"],
    queryFn: () => api.getAllTags(),
    staleTime: 60_000,
  });
}

export function useRelatedWriteups(id: number | null, limit = 4) {
  return useQuery<Writeup[]>({
    queryKey: ["related", id?.toString()],
    queryFn: () => (id !== null ? api.getRelatedWriteups(id, limit) : []),
    enabled: id !== null,
    staleTime: 60_000,
  });
}

export function useWriteupsByCategory(category: string) {
  return useQuery<Writeup[]>({
    queryKey: ["writeups-category", category],
    queryFn: () => api.getWriteupsByCategory(category),
    enabled: !!category,
    staleTime: 30_000,
  });
}

export function useWriteupsByTag(tag: string) {
  return useQuery<Writeup[]>({
    queryKey: ["writeups-tag", tag],
    queryFn: () => api.getWriteupsByTag(tag),
    enabled: !!tag,
    staleTime: 30_000,
  });
}

export function useSearchWriteups(query: string) {
  return useQuery<Writeup[]>({
    queryKey: ["search", query],
    queryFn: () => api.searchWriteups(query),
    enabled: query.trim().length > 1,
    staleTime: 15_000,
  });
}

export function useIsAdmin() {
  return useQuery<boolean>({
    queryKey: ["is-admin"],
    queryFn: () => api.isAdmin(),
    staleTime: 60_000,
  });
}

export function useImages() {
  return useQuery<ImageRecord[]>({
    queryKey: ["images"],
    queryFn: () => api.listImages(),
    staleTime: 30_000,
  });
}

export function useCreateWriteup() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (input: WriteupInput) => api.createWriteup(input),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["writeups"] });
      qc.invalidateQueries({ queryKey: ["all-writeups"] });
      qc.invalidateQueries({ queryKey: ["tags"] });
    },
  });
}

export function useUpdateWriteup() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ id, input }: { id: number; input: WriteupInput }) =>
      api.updateWriteup(id, input),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["writeups"] });
      qc.invalidateQueries({ queryKey: ["all-writeups"] });
      qc.invalidateQueries({ queryKey: ["writeup"] });
      qc.invalidateQueries({ queryKey: ["writeup-id"] });
    },
  });
}

export function useDeleteWriteup() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (id: number) => api.deleteWriteup(id),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["writeups"] });
      qc.invalidateQueries({ queryKey: ["all-writeups"] });
    },
  });
}

export function useUploadImage() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (file: File) => api.uploadImage(file),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["images"] });
    },
  });
}

export function useUploadFile() {
  return useMutation({
    mutationFn: (file: File) => api.uploadFile(file),
  });
}

export function useDeleteImage() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (url: string) => {
      const filename = url.split("/").pop() || url;
      return api.deleteImage(filename);
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["images"] });
    },
  });
}

export function useClaimAdmin() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: () => api.claimAdmin(),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["is-admin"] });
    },
  });
}
