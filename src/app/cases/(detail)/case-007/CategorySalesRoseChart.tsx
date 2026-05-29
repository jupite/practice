"use client";

import ReactECharts from "echarts-for-react";
import { useMemo, useEffect, useState } from "react";
import type { CategorySalesRoseData } from "@/types/case";

async function fetchChartData(): Promise<CategorySalesRoseData | null> {
  try {
    const res = await fetch("/api/chart-data/category-sales-rose");
    const result = await res.json();
    if (result.code === 0) {
      return result.data;
    }
    return null;
  } catch {
    return null;
  }
}

export default function CategorySalesRoseChart() {
  const [chartData, setChartData] = useState<CategorySalesRoseData | null>(null);

  useEffect(() => {
    fetchChartData().then(setChartData);
  }, []);

  const option = useMemo(() => {
    if (!chartData) return {};

    const { categories, salesData, morandiColors } = chartData;

    return {
      title: {
        text: "品类销售额占比",
        left: "center",
        top: 10,
        textStyle: {
          fontSize: 18,
          fontWeight: "bold",
          color: "#1e293b",
        },
      },
      tooltip: {
        trigger: "item",
        formatter: function (params: any) {
          return `<div style="font-weight: 600; margin-bottom: 4px;">${params.name}</div>
            <div>销售额：<span style="font-weight: 600;">${(params.value / 100).toFixed(1)} 亿元</span></div>
            <div>占比：<span style="font-weight: 600;">${params.percent.toFixed(1)}%</span></div>`;
        },
      },
      legend: {
        orient: "vertical",
        right: "5%",
        top: "middle",
        itemWidth: 14,
        itemHeight: 14,
        itemGap: 16,
        textStyle: {
          fontSize: 13,
          color: "#475569",
        },
      },
      graphic: [
        {
          type: "text",
          left: "center",
          top: "44%",
          style: {
            text: "总销售额",
            fontSize: 14,
            fill: "#64748b",
            textAlign: "center",
          },
        },
        {
          type: "text",
          left: "center",
          top: "50%",
          style: {
            text: "2.5 亿",
            fontSize: 26,
            fontWeight: "bold",
            fill: "#1e293b",
            textAlign: "center",
          },
        },
      ],
      series: [
        {
          name: "品类销售额",
          type: "pie",
          roseType: "area",
          radius: ["42%", "68%"],
          center: ["45%", "55%"],
          itemStyle: {
            borderColor: "#fff",
            borderWidth: 2,
            borderRadius: 4,
          },
          label: {
            show: true,
            formatter: "{b}\n{d}%",
            fontSize: 12,
            color: "#475569",
            lineHeight: 18,
          },
          labelLine: {
            length: 15,
            length2: 20,
            smooth: 0.3,
            lineStyle: {
              color: "#94a3b8",
              width: 1,
            },
          },
          emphasis: {
            scaleSize: 8,
            itemStyle: {
              shadowBlur: 20,
              shadowOffsetX: 0,
              shadowColor: "rgba(0, 0, 0, 0.25)",
            },
          },
          blur: {
            itemStyle: {
              opacity: 0.3,
            },
          },
          animationType: "scale",
          animationEasing: "elasticOut",
          data: categories.map((name, i) => ({
            name,
            value: salesData[i],
            itemStyle: {
              color: morandiColors[i],
            },
          })),
        },
      ],
    };
  }, [chartData]);

  if (!chartData) {
    return (
      <div className="w-full flex items-center justify-center" style={{ height: "450px" }}>
        <div className="text-slate-500">加载中...</div>
      </div>
    );
  }

  return (
    <div className="w-full" style={{ height: "450px" }}>
      <ReactECharts
        option={option}
        style={{ width: "100%", height: "100%" }}
        opts={{ renderer: "canvas" }}
      />
    </div>
  );
}
