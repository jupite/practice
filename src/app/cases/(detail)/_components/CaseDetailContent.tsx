import type { CaseItem } from "@/types/case";

export default function CaseDetailContent({
  item,
  children,
}: {
  item: CaseItem;
  children?: React.ReactNode;
}) {
  return (
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

        {children}
      </div>
    </div>
  );
}
