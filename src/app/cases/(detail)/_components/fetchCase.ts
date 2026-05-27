import type { CaseItem, ApiResponse } from "@/types/case";

export async function fetchCase(id: string): Promise<CaseItem | null> {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";
  const res = await fetch(`${baseUrl}/api/cases/${id}`, {
    cache: "no-store",
  });
  if (res.status === 404) return null;
  if (!res.ok) throw new Error("获取案例详情失败");
  const json = (await res.json()) as ApiResponse<CaseItem>;
  return json.data;
}
