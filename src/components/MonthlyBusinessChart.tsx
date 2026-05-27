"use client";

import ReactECharts from "echarts-for-react";
import { useMemo } from "react";

export default function MonthlyBusinessChart() {
  const months = [
    "1月",
    "2月",
    "3月",
    "4月",
    "5月",
    "6月",
    "7月",
    "8月",
    "9月",
    "10月",
    "11月",
    "12月",
  ];

  const salesData = [
    120.5, 132.8, 101.2, 134.9, 190.3, 230.6, 210.7, 182.4, 191.8, 234.5, 290.2,
    330.9,
  ];

  const profitRateData = [
    12.3, 13.5, 11.2, 14.8, 16.2, 18.5, 17.3, 15.9, 16.8, 18.2, 20.5, 22.3,
  ];

  const option = useMemo(() => {
    return {
      title: {
        text: "月度经营数据",
        subtext: "销售额与利润率",
        left: "center",
        textStyle: {
          fontSize: 18,
          fontWeight: "bold",
          color: "#1e293b",
        },
        subtextStyle: {
          fontSize: 14,
          color: "#64748b",
        },
      },
      tooltip: {
        trigger: "axis",
        axisPointer: {
          type: "cross",
          crossStyle: {
            color: "#999",
          },
        },
        formatter: function (params: any) {
          const month = params[0].axisValue;
          let result = `<div style="font-weight: 600; margin-bottom: 8px;">${month}</div>`;
          params.forEach((item: any) => {
            if (item.seriesName === "销售额") {
              result += `<div style="display: flex; align-items: center; gap: 8px; margin: 4px 0;">
                <span style="display: inline-block; width: 10px; height: 10px; background: ${item.color}; border-radius: 50%;"></span>
                <span>${item.seriesName}：</span>
                <span style="font-weight: 600;">${item.value.toFixed(1)} 千元</span>
              </div>`;
            } else if (item.seriesName === "利润率") {
              result += `<div style="display: flex; align-items: center; gap: 8px; margin: 4px 0;">
                <span style="display: inline-block; width: 10px; height: 10px; background: ${item.color}; border-radius: 50%;"></span>
                <span>${item.seriesName}：</span>
                <span style="font-weight: 600;">${item.value.toFixed(1)}%</span>
              </div>`;
            }
          });
          return result;
        },
      },
      legend: {
        data: ["销售额", "利润率"],
        bottom: 10,
        left: "center",
        itemWidth: 20,
        itemHeight: 14,
        textStyle: {
          fontSize: 13,
          color: "#475569",
        },
      },
      grid: {
        left: "3%",
        right: "4%",
        bottom: "15%",
        top: "18%",
        containLabel: true,
      },
      xAxis: [
        {
          type: "category",
          data: months,
          axisPointer: {
            type: "shadow",
          },
          axisLine: {
            lineStyle: {
              color: "#cbd5e1",
            },
          },
          axisLabel: {
            color: "#64748b",
            fontSize: 12,
          },
        },
      ],
      yAxis: [
        {
          type: "value",
          name: "销售额（千元）",
          position: "left",
          nameTextStyle: {
            color: "#3b82f6",
            fontSize: 12,
            padding: [0, 0, 0, 40],
          },
          axisLabel: {
            formatter: "{value}",
            color: "#64748b",
            fontSize: 12,
          },
          axisLine: {
            show: true,
            lineStyle: {
              color: "#3b82f6",
            },
          },
          splitLine: {
            lineStyle: {
              color: "#e2e8f0",
              type: "dashed",
            },
          },
        },
        {
          type: "value",
          name: "利润率（%）",
          position: "right",
          nameTextStyle: {
            color: "#f97316",
            fontSize: 12,
            padding: [0, 40, 0, 0],
          },
          axisLabel: {
            formatter: "{value}%",
            color: "#64748b",
            fontSize: 12,
          },
          axisLine: {
            show: true,
            lineStyle: {
              color: "#f97316",
            },
          },
          splitLine: {
            show: false,
          },
        },
      ],
      dataZoom: [
        {
          type: "slider",
          show: true,
          xAxisIndex: [0],
          start: 0,
          end: 100,
          height: 25,
          bottom: 60,
          borderColor: "#e2e8f0",
          fillerColor: "rgba(59, 130, 246, 0.1)",
          handleStyle: {
            color: "#3b82f6",
            borderColor: "#3b82f6",
          },
          textStyle: {
            color: "#64748b",
            fontSize: 11,
          },
        },
        {
          type: "inside",
          xAxisIndex: [0],
          start: 0,
          end: 100,
        },
      ],
      series: [
        {
          name: "销售额",
          type: "bar",
          barWidth: "50%",
          itemStyle: {
            borderRadius: [6, 6, 0, 0],
            color: {
              type: "linear",
              x: 0,
              y: 0,
              x2: 0,
              y2: 1,
              colorStops: [
                { offset: 0, color: "#3b82f6" },
                { offset: 1, color: "#93c5fd" },
              ],
            },
          },
          emphasis: {
            itemStyle: {
              color: {
                type: "linear",
                x: 0,
                y: 0,
                x2: 0,
                y2: 1,
                colorStops: [
                  { offset: 0, color: "#2563eb" },
                  { offset: 1, color: "#60a5fa" },
                ],
              },
            },
          },
          data: salesData,
        },
        {
          name: "利润率",
          type: "line",
          yAxisIndex: 1,
          smooth: true,
          symbol: "circle",
          symbolSize: 8,
          lineStyle: {
            color: "#f97316",
            width: 3,
          },
          itemStyle: {
            color: "#f97316",
            borderColor: "#fff",
            borderWidth: 2,
          },
          label: {
            show: true,
            position: "top",
            formatter: "{c}%",
            fontSize: 11,
            fontWeight: 600,
            color: "#f97316",
          },
          data: profitRateData,
        },
      ],
    };
  }, [months, salesData, profitRateData]);

  return (
    <div className="w-full" style={{ height: "400px" }}>
      <ReactECharts
        option={option}
        style={{ width: "100%", height: "100%" }}
        opts={{ renderer: "canvas" }}
      />
    </div>
  );
}
