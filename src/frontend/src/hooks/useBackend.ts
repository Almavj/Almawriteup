import { useActor } from "@caffeineai/core-infrastructure";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { type ExternalBlob, type WriteupInput, createActor } from "../backend";
import type { ImageRecord, PagedWriteups, Writeup } from "../types";

function useBackendActor() {
  return useActor(createActor);
}

// ——— Query hooks ———

export function useWriteups(page = 1, pageSize = 10) {
  const { actor, isFetching } = useBackendActor();
  return useQuery<PagedWriteups>({
    queryKey: ["writeups", page, pageSize],
    queryFn: async () => {
      if (!actor) return { writeups: [], total: BigInt(0) };
      return actor.listPublishedWriteups(BigInt(page - 1), BigInt(pageSize));
    },
    enabled: !!actor && !isFetching,
    staleTime: 30_000,
  });
}

export function useWriteup(slug: string) {
  const { actor, isFetching } = useBackendActor();
  return useQuery<Writeup | null>({
    queryKey: ["writeup", slug],
    queryFn: async () => {
      if (!actor) return null;
      return actor.getWriteupBySlug(slug);
    },
    enabled: !!actor && !isFetching && !!slug,
    staleTime: 60_000,
  });
}

export function useWriteupById(id: bigint | null) {
  const { actor, isFetching } = useBackendActor();
  return useQuery<Writeup | null>({
    queryKey: ["writeup-id", id?.toString()],
    queryFn: async () => {
      if (!actor || id === null) return null;
      return actor.getWriteup(id);
    },
    enabled: !!actor && !isFetching && id !== null,
    staleTime: 60_000,
  });
}

export function useAllWriteups() {
  const { actor, isFetching } = useBackendActor();
  return useQuery<Writeup[]>({
    queryKey: ["all-writeups"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.listAllWriteups();
    },
    enabled: !!actor && !isFetching,
    staleTime: 30_000,
  });
}

export function useAllPublishedWriteups() {
  const { actor, isFetching } = useBackendActor();
  return useQuery<Writeup[]>({
    queryKey: ["all-published-writeups"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.listAllPublishedWriteups();
    },
    enabled: !!actor && !isFetching,
    staleTime: 30_000,
  });
}

export function useTags() {
  const { actor, isFetching } = useBackendActor();
  return useQuery<string[]>({
    queryKey: ["tags"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getAllTags();
    },
    enabled: !!actor && !isFetching,
    staleTime: 60_000,
  });
}

export function useRelatedWriteups(id: bigint | null, limit = 4) {
  const { actor, isFetching } = useBackendActor();
  return useQuery<Writeup[]>({
    queryKey: ["related", id?.toString()],
    queryFn: async () => {
      if (!actor || id === null) return [];
      return actor.getRelatedWriteups(id, BigInt(limit));
    },
    enabled: !!actor && !isFetching && id !== null,
    staleTime: 60_000,
  });
}

export function useWriteupsByCategory(category: string) {
  const { actor, isFetching } = useBackendActor();
  return useQuery<Writeup[]>({
    queryKey: ["writeups-category", category],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getWriteupsByCategory(category);
    },
    enabled: !!actor && !isFetching && !!category,
    staleTime: 30_000,
  });
}

export function useWriteupsByTag(tag: string) {
  const { actor, isFetching } = useBackendActor();
  return useQuery<Writeup[]>({
    queryKey: ["writeups-tag", tag],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getWriteupsByTag(tag);
    },
    enabled: !!actor && !isFetching && !!tag,
    staleTime: 30_000,
  });
}

export function useSearchWriteups(query: string) {
  const { actor, isFetching } = useBackendActor();
  return useQuery<Writeup[]>({
    queryKey: ["search", query],
    queryFn: async () => {
      if (!actor || !query.trim()) return [];
      return actor.searchWriteups(query);
    },
    enabled: !!actor && !isFetching && query.trim().length > 1,
    staleTime: 15_000,
  });
}

export function useIsAdmin() {
  const { actor, isFetching } = useBackendActor();
  return useQuery<boolean>({
    queryKey: ["is-admin"],
    queryFn: async () => {
      if (!actor) return false;
      return actor.isAdmin();
    },
    enabled: !!actor && !isFetching,
    staleTime: 60_000,
  });
}

export function useImages() {
  const { actor, isFetching } = useBackendActor();
  return useQuery<ImageRecord[]>({
    queryKey: ["images"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.listImages();
    },
    enabled: !!actor && !isFetching,
    staleTime: 30_000,
  });
}

// ——— Mutation hooks ———

export function useCreateWriteup() {
  const { actor } = useBackendActor();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (input: WriteupInput) => {
      if (!actor) throw new Error("Actor not ready");
      const result = await actor.createWriteup(input);
      if (result.__kind__ === "err") throw new Error(result.err);
      return result.ok;
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["writeups"] });
      qc.invalidateQueries({ queryKey: ["all-writeups"] });
      qc.invalidateQueries({ queryKey: ["tags"] });
    },
  });
}

export function useUpdateWriteup() {
  const { actor } = useBackendActor();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, input }: { id: bigint; input: WriteupInput }) => {
      if (!actor) throw new Error("Actor not ready");
      const result = await actor.updateWriteup(id, input);
      if (result.__kind__ === "err") throw new Error(result.err);
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["writeups"] });
      qc.invalidateQueries({ queryKey: ["all-writeups"] });
      qc.invalidateQueries({ queryKey: ["writeup"] });
      qc.invalidateQueries({ queryKey: ["writeup-id"] });
    },
  });
}

export function useDeleteWriteup() {
  const { actor } = useBackendActor();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (id: bigint) => {
      if (!actor) throw new Error("Actor not ready");
      const result = await actor.deleteWriteup(id);
      if (result.__kind__ === "err") throw new Error(result.err);
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["writeups"] });
      qc.invalidateQueries({ queryKey: ["all-writeups"] });
    },
  });
}

export function useUploadImage() {
  const { actor } = useBackendActor();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async ({
      filename,
      mimeType,
      blob,
    }: {
      filename: string;
      mimeType: string;
      blob: ExternalBlob;
    }) => {
      if (!actor) throw new Error("Actor not ready");
      const result = await actor.uploadImage(filename, mimeType, blob);
      if (result.__kind__ === "err") throw new Error(result.err);
      return result.ok;
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["images"] });
    },
  });
}

export function useDeleteImage() {
  const { actor } = useBackendActor();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (url: string) => {
      if (!actor) throw new Error("Actor not ready");
      const result = await actor.deleteImage(url);
      if (result.__kind__ === "err") throw new Error(result.err);
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["images"] });
    },
  });
}

export function useClaimAdmin() {
  const { actor } = useBackendActor();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async () => {
      if (!actor) throw new Error("Actor not ready");
      const result = await actor.claimAdmin();
      if (result.__kind__ === "err") throw new Error(result.err);
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["is-admin"] });
    },
  });
}
