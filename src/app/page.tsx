import CaseCard from "@/components/CaseCard";
import type { CaseItem, ApiResponse } from "@/types/case";

async function fetchCases(): Promise<CaseItem[]> {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";
  const res = await fetch(`${baseUrl}/api/cases`, {
    cache: "no-store",
  });
  if (!res.ok) {
    throw new Error("获取案例列表失败");
  }
  const json = (await res.json()) as ApiResponse<CaseItem[]>;
  return json.data;
}

export default async function HomePage() {
  const cases = await fetchCases();

  return (
    <div>
      <section className="mb-12">
        <div className="flex items-end justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-slate-900">场景案例展示</h1>
            <p className="mt-2 text-slate-500">
              精选各行业的项目实践，从智慧城市到医疗 AI，一站式浏览。
            </p>
          </div>
          <a
            href="/cases/new"
            className="shrink-0 inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-brand-600 text-white text-sm font-medium hover:bg-brand-700 transition-colors"
          >
            + 新增案例
          </a>
        </div>
      </section>

      {cases.length === 0 ? (
        <div className="text-center py-20 text-slate-400">暂无案例</div>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {cases.map((item) => (
            <CaseCard key={item.id} item={item} />
          ))}
        </div>
      )}
    </div>
  );
}
