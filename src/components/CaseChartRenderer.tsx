"use client";

import dynamic from "next/dynamic";
import { Suspense } from "react";

const MonthlyBusinessChart = dynamic(
  () => import("./MonthlyBusinessChart"),
  { ssr: false }
);

const QuarterlySalesChart = dynamic(
  () => import("./QuarterlySalesChart"),
  { ssr: false }
);

interface CaseChartRendererProps {
  chartType: string;
}

export default function CaseChartRenderer({ chartType }: CaseChartRendererProps) {
  if (chartType === "monthly-business") {
    return (
      <Suspense fallback={<div className="h-[400px] flex items-center justify-center text-slate-400">图表加载中...</div>}>
        <MonthlyBusinessChart />
      </Suspense>
    );
  }

  if (chartType === "quarterly-sales") {
    return (
      <Suspense fallback={<div className="h-[400px] flex items-center justify-center text-slate-400">图表加载中...</div>}>
        <QuarterlySalesChart />
      </Suspense>
    );
  }

  return null;
}
