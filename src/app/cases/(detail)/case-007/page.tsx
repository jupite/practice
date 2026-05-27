import { notFound } from "next/navigation";
import dynamic from "next/dynamic";
import { Suspense } from "react";
import CaseDetailContent from "../_components/CaseDetailContent";
import { fetchCase } from "../_components/fetchCase";

const CategorySalesRoseChart = dynamic(
  () => import("./CategorySalesRoseChart"),
  { ssr: false }
);

export default async function Case007Page() {
  const item = await fetchCase("case-007");
  if (!item) notFound();

  return (
    <CaseDetailContent item={item}>
      <div className="mt-8 border-t border-slate-100 pt-6">
        <h2 className="text-xl font-semibold text-slate-900 mb-4">数据可视化</h2>
        <Suspense
          fallback={
            <div className="h-[450px] flex items-center justify-center text-slate-400">
              图表加载中...
            </div>
          }
        >
          <CategorySalesRoseChart />
        </Suspense>
      </div>

      <div className="mt-8 border-t border-slate-100 pt-6">
        <h2 className="text-xl font-semibold text-slate-900 mb-4">案例详情</h2>
        <p className="text-slate-700 leading-8 whitespace-pre-wrap">
          {item.description}
        </p>
      </div>
    </CaseDetailContent>
  );
}
