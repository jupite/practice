import Link from "next/link";

export default function DetailLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <article className="max-w-3xl mx-auto">
      <Link
        href="/"
        className="inline-flex items-center gap-1 text-sm text-slate-500 hover:text-brand-600 transition-colors mb-6"
      >
        ← 返回列表
      </Link>
      {children}
    </article>
  );
}
