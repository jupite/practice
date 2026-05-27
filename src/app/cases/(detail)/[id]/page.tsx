import { notFound } from "next/navigation";
import CaseDetailContent from "../_components/CaseDetailContent";
import { fetchCase } from "../_components/fetchCase";

export default async function CaseDetailPage({
  params,
}: {
  params: { id: string };
}) {
  const item = await fetchCase(params.id);
  if (!item) notFound();

  return (
    <CaseDetailContent item={item}>
      <div className="mt-8 border-t border-slate-100 pt-6">
        <h2 className="text-xl font-semibold text-slate-900 mb-4">案例详情</h2>
        <p className="text-slate-700 leading-8 whitespace-pre-wrap">
          {item.description}
        </p>
      </div>
    </CaseDetailContent>
  );
}
