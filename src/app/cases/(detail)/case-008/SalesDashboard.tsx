"use client";

import { useEffect, useRef, useState, useMemo, useCallback } from "react";
import * as echarts from "echarts";
import type { SalesDashboardData } from "@/types/case";

async function fetchChartData(): Promise<SalesDashboardData | null> {
  try {
    const res = await fetch("/api/chart-data/sales-dashboard");
    const result = await res.json();
    if (result.code === 0) {
      return result.data;
    }
    return null;
  } catch {
    return null;
  }
}

export default function SalesDashboard() {
  const pieChartRef = useRef<HTMLDivElement>(null);
  const barChartRef = useRef<HTMLDivElement>(null);
  const lineChartRef = useRef<HTMLDivElement>(null);

  const pieInstanceRef = useRef<echarts.ECharts | null>(null);
  const barInstanceRef = useRef<echarts.ECharts | null>(null);
  const lineInstanceRef = useRef<echarts.ECharts | null>(null);

  const [chartData, setChartData] = useState<SalesDashboardData | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  useEffect(() => {
    fetchChartData().then(setChartData);
  }, []);

  const rawData = chartData?.salesData ?? [];
  const categories = chartData?.categories ?? [];
  const subbrands = chartData?.subbrands ?? {};
  const morandiColors = chartData?.morandiColors ?? [];

  const uniqueDates = useMemo(() => {
    return [...new Set(rawData.map((d) => d.date))].sort();
  }, [rawData]);

  const categoryMap = useMemo(() => {
    const map: Record<string, string> = {};
    for (const cat of categories) {
      for (const sub of subbrands[cat] ?? []) {
        map[sub] = cat;
      }
    }
    return map;
  }, [categories, subbrands]);

  const pieDatasetData = useMemo(() => {
    const categoryTotals: Record<string, number> = {};
    for (const item of rawData) {
      categoryTotals[item.category] = (categoryTotals[item.category] || 0) + item.sales;
    }
    return Object.entries(categoryTotals).map(([category, sales]) => ({
      category,
      sales,
    }));
  }, [rawData]);

  const pieTotal = useMemo(() => {
    return pieDatasetData.reduce((sum, d) => sum + d.sales, 0);
  }, [pieDatasetData]);

  const barDatasetDataAll = useMemo(() => {
    const subbrandTotals: Record<string, number> = {};
    for (const item of rawData) {
      subbrandTotals[item.subbrand] = (subbrandTotals[item.subbrand] || 0) + item.sales;
    }
    return Object.entries(subbrandTotals).map(([subbrand, sales]) => ({
      subbrand,
      sales,
      category: categoryMap[subbrand],
    }));
  }, [rawData, categoryMap]);

  const lineDatasetData = useMemo(() => {
    const result: { date: string; category: string; sales: number }[] = [];
    for (const category of categories) {
      for (const date of uniqueDates) {
        const total = rawData
          .filter((d) => d.category === category && d.date === date)
          .reduce((sum, d) => sum + d.sales, 0);
        result.push({ date, category, sales: total });
      }
    }
    return result;
  }, [rawData, uniqueDates, categories]);

  const updateBarChart = useCallback((category: string | null) => {
    if (!barInstanceRef.current) return;
    const filteredData = category
      ? barDatasetDataAll.filter((d) => d.category === category)
      : barDatasetDataAll;

    barInstanceRef.current.setOption({
      dataset: {
        source: filteredData,
      },
    });
  }, [barDatasetDataAll]);

  const updateLineChart = useCallback((category: string | null) => {
    if (!lineInstanceRef.current) return;

    if (category) {
      const catIdx = categories.indexOf(category);
      const filteredData = lineDatasetData.filter((d) => d.category === category);
      lineInstanceRef.current.setOption({
        legend: {
          data: [category],
        },
        dataset: {
          source: filteredData,
        },
        series: [
          {
            name: category,
            type: "line",
            encode: { x: "date", y: "sales" },
            smooth: true,
            symbol: "circle",
            symbolSize: 6,
            lineStyle: { width: 3, color: morandiColors[catIdx % morandiColors.length] },
            itemStyle: { color: morandiColors[catIdx % morandiColors.length] },
            emphasis: { focus: "series", lineStyle: { width: 4 } },
          },
        ],
      });
    } else {
      const series: any[] = [];
      categories.forEach((cat, idx) => {
        series.push({
          name: cat,
          type: "line",
          datasetIndex: idx + 1,
          encode: { x: "date", y: "sales" },
          smooth: true,
          symbol: "circle",
          symbolSize: 6,
          lineStyle: { width: 2, color: morandiColors[idx % morandiColors.length] },
          itemStyle: { color: morandiColors[idx % morandiColors.length] },
          emphasis: { focus: "series", lineStyle: { width: 3 } },
        });
      });

      const datasets: any[] = [{ id: "raw", source: lineDatasetData }];
      categories.forEach((cat) => {
        datasets.push({
          fromDatasetId: "raw",
          transform: {
            type: "filter",
            config: {
              and: [{ dimension: "category", "=": cat }],
            },
          },
        });
      });

      lineInstanceRef.current.setOption({
        legend: {
          data: categories,
        },
        dataset: datasets,
        series,
      });
    }
  }, [lineDatasetData, categories, morandiColors]);

  useEffect(() => {
    if (!chartData || !pieChartRef.current || !barChartRef.current || !lineChartRef.current) return;

    const pieChart = echarts.init(pieChartRef.current);
    const barChart = echarts.init(barChartRef.current);
    const lineChart = echarts.init(lineChartRef.current);

    pieInstanceRef.current = pieChart;
    barInstanceRef.current = barChart;
    lineInstanceRef.current = lineChart;

    const pieOption: echarts.EChartsOption = {
      dataset: {
        source: pieDatasetData,
      },
      title: {
        text: "品类销售额占比",
        left: "center",
        top: 10,
        textStyle: { fontSize: 16, fontWeight: "bold", color: "#1e293b" },
      },
      tooltip: {
        trigger: "item",
        formatter: (params: any) => {
          const sales = params.data?.sales ?? params.value;
          const percent = ((sales / pieTotal) * 100).toFixed(1);
          return `<div style="font-weight: 600; margin-bottom: 4px;">${params.name}</div>
            <div>销售额：<span style="font-weight: 600;">${sales.toLocaleString()} 元</span></div>
            <div>占比：<span style="font-weight: 600;">${percent}%</span></div>`;
        },
      },
      legend: {
        orient: "vertical",
        right: "5%",
        top: "middle",
        textStyle: { fontSize: 12, color: "#475569" },
      },
      series: [
        {
          name: "品类销售",
          type: "pie",
          radius: ["40%", "65%"],
          center: ["40%", "55%"],
          encode: { itemName: "category", value: "sales" },
          itemStyle: {
            borderColor: "#fff",
            borderWidth: 2,
            borderRadius: 4,
          },
          label: {
            show: true,
            formatter: "{b}\n{d}%",
            fontSize: 11,
            color: "#475569",
            lineHeight: 16,
          },
          labelLine: {
            length: 12,
            length2: 15,
            lineStyle: { color: "#94a3b8", width: 1 },
          },
          emphasis: {
            scale: true,
            scaleSize: 10,
            itemStyle: {
              shadowBlur: 20,
              shadowColor: "rgba(0, 0, 0, 0.3)",
            },
          },
          select: {
            itemStyle: {
              shadowBlur: 25,
              shadowColor: "rgba(0, 0, 0, 0.4)",
              borderWidth: 3,
              borderColor: "#1e293b",
            },
          },
          selectedMode: "single",
          color: morandiColors,
        },
      ],
    };

    const barOption: echarts.EChartsOption = {
      dataset: {
        source: barDatasetDataAll,
      },
      title: {
        text: "子品牌销售额排行",
        left: "center",
        top: 10,
        textStyle: { fontSize: 16, fontWeight: "bold", color: "#1e293b" },
      },
      tooltip: {
        trigger: "item",
        formatter: (params: any) => {
          const subbrand = params.name;
          const itemData = params.data;
          const valueData = params.value;
          let sales = 0;
          let category = "-";

          if (Array.isArray(valueData)) {
            const salesIdx = valueData.findIndex((v: any) => typeof v === "number");
            if (salesIdx >= 0) sales = valueData[salesIdx];
          } else if (typeof valueData === "number") {
            sales = valueData;
          } else if (typeof valueData === "object" && valueData !== null) {
            sales = valueData.sales ?? valueData.value ?? 0;
            category = valueData.category ?? category;
          }

          if (itemData && typeof itemData === "object" && itemData !== null) {
            if (sales === 0) {
              sales = itemData.sales ?? itemData.value ?? 0;
            }
            if (category === "-") {
              category = itemData.category ?? "-";
            }
          }

          if (Array.isArray(itemData)) {
            const salesIdx = itemData.findIndex((v: any) => typeof v === "number");
            if (salesIdx >= 0 && sales === 0) sales = itemData[salesIdx];
          }

          if (sales === 0 || category === "-") {
            const foundData = barDatasetDataAll.find((d) => d.subbrand === subbrand);
            if (foundData) {
              if (sales === 0) sales = foundData.sales;
              if (category === "-") category = foundData.category;
            }
          }

          const numSales = Number(sales) || 0;
          return `<div style="font-weight: 600; margin-bottom: 4px;">${subbrand}</div>
            <div>所属品类：<span style="font-weight: 600;">${category}</span></div>
            <div>销售额：<span style="font-weight: 600;">${numSales.toLocaleString()} 元</span></div>`;
        },
      },
      grid: {
        left: "3%",
        right: "4%",
        bottom: "3%",
        top: "60px",
        containLabel: true,
      },
      xAxis: {
        type: "category",
        axisLabel: { fontSize: 11, color: "#64748b", rotate: 30 },
        axisLine: { lineStyle: { color: "#cbd5e1" } },
      },
      yAxis: {
        type: "value",
        axisLabel: { fontSize: 11, color: "#64748b" },
        splitLine: { lineStyle: { color: "#e2e8f0", type: "dashed" } },
      },
      series: [
        {
          name: "子品牌销售",
          type: "bar",
          encode: { x: "subbrand", y: "sales" },
          itemStyle: {
            borderRadius: [4, 4, 0, 0],
            color: (params: any) => {
              const data = barDatasetDataAll.find((d) => d.subbrand === params.name);
              const idx = categories.indexOf(data?.category || "");
              return morandiColors[idx % morandiColors.length];
            },
          },
          emphasis: {
            itemStyle: {
              shadowBlur: 10,
              shadowColor: "rgba(0, 0, 0, 0.2)",
            },
          },
          barWidth: "50%",
        },
      ],
    };

    const lineDatasets: any[] = [{ id: "raw", source: lineDatasetData }];
    categories.forEach((cat) => {
      lineDatasets.push({
        fromDatasetId: "raw",
        transform: {
          type: "filter",
          config: {
            and: [{ dimension: "category", "=": cat }],
          },
        },
      });
    });

    const lineOption: echarts.EChartsOption = {
      dataset: lineDatasets,
      title: {
        text: "各品类日销售额趋势",
        left: "center",
        top: 10,
        textStyle: { fontSize: 16, fontWeight: "bold", color: "#1e293b" },
      },
      tooltip: {
        trigger: "axis",
        formatter: (params: any) => {
          if (!Array.isArray(params) || params.length === 0) return "";
          const date = params[0].axisValue;
          let html = `<div style="font-weight: 600; margin-bottom: 6px;">${date}</div>`;
          params.forEach((p: any) => {
            const data = p.data;
            const sales = data?.sales ?? (Array.isArray(p.value) ? p.value[2] : p.value);
            html += `<div style="display: flex; align-items: center; margin: 3px 0;">
              <span style="display: inline-block; width: 10px; height: 10px; border-radius: 50%; background: ${p.color}; margin-right: 6px;"></span>
              <span style="flex: 1;">${p.seriesName}：</span>
              <span style="font-weight: 600;">${sales.toLocaleString()} 元</span>
            </div>`;
          });
          return html;
        },
      },
      legend: {
        top: 40,
        data: categories,
        textStyle: { fontSize: 11, color: "#475569" },
      },
      grid: {
        left: "3%",
        right: "4%",
        bottom: "3%",
        top: "80px",
        containLabel: true,
      },
      xAxis: {
        type: "category",
        axisLabel: { fontSize: 11, color: "#64748b", rotate: 45 },
        axisLine: { lineStyle: { color: "#cbd5e1" } },
      },
      yAxis: {
        type: "value",
        axisLabel: { fontSize: 11, color: "#64748b" },
        splitLine: { lineStyle: { color: "#e2e8f0", type: "dashed" } },
      },
      series: categories.map((cat, idx) => ({
        name: cat,
        type: "line",
        datasetIndex: idx + 1,
        encode: { x: "date", y: "sales" },
        smooth: true,
        symbol: "circle",
        symbolSize: 6,
        lineStyle: { width: 2, color: morandiColors[idx % morandiColors.length] },
        itemStyle: { color: morandiColors[idx % morandiColors.length] },
        emphasis: { focus: "series", lineStyle: { width: 3 } },
      })),
      color: morandiColors,
    };

    pieChart.setOption(pieOption);
    barChart.setOption(barOption);
    lineChart.setOption(lineOption);

    const handleResize = () => {
      pieChart.resize();
      barChart.resize();
      lineChart.resize();
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      pieChart.dispose();
      barChart.dispose();
      lineChart.dispose();
    };
  }, [chartData, pieDatasetData, pieTotal, barDatasetDataAll, lineDatasetData, categories, morandiColors]);

  useEffect(() => {
    if (!pieInstanceRef.current) return;

    const pieChart = pieInstanceRef.current;

    const handlePieClick = (params: any) => {
      if (!params || !params.name || params.componentType !== "series") {
        setSelectedCategory(null);
        pieChart.dispatchAction({ type: "unselect", seriesIndex: 0 });
        updateBarChart(null);
        updateLineChart(null);
        return;
      }

      const clickedCategory = params.name;

      if (selectedCategory === clickedCategory) {
        setSelectedCategory(null);
        pieChart.dispatchAction({
          type: "unselect",
          seriesIndex: 0,
          name: clickedCategory,
        });
        updateBarChart(null);
        updateLineChart(null);
      } else {
        setSelectedCategory(clickedCategory);
        pieChart.dispatchAction({
          type: "select",
          seriesIndex: 0,
          name: clickedCategory,
        });
        updateBarChart(clickedCategory);
        updateLineChart(clickedCategory);
      }
    };

    const handlePieClickOutside = (e: any) => {
      if (!e.target && selectedCategory) {
        setSelectedCategory(null);
        pieChart.dispatchAction({ type: "unselect", seriesIndex: 0 });
        updateBarChart(null);
        updateLineChart(null);
      }
    };

    pieChart.on("click", handlePieClick);
    pieChart.getZr().on("click", handlePieClickOutside);

    return () => {
      pieChart.off("click", handlePieClick);
    };
  }, [selectedCategory, updateBarChart, updateLineChart]);

  const handleKPIClick = (category: string) => {
    if (!pieInstanceRef.current) return;
    pieInstanceRef.current.dispatchAction({
      type: "click",
      seriesIndex: 0,
      name: category,
    });
  };

  if (!chartData) {
    return (
      <div className="w-full flex items-center justify-center py-20">
        <div className="text-slate-500 text-lg">加载中...</div>
      </div>
    );
  }

  return (
    <div className="w-full space-y-6">
      <div className="bg-gradient-to-r from-slate-800 to-slate-900 rounded-xl p-6 shadow-lg">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xl font-bold text-white">电商销售实时监控看板</h3>
          {selectedCategory && (
            <span className="px-3 py-1 bg-blue-500 bg-opacity-30 text-blue-200 rounded-full text-sm">
              当前筛选：{selectedCategory}
            </span>
          )}
        </div>
        <div className="grid grid-cols-4 gap-4">
          {categories.map((cat, idx) => {
            const total = rawData
              .filter((d) => d.category === cat)
              .reduce((sum, d) => sum + d.sales, 0);
            const isSelected = selectedCategory === cat;
            return (
              <div
                key={cat}
                className={`p-4 rounded-lg transition-all cursor-pointer ${
                  isSelected
                    ? "bg-white bg-opacity-20 ring-2 ring-white"
                    : "bg-white bg-opacity-5 hover:bg-opacity-10"
                }`}
                onClick={() => handleKPIClick(cat)}
              >
                <div className="text-sm text-slate-300 mb-1">{cat}</div>
                <div className="text-2xl font-bold text-white">
                  ¥{total.toLocaleString()}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl shadow-md border border-slate-100 p-4">
          <div
            ref={pieChartRef}
            style={{ width: "100%", height: "380px" }}
          />
          <p className="text-xs text-slate-400 text-center mt-2">
            点击扇区筛选数据，再次点击或点击空白处恢复
          </p>
        </div>
        <div className="bg-white rounded-xl shadow-md border border-slate-100 p-4">
          <div
            ref={barChartRef}
            style={{ width: "100%", height: "380px" }}
          />
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-md border border-slate-100 p-4">
        <div
          ref={lineChartRef}
          style={{ width: "100%", height: "400px" }}
        />
      </div>
    </div>
  );
}
