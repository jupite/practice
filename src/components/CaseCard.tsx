import type { CaseItem } from "@/types/case";
import Link from "next/link";

export default function CaseCard({ item }: { item: CaseItem }) {
  return (
    <Link
      href={`/cases/${item.id}`}
      className="group block bg-white rounded-2xl overflow-hidden shadow-card hover:shadow-cardHover transition-all duration-300 hover:-translate-y-1"
    >
      <div className="relative aspect-[16/9] overflow-hidden bg-slate-100">
        <img
          src={item.cover}
          alt={item.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />
      </div>
      <div className="p-5">
        <h3 className="text-lg font-semibold text-slate-900 group-hover:text-brand-600 transition-colors line-clamp-1">
          {item.title}
        </h3>
        <p className="mt-2 text-sm text-slate-500 line-clamp-2 leading-relaxed">
          {item.summary}
        </p>
        <div className="mt-4 flex flex-wrap gap-2">
          {item.tags.slice(0, 3).map((tag) => (
            <span
              key={tag}
              className="px-2.5 py-1 text-xs font-medium rounded-full bg-brand-50 text-brand-700"
            >
              {tag}
            </span>
          ))}
        </div>
        <div className="mt-4 pt-4 border-t border-slate-100 flex items-center justify-between text-xs text-slate-400">
          <span>{item.author}</span>
          <span className="flex items-center gap-3">
            <span>👁 {item.stats.views.toLocaleString()}</span>
            <span>❤ {item.stats.likes.toLocaleString()}</span>
          </span>
        </div>
      </div>
    </Link>
  );
}
