import type { CaseItem } from "@/types/case";
import seedCases from "../../data/case";

let store: CaseItem[] = [...seedCases];

export function listCases(): CaseItem[] {
  return store;
}

export function getCaseById(id: string): CaseItem | undefined {
  return store.find((item) => item.id === id);
}

export function createCase(
  payload: Omit<CaseItem, "id" | "publishedAt" | "stats"> & Partial<
    Pick<CaseItem, "id" | "publishedAt" | "stats">
  >
): CaseItem {
  const now = new Date().toISOString().slice(0, 10);
  const item: CaseItem = {
    id: payload.id ?? `case-${Date.now()}`,
    title: payload.title,
    summary: payload.summary,
    description: payload.description,
    cover: payload.cover,
    tags: payload.tags ?? [],
    author: payload.author,
    publishedAt: payload.publishedAt ?? now,
    stats: payload.stats ?? { views: 0, likes: 0 },
  };
  store = [item, ...store];
  return item;
}
