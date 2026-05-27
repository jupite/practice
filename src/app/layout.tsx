import type { Metadata } from "next";
import "./globals.css";
import Link from "next/link";

export const metadata: Metadata = {
  title: "案例展示中心 · Case Gallery",
  description: "不同场景下的项目案例集中展示",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="zh-CN">
      <body>
        <header className="sticky top-0 z-50 bg-white/80 backdrop-blur border-b border-slate-200">
          <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
            <Link href="/" className="flex items-center gap-2 font-semibold text-lg">
              <span className="inline-block w-8 h-8 rounded-lg bg-brand-600 text-white grid place-items-center text-sm">C</span>
              <span>Case Gallery</span>
            </Link>
            <nav className="flex items-center gap-6 text-sm text-slate-600">
              <Link href="/" className="hover:text-brand-600 transition-colors">
                首页
              </Link>
              <Link href="/cases/new" className="hover:text-brand-600 transition-colors">
                新增案例
              </Link>
            </nav>
          </div>
        </header>
        <main className="max-w-6xl mx-auto px-6 py-10">{children}</main>
      </body>
    </html>
  );
}
