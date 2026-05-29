"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import * as echarts from "echarts";
import type { MapDrillDownData, CityBubbleData } from "@/types/case";

interface MapDrillDownProps {
  data: MapDrillDownData;
}

const MapDrillDown = ({ data }: MapDrillDownProps) => {
  const chartRef = useRef<HTMLDivElement>(null);
  const chartInstanceRef = useRef<echarts.ECharts | null>(null);
  const [currentLevel, setCurrentLevel] = useState<"national" | "province">("national");
  const [currentProvince, setCurrentProvince] = useState<string>("");
  const mapJsonCacheRef = useRef<Record<string, any>>({});

  const loadMapJson = async (mapName: string): Promise<any> => {
    if (mapJsonCacheRef.current[mapName]) {
      return mapJsonCacheRef.current[mapName];
    }

    const mapUrls: Record<string, string> = {
      china: "https://geo.datav.aliyun.com/areas_v3/bound/100000_full.json",
      广东省: "https://geo.datav.aliyun.com/areas_v3/bound/440000_full.json",
      浙江省: "https://geo.datav.aliyun.com/areas_v3/bound/330000_full.json",
      江苏省: "https://geo.datav.aliyun.com/areas_v3/bound/320000_full.json",
    };

    const url = mapUrls[mapName] || mapUrls.china;

    try {
      const response = await fetch(url);
      const json = await response.json();
      mapJsonCacheRef.current[mapName] = json;
      return json;
    } catch (error) {
      console.error("Failed to load map data:", error);
      return null;
    }
  };

  const getCityCoordinates = (provinceName: string, cities: CityBubbleData[]) => {
    const cityCoords: Record<string, Record<string, [number, number]>> = {
      "广东省": {
        "广州市": [113.2644, 23.1291],
        "深圳市": [114.0579, 22.5431],
        "东莞市": [113.7518, 23.0207],
        "佛山市": [113.1227, 23.0218],
        "惠州市": [114.4126, 23.0794],
        "珠海市": [113.5767, 22.2707],
        "中山市": [113.3928, 22.5177],
        "汕头市": [116.6819, 23.3541],
        "江门市": [113.0949, 22.5904],
        "湛江市": [110.3594, 21.2707],
      },
      "浙江省": {
        "杭州市": [120.1551, 30.2741],
        "宁波市": [121.5498, 29.8683],
        "温州市": [120.6994, 27.9939],
        "绍兴市": [120.5861, 30.0309],
        "嘉兴市": [120.7551, 30.7466],
        "金华市": [119.6483, 29.0777],
        "台州市": [121.4286, 28.6564],
        "湖州市": [120.0886, 30.8944],
        "丽水市": [119.9215, 28.4517],
        "衢州市": [118.8703, 28.9703],
      },
      "江苏省": {
        "苏州市": [120.5853, 31.2989],
        "南京市": [118.7969, 32.0603],
        "无锡市": [120.3119, 31.4912],
        "南通市": [120.8645, 32.0162],
        "常州市": [119.9741, 31.8112],
        "徐州市": [117.1848, 34.2618],
        "盐城市": [120.1622, 33.3777],
        "扬州市": [119.4212, 32.3931],
        "镇江市": [119.4528, 32.2049],
        "泰州市": [119.9151, 32.4848],
      },
    };

    return cities
      .map((city) => {
        const coords = cityCoords[provinceName]?.[city.name];
        if (coords) {
          return {
            name: city.name,
            value: [...coords, city.sales, city.growth],
          };
        }
        return null;
      })
      .filter(Boolean);
  };

  const initNationalMap = useCallback(async () => {
    if (!chartInstanceRef.current) return;

    const chinaJson = await loadMapJson("china");
    if (!chinaJson) return;

    echarts.registerMap("china", chinaJson);

    const option: echarts.EChartsOption = {
      title: {
        text: "全国各省销售额分布",
        subtext: "点击省份可查看城市详情",
        left: "center",
        textStyle: {
          fontSize: 18,
          fontWeight: "bold",
          color: "#333",
        },
      },
      tooltip: {
        trigger: "item",
        formatter: (params: any) => {
          if (params.seriesType === "map") {
            return `${params.name}<br/>销售额: ${params.value || 0} 万元`;
          }
          return "";
        },
      },
      visualMap: {
        min: 0,
        max: 4000,
        left: "left",
        top: "bottom",
        text: ["高", "低"],
        calculable: true,
        inRange: {
          color: ["#e0f3f8", "#abd9e9", "#74add1", "#4575b4", "#313695"],
        },
      },
      geo: {
        map: "china",
        roam: true,
        zoom: 1.2,
        label: {
          show: true,
          fontSize: 10,
          color: "#333",
        },
        itemStyle: {
          areaColor: "#f5f5f5",
          borderColor: "#999",
        },
        emphasis: {
          itemStyle: {
            areaColor: "#ffd700",
          },
          label: {
            show: true,
            color: "#333",
          },
        },
      },
      series: [
        {
          name: "销售额",
          type: "map",
          map: "china",
          geoIndex: 0,
          data: data.nationalData.map((item) => ({
            name: item.name.replace("省", "").replace("自治区", "").replace("市", "").replace("特别行政区", "").replace("壮族", "").replace("维吾尔", "").replace("回族", ""),
            value: item.value,
          })),
        },
      ],
    };

    chartInstanceRef.current.setOption(option, true);
  }, [data.nationalData]);

  const initProvinceMap = useCallback(
    async (provinceName: string) => {
      if (!chartInstanceRef.current) return;

      const provinceJson = await loadMapJson(provinceName);
      if (!provinceJson) {
        alert("该省份地图数据暂不可用");
        setCurrentLevel("national");
        setCurrentProvince("");
        return;
      }

      echarts.registerMap(provinceName, provinceJson);

      const cityData = data.provinceCityData[provinceName] || [];
      const bubbleData = getCityCoordinates(provinceName, cityData);

      const maxSales = Math.max(...cityData.map((c) => c.sales), 1);

      const option: echarts.EChartsOption = {
        title: {
          text: `${provinceName}城市销售额分布`,
          subtext: "点击返回全国地图",
          left: "center",
          textStyle: {
            fontSize: 18,
            fontWeight: "bold",
            color: "#333",
          },
        },
        tooltip: {
          trigger: "item",
          formatter: (params: any) => {
            if (params.seriesType === "scatter") {
              const growth = params.value[3];
              const growthColor = growth >= 0 ? "#2ecc71" : "#e74c3c";
              const growthText = growth >= 0 ? `+${growth}%` : `${growth}%`;
              return `
                <div style="padding: 8px;">
                  <div style="font-weight: bold; margin-bottom: 4px;">${params.name}</div>
                  <div>销售额: ${params.value[2]} 万元</div>
                  <div style="color: ${growthColor};">增长率: ${growthText}</div>
                </div>
              `;
            }
            return params.name;
          },
        },
        visualMap: {
          show: false,
          min: -20,
          max: 20,
          inRange: {
            color: ["#e74c3c", "#f39c12", "#2ecc71"],
          },
        },
        geo: {
          map: provinceName,
          roam: true,
          zoom: 1.2,
          label: {
            show: true,
            fontSize: 10,
            color: "#333",
          },
          itemStyle: {
            areaColor: "#f5f5f5",
            borderColor: "#999",
          },
          emphasis: {
            itemStyle: {
              areaColor: "#ffd700",
            },
            label: {
              show: true,
              color: "#333",
            },
          },
        },
        series: [
          {
            name: "城市销售额",
            type: "scatter",
            coordinateSystem: "geo",
            data: bubbleData,
            symbolSize: (val: any) => {
              return Math.max(10, (val[2] / maxSales) * 50);
            },
            itemStyle: {
              color: (params: any) => {
                const growth = params.value[3];
                if (growth >= 10) return "#27ae60";
                if (growth >= 0) return "#2ecc71";
                if (growth >= -5) return "#e67e22";
                return "#e74c3c";
              },
              shadowBlur: 10,
              shadowColor: "rgba(0, 0, 0, 0.3)",
            },
            label: {
              show: true,
              formatter: "{b}",
              position: "right",
              fontSize: 10,
              color: "#333",
            },
            emphasis: {
              itemStyle: {
                shadowBlur: 20,
                shadowColor: "rgba(0, 0, 0, 0.5)",
              },
              label: {
                show: true,
                fontSize: 12,
                fontWeight: "bold",
              },
            },
          },
        ],
      };

      chartInstanceRef.current.setOption(option, true);
    },
    [data.provinceCityData]
  );

  const handleClick = useCallback(
    (params: any) => {
      if (params.componentType === "title") {
        setCurrentLevel("national");
        setCurrentProvince("");
        return;
      }

      if (currentLevel === "national" && params.seriesType === "map") {
        const provinceName = data.nationalData.find(
          (item) =>
            item.name.includes(params.name) ||
            params.name.includes(item.name.replace("省", "").replace("自治区", "").replace("市", ""))
        )?.name;

        if (provinceName && data.provinceCityData[provinceName]) {
          setCurrentLevel("province");
          setCurrentProvince(provinceName);
        }
      }
    },
    [currentLevel, data]
  );

  useEffect(() => {
    if (!chartRef.current) return;

    chartInstanceRef.current = echarts.init(chartRef.current);

    const handleResize = () => {
      chartInstanceRef.current?.resize();
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      chartInstanceRef.current?.dispose();
    };
  }, []);

  useEffect(() => {
    if (!chartInstanceRef.current) return;

    chartInstanceRef.current.on("click", handleClick);

    return () => {
      chartInstanceRef.current?.off("click", handleClick);
    };
  }, [handleClick]);

  useEffect(() => {
    if (currentLevel === "national") {
      initNationalMap();
    } else if (currentLevel === "province" && currentProvince) {
      initProvinceMap(currentProvince);
    }
  }, [currentLevel, currentProvince, initNationalMap, initProvinceMap]);

  return (
    <div className="relative">
      <div
        ref={chartRef}
        style={{ width: "100%", height: "600px" }}
        className="bg-white rounded-lg shadow-md"
      />
      {currentLevel === "province" && (
        <button
          onClick={() => {
            setCurrentLevel("national");
            setCurrentProvince("");
          }}
          className="absolute top-4 left-4 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors shadow-md"
        >
          ← 返回全国
        </button>
      )}
      <div className="mt-4 p-4 bg-gray-50 rounded-lg">
        <h4 className="font-semibold text-gray-700 mb-2">图例说明</h4>
        <div className="flex flex-wrap gap-4 text-sm">
          <div className="flex items-center gap-2">
            <span className="w-4 h-4 rounded-full bg-green-500"></span>
            <span>高增长 (≥10%)</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-4 h-4 rounded-full bg-green-400"></span>
            <span>正增长 (0-10%)</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-4 h-4 rounded-full bg-orange-500"></span>
            <span>轻微负增长 (-5-0%)</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-4 h-4 rounded-full bg-red-500"></span>
            <span>负增长 (&lt;-5%)</span>
          </div>
          <div className="flex items-center gap-2">
            <span>气泡大小</span>
            <span>→ 销售额高低</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MapDrillDown;
