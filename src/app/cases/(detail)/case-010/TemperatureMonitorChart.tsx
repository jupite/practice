"use client";

import { useEffect, useRef, useState } from "react";
import * as echarts from "echarts";

interface TemperatureData {
  time: string;
  value: number;
  isAbnormal: boolean;
  abnormalType?: "high" | "low";
}

const UPPER_THRESHOLD = 28;
const LOWER_THRESHOLD = 22;
const MAX_DATA_POINTS = 60;

function generateTemperature(): TemperatureData {
  const now = new Date();
  const time = now.toTimeString().slice(0, 8);

  const isAbnormal = Math.random() < 0.2;
  let value: number;

  if (isAbnormal) {
    const isHigh = Math.random() > 0.5;
    if (isHigh) {
      value = Number((28 + Math.random() * 2).toFixed(1));
      return { time, value, isAbnormal: true, abnormalType: "high" };
    } else {
      value = Number((20 + Math.random() * 2).toFixed(1));
      return { time, value, isAbnormal: true, abnormalType: "low" };
    }
  } else {
    value = Number((22 + Math.random() * 6).toFixed(1));
    return { time, value, isAbnormal: false };
  }
}

export default function TemperatureMonitorChart() {
  const chartRef = useRef<HTMLDivElement>(null);
  const chartInstanceRef = useRef<echarts.ECharts | null>(null);
  const dataRef = useRef<TemperatureData[]>([]);
  const upperAlertRef = useRef(false);
  const lowerAlertRef = useRef(false);
  const upperBlinkIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const lowerBlinkIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const dataBlinkIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const [currentTemp, setCurrentTemp] = useState<number | null>(null);
  const [alertStatus, setAlertStatus] = useState<"normal" | "high" | "low">("normal");

  useEffect(() => {
    if (!chartRef.current) return;

    const chart = echarts.init(chartRef.current);
    chartInstanceRef.current = chart;

    const option: echarts.EChartsOption = {
      title: {
        text: "实时温度监控",
        left: "center",
        top: 10,
        textStyle: { fontSize: 18, fontWeight: "bold", color: "#1e293b" },
      },
      tooltip: {
        trigger: "axis",
        formatter: (params: any) => {
          if (!Array.isArray(params) || params.length === 0) return "";
          const data = params[0];
          const temp = data.value;
          const time = data.axisValue;
          let status = "正常";
          let statusColor = "#10b981";
          if (temp > UPPER_THRESHOLD) {
            status = "高温告警";
            statusColor = "#ef4444";
          } else if (temp < LOWER_THRESHOLD) {
            status = "低温告警";
            statusColor = "#3b82f6";
          }
          return `<div style="font-weight: 600; margin-bottom: 4px;">${time}</div>
            <div>温度：<span style="font-weight: 600;">${temp}°C</span></div>
            <div>状态：<span style="font-weight: 600; color: ${statusColor};">${status}</span></div>`;
        },
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
        boundaryGap: false,
        data: [],
        axisLabel: { fontSize: 10, color: "#64748b", rotate: 45 },
        axisLine: { lineStyle: { color: "#cbd5e1" } },
      },
      yAxis: {
        type: "value",
        min: 18,
        max: 32,
        axisLabel: {
          fontSize: 11,
          color: "#64748b",
          formatter: "{value}°C",
        },
        splitLine: { lineStyle: { color: "#e2e8f0", type: "dashed" } },
      },
      series: [
        {
          name: "温度",
          type: "line",
          smooth: true,
          symbol: "circle",
          symbolSize: 8,
          data: [],
          lineStyle: { width: 2, color: "#10b981" },
          itemStyle: { color: "#10b981" },
          areaStyle: {
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
              { offset: 0, color: "rgba(16, 185, 129, 0.3)" },
              { offset: 1, color: "rgba(16, 185, 129, 0.05)" },
            ]),
          },
          markLine: {
            silent: true,
            symbol: "none",
            lineStyle: { type: "dashed", width: 2 },
            label: {
              formatter: "{b}: {c}°C",
              fontSize: 12,
              fontWeight: "bold",
            },
            data: [
              {
                name: "上限",
                yAxis: UPPER_THRESHOLD,
                lineStyle: { color: "#ef4444" },
                label: { color: "#ef4444" },
              },
              {
                name: "下限",
                yAxis: LOWER_THRESHOLD,
                lineStyle: { color: "#3b82f6" },
                label: { color: "#3b82f6" },
              },
            ],
          },
        },
      ],
    };

    chart.setOption(option);

    const handleResize = () => chart.resize();
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      chart.dispose();
    };
  }, []);

  const updateChart = () => {
    if (!chartInstanceRef.current) return;

    const newData = generateTemperature();
    dataRef.current.push(newData);

    if (dataRef.current.length > MAX_DATA_POINTS) {
      dataRef.current.shift();
    }

    setCurrentTemp(newData.value);

    const times = dataRef.current.map((d) => d.time);
    const values = dataRef.current.map((d) => d.value);

    const latestData = dataRef.current[dataRef.current.length - 1];
    const isUpperAlert = latestData.value > UPPER_THRESHOLD;
    const isLowerAlert = latestData.value < LOWER_THRESHOLD;

    if (isUpperAlert) {
      setAlertStatus("high");
    } else if (isLowerAlert) {
      setAlertStatus("low");
    } else {
      setAlertStatus("normal");
    }

    if (isUpperAlert !== upperAlertRef.current) {
      upperAlertRef.current = isUpperAlert;
      if (upperBlinkIntervalRef.current) {
        clearInterval(upperBlinkIntervalRef.current);
        upperBlinkIntervalRef.current = null;
      }
      if (isUpperAlert) {
        let upperVisible = true;
        upperBlinkIntervalRef.current = setInterval(() => {
          upperVisible = !upperVisible;
          if (chartInstanceRef.current) {
            chartInstanceRef.current.setOption({
              series: [
                {
                  markLine: {
                    data: [
                      {
                        name: "上限",
                        yAxis: UPPER_THRESHOLD,
                        lineStyle: {
                          color: upperVisible ? "#ff0000" : "transparent",
                          width: upperVisible ? 4 : 2,
                          type: "dashed",
                          shadowBlur: upperVisible ? 20 : 0,
                          shadowColor: "#ff0000",
                        },
                        label: {
                          color: upperVisible ? "#ff0000" : "transparent",
                          fontWeight: "bold",
                          fontSize: 14,
                        },
                      },
                      {
                        name: "下限",
                        yAxis: LOWER_THRESHOLD,
                        lineStyle: { color: lowerAlertRef.current ? (lowerBlinkIntervalRef.current ? "#0066ff" : "#3b82f6") : "#3b82f6", type: "dashed" },
                        label: { color: "#3b82f6" },
                      },
                    ],
                  },
                },
              ],
            });
          }
        }, 500);
      }
    }

    if (isLowerAlert !== lowerAlertRef.current) {
      lowerAlertRef.current = isLowerAlert;
      if (lowerBlinkIntervalRef.current) {
        clearInterval(lowerBlinkIntervalRef.current);
        lowerBlinkIntervalRef.current = null;
      }
      if (isLowerAlert) {
        let lowerVisible = true;
        lowerBlinkIntervalRef.current = setInterval(() => {
          lowerVisible = !lowerVisible;
          if (chartInstanceRef.current) {
            chartInstanceRef.current.setOption({
              series: [
                {
                  markLine: {
                    data: [
                      {
                        name: "上限",
                        yAxis: UPPER_THRESHOLD,
                        lineStyle: { color: upperAlertRef.current ? (upperBlinkIntervalRef.current ? "#ff0000" : "#ef4444") : "#ef4444", type: "dashed" },
                        label: { color: "#ef4444" },
                      },
                      {
                        name: "下限",
                        yAxis: LOWER_THRESHOLD,
                        lineStyle: {
                          color: lowerVisible ? "#0066ff" : "transparent",
                          width: lowerVisible ? 4 : 2,
                          type: "dashed",
                          shadowBlur: lowerVisible ? 20 : 0,
                          shadowColor: "#0066ff",
                        },
                        label: {
                          color: lowerVisible ? "#0066ff" : "transparent",
                          fontWeight: "bold",
                          fontSize: 14,
                        },
                      },
                    ],
                  },
                },
              ],
            });
          }
        }, 500);
      }
    }

    if (!isUpperAlert && !isLowerAlert) {
      if (upperBlinkIntervalRef.current) {
        clearInterval(upperBlinkIntervalRef.current);
        upperBlinkIntervalRef.current = null;
      }
      if (lowerBlinkIntervalRef.current) {
        clearInterval(lowerBlinkIntervalRef.current);
        lowerBlinkIntervalRef.current = null;
      }
    }

    if (dataBlinkIntervalRef.current) {
      clearInterval(dataBlinkIntervalRef.current);
      dataBlinkIntervalRef.current = null;
    }

    if (latestData.isAbnormal) {
      let pointVisible = true;
      dataBlinkIntervalRef.current = setInterval(() => {
        pointVisible = !pointVisible;
        if (chartInstanceRef.current && dataRef.current.length > 0) {
          const abnormalColor = latestData.abnormalType === "high" ? "#ff0000" : "#0066ff";
          const seriesData = dataRef.current.map((d, idx) => {
            if (idx === dataRef.current.length - 1 && d.isAbnormal) {
              return {
                value: d.value,
                symbol: "circle",
                symbolSize: pointVisible ? 16 : 8,
                itemStyle: {
                  color: pointVisible ? abnormalColor : "#10b981",
                  shadowBlur: pointVisible ? 20 : 0,
                  shadowColor: abnormalColor,
                },
              };
            }
            return d.value;
          });

          chartInstanceRef.current.setOption({
            series: [{ data: seriesData }],
          });
        }
      }, 300);
    }

    const seriesData = values.map((v, idx) => {
      if (idx === values.length - 1 && latestData.isAbnormal) {
        const abnormalColor = latestData.abnormalType === "high" ? "#ff0000" : "#0066ff";
        return {
          value: v,
          symbol: "circle",
          symbolSize: 14,
          itemStyle: {
            color: abnormalColor,
            shadowBlur: 15,
            shadowColor: abnormalColor,
          },
        };
      }
      return v;
    });

    chartInstanceRef.current.setOption({
      xAxis: { data: times },
      series: [
        {
          data: seriesData,
          markLine: {
            data: [
              {
                name: "上限",
                yAxis: UPPER_THRESHOLD,
                lineStyle: {
                  color: isUpperAlert ? "#ff0000" : "#ef4444",
                  width: isUpperAlert ? 3 : 2,
                  type: "dashed",
                  shadowBlur: isUpperAlert ? 15 : 0,
                  shadowColor: "#ff0000",
                },
                label: {
                  color: isUpperAlert ? "#ff0000" : "#ef4444",
                  fontWeight: isUpperAlert ? "bold" : "normal",
                  fontSize: isUpperAlert ? 13 : 12,
                },
              },
              {
                name: "下限",
                yAxis: LOWER_THRESHOLD,
                lineStyle: {
                  color: isLowerAlert ? "#0066ff" : "#3b82f6",
                  width: isLowerAlert ? 3 : 2,
                  type: "dashed",
                  shadowBlur: isLowerAlert ? 15 : 0,
                  shadowColor: "#0066ff",
                },
                label: {
                  color: isLowerAlert ? "#0066ff" : "#3b82f6",
                  fontWeight: isLowerAlert ? "bold" : "normal",
                  fontSize: isLowerAlert ? 13 : 12,
                },
              },
            ],
          },
        },
      ],
    });
  };

  useEffect(() => {
    const interval = setInterval(updateChart, 1000);
    return () => {
      clearInterval(interval);
      if (upperBlinkIntervalRef.current) clearInterval(upperBlinkIntervalRef.current);
      if (lowerBlinkIntervalRef.current) clearInterval(lowerBlinkIntervalRef.current);
      if (dataBlinkIntervalRef.current) clearInterval(dataBlinkIntervalRef.current);
    };
  }, []);

  const getStatusColor = () => {
    switch (alertStatus) {
      case "high":
        return "text-red-500";
      case "low":
        return "text-blue-500";
      default:
        return "text-green-500";
    }
  };

  const getStatusBg = () => {
    switch (alertStatus) {
      case "high":
        return "bg-red-50 border-red-200";
      case "low":
        return "bg-blue-50 border-blue-200";
      default:
        return "bg-green-50 border-green-200";
    }
  };

  const getStatusText = () => {
    switch (alertStatus) {
      case "high":
        return "高温告警";
      case "low":
        return "低温告警";
      default:
        return "正常";
    }
  };

  return (
    <div className="w-full space-y-4">
      <div className="grid grid-cols-3 gap-4">
        <div className={`p-4 rounded-lg border ${getStatusBg()}`}>
          <div className="text-sm text-slate-500 mb-1">当前温度</div>
          <div className={`text-3xl font-bold ${getStatusColor()}`}>
            {currentTemp !== null ? `${currentTemp}°C` : "--"}
          </div>
        </div>
        <div className={`p-4 rounded-lg border ${getStatusBg()}`}>
          <div className="text-sm text-slate-500 mb-1">监控状态</div>
          <div className={`text-3xl font-bold ${getStatusColor()}`}>
            {getStatusText()}
          </div>
        </div>
        <div className="p-4 rounded-lg border bg-slate-50 border-slate-200">
          <div className="text-sm text-slate-500 mb-1">数据点数</div>
          <div className="text-3xl font-bold text-slate-700">
            {dataRef.current.length} / {MAX_DATA_POINTS}
          </div>
        </div>
      </div>
      <div className="bg-white rounded-xl shadow-md border border-slate-100 p-4">
        <div ref={chartRef} style={{ width: "100%", height: "450px" }} />
        <div className="flex items-center justify-center gap-6 mt-4 text-sm text-slate-500">
          <div className="flex items-center gap-2">
            <span className="w-4 h-0.5 bg-red-500" style={{ borderStyle: "dashed" }}></span>
            <span>上限阈值 28°C</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-4 h-0.5 bg-blue-500" style={{ borderStyle: "dashed" }}></span>
            <span>下限阈值 22°C</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-green-500"></span>
            <span>正常温度</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-red-500 animate-pulse"></span>
            <span>高温异常点</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-blue-500 animate-pulse"></span>
            <span>低温异常点</span>
          </div>
        </div>
      </div>
    </div>
  );
}
