import type { CaseItem, ApiResponse } from "@/types/case";
import Link from "next/link";
import { notFound } from "next/navigation";
import CaseChartRenderer from "@/components/CaseChartRenderer";

async function fetchCase(id: string): Promise<CaseItem | null> {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";
  const res = await fetch(`${baseUrl}/api/cases/${id}`, {
    cache: "no-store",
  });
  if (res.status === 404) return null;
  if (!res.ok) throw new Error("获取案例详情失败");
  const json = (await res.json()) as ApiResponse<CaseItem>;
  return json.data;
}

export default async function CaseDetailPage({
  params,
}: {
  params: { id: string };
}) {
  const item = await fetchCase(params.id);
  if (!item) notFound();

  return (
    <article className="max-w-3xl mx-auto">
      <Link
        href="/"
        className="inline-flex items-center gap-1 text-sm text-slate-500 hover:text-brand-600 transition-colors mb-6"
      >
        ← 返回列表
      </Link>

      <div className="rounded-2xl overflow-hidden shadow-card bg-white">
        <div className="aspect-[21/9] bg-slate-100">
          <img
            src={item.cover}
            alt={item.title}
            className="w-full h-full object-cover"
          />
        </div>

        <div className="p-8">
          <div className="flex flex-wrap gap-2 mb-4">
            {item.tags.map((tag) => (
              <span
                key={tag}
                className="px-3 py-1 text-xs font-medium rounded-full bg-brand-50 text-brand-700"
              >
                {tag}
              </span>
            ))}
          </div>

          <h1 className="text-3xl font-bold text-slate-900">{item.title}</h1>

          <div className="mt-4 flex items-center gap-4 text-sm text-slate-400">
            <span>作者：{item.author}</span>
            <span>发布：{item.publishedAt}</span>
            <span className="flex items-center gap-3">
              <span>👁 {item.stats.views.toLocaleString()}</span>
              <span>❤ {item.stats.likes.toLocaleString()}</span>
            </span>
          </div>

          <p className="mt-6 text-lg text-slate-700 leading-relaxed">
            {item.summary}
          </p>

          {item.chartType && (
            <div className="mt-8 border-t border-slate-100 pt-6">
              <h2 className="text-xl font-semibold text-slate-900 mb-4">数据可视化</h2>
              <CaseChartRenderer chartType={item.chartType} />
            </div>
          )}

          <div className="mt-8 border-t border-slate-100 pt-6">
            <h2 className="text-xl font-semibold text-slate-900 mb-4">案例详情</h2>
            <p className="text-slate-700 leading-8 whitespace-pre-wrap">
              {item.description}
            </p>
          </div>
        </div>
      </div>
    </article>
  );
}
