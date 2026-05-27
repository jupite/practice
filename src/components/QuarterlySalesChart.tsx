"use client";

import ReactECharts from "echarts-for-react";
import { useMemo } from "react";

export default function QuarterlySalesChart() {
  const quarters = ["Q1", "Q2", "Q3", "Q4"];

  const electronicsData = [320, 450, 380, 520];
  const householdData = [280, 320, 400, 450];
  const clothingData = [420, 380, 450, 500];
  const foodData = [350, 400, 480, 550];

  const totalSales = quarters.map(
    (_, i) =>
      electronicsData[i] + householdData[i] + clothingData[i] + foodData[i]
  );

  const option = useMemo(() => {
    return {
      backgroundColor: "#f5f5f5",
      title: {
        text: "季度品类销量分析",
        subtext: "各品类销量构成与总销量趋势",
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
          const quarter = params[0].axisValue;
          let result = `<div style="font-weight: 600; margin-bottom: 8px;">${quarter}</div>`;
          let total = 0;
          params.forEach((item: any) => {
            if (item.seriesName === "总销量趋势") {
              return;
            }
            total += item.value;
            result += `<div style="display: flex; align-items: center; gap: 8px; margin: 4px 0;">
              <span style="display: inline-block; width: 10px; height: 10px; background: ${item.color}; border-radius: 50%;"></span>
              <span>${item.seriesName}：</span>
              <span style="font-weight: 600;">${item.value} 件</span>
            </div>`;
          });
          result += `<div style="border-top: 1px solid #e2e8f0; margin-top: 8px; padding-top: 8px; display: flex; justify-content: space-between; font-weight: 600;">
            <span>总销量：</span>
            <span>${total} 件</span>
          </div>`;
          return result;
        },
      },
      legend: {
        data: ["电子产品", "家居用品", "服装", "食品", "总销量趋势"],
        top: 70,
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
        bottom: "10%",
        top: "28%",
        containLabel: true,
      },
      xAxis: [
        {
          type: "category",
          data: quarters,
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
          name: "销量(件)",
          position: "left",
          nameTextStyle: {
            color: "#64748b",
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
              color: "#cbd5e1",
            },
          },
          splitLine: {
            lineStyle: {
              color: "#e0e0e0",
              type: "solid",
            },
          },
        },
        {
          type: "value",
          name: "总销量",
          position: "right",
          nameTextStyle: {
            color: "#ef4444",
            fontSize: 12,
            padding: [0, 40, 0, 0],
          },
          axisLabel: {
            formatter: "{value}",
            color: "#64748b",
            fontSize: 12,
          },
          axisLine: {
            show: true,
            lineStyle: {
              color: "#ef4444",
            },
          },
          splitLine: {
            show: false,
          },
        },
      ],
      series: [
        {
          name: "电子产品",
          type: "bar",
          stack: "total",
          barWidth: "50%",
          itemStyle: {
            borderRadius: [0, 0, 0, 0],
            color: "#86efac",
          },
          emphasis: {
            itemStyle: {
              color: "#4ade80",
            },
          },
          data: electronicsData,
        },
        {
          name: "家居用品",
          type: "bar",
          stack: "total",
          barWidth: "50%",
          itemStyle: {
            borderRadius: [0, 0, 0, 0],
            color: "#fcd34d",
          },
          emphasis: {
            itemStyle: {
              color: "#fbbf24",
            },
          },
          data: householdData,
        },
        {
          name: "服装",
          type: "bar",
          stack: "total",
          barWidth: "50%",
          itemStyle: {
            borderRadius: [0, 0, 0, 0],
            color: "#c4b5fd",
          },
          emphasis: {
            itemStyle: {
              color: "#a78bfa",
            },
          },
          data: clothingData,
        },
        {
          name: "食品",
          type: "bar",
          stack: "total",
          barWidth: "50%",
          itemStyle: {
            borderRadius: [6, 6, 0, 0],
            color: "#7dd3fc",
          },
          emphasis: {
            itemStyle: {
              color: "#38bdf8",
            },
          },
          label: {
            show: true,
            position: "top",
            formatter: function (params: any) {
              const index = params.dataIndex;
              return totalSales[index];
            },
            fontSize: 12,
            fontWeight: 600,
            color: "#1e293b",
          },
          data: foodData,
        },
        {
          name: "总销量趋势",
          type: "line",
          yAxisIndex: 1,
          smooth: false,
          symbol: "circle",
          symbolSize: 8,
          lineStyle: {
            type: "dashed",
            color: "#ef4444",
            width: 2,
          },
          itemStyle: {
            color: "#ef4444",
            borderColor: "#fff",
            borderWidth: 2,
          },
          data: totalSales,
        },
      ],
    };
  }, [quarters, electronicsData, householdData, clothingData, foodData, totalSales]);

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
