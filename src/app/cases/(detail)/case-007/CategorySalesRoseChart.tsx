"use client";

import ReactECharts from "echarts-for-react";
import { useMemo } from "react";

export default function CategorySalesRoseChart() {
  const categories = [
    "数码电子",
    "美妆护肤",
    "服饰鞋包",
    "食品饮料",
    "家居生活",
    "运动户外",
  ];

  const salesData = [7500, 5200, 4800, 3500, 2200, 1800];

  const morandiColors = [
    "#8E9AAF",
    "#B8A9C9",
    "#DEB8A0",
    "#A3B18A",
    "#9CB4CC",
    "#C9ADA7",
  ];

  const option = useMemo(() => {
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
  }, [categories, salesData, morandiColors]);

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
