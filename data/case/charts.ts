export interface MonthlyBusinessData {
  months: string[];
  salesData: number[];
  profitRateData: number[];
}

export interface QuarterlySalesData {
  quarters: string[];
  electronicsData: number[];
  householdData: number[];
  clothingData: number[];
  foodData: number[];
}

export interface CategorySalesRoseData {
  categories: string[];
  salesData: number[];
  morandiColors: string[];
}

export interface SalesDashboardData {
  categories: string[];
  subbrands: Record<string, string[]>;
  morandiColors: string[];
  salesData: Array<{
    category: string;
    subbrand: string;
    date: string;
    sales: number;
  }>;
}

export interface ProvinceSalesData {
  name: string;
  value: number;
}

export interface CityBubbleData {
  name: string;
  sales: number;
  growth: number;
}

export interface MapDrillDownData {
  nationalData: ProvinceSalesData[];
  provinceCityData: Record<string, CityBubbleData[]>;
}

export const monthlyBusinessData: MonthlyBusinessData = {
  months: [
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
  ],
  salesData: [
    120.5, 132.8, 101.2, 134.9, 190.3, 230.6, 210.7, 182.4, 191.8, 234.5, 290.2,
    330.9,
  ],
  profitRateData: [
    12.3, 13.5, 11.2, 14.8, 16.2, 18.5, 17.3, 15.9, 16.8, 18.2, 20.5, 22.3,
  ],
};

export const quarterlySalesData: QuarterlySalesData = {
  quarters: ["Q1", "Q2", "Q3", "Q4"],
  electronicsData: [320, 450, 380, 520],
  householdData: [280, 320, 400, 450],
  clothingData: [420, 380, 450, 500],
  foodData: [350, 400, 480, 550],
};

export const categorySalesRoseData: CategorySalesRoseData = {
  categories: [
    "数码电子",
    "美妆护肤",
    "服饰鞋包",
    "食品饮料",
    "家居生活",
    "运动户外",
  ],
  salesData: [7500, 5200, 4800, 3500, 2200, 1800],
  morandiColors: [
    "#8E9AAF",
    "#B8A9C9",
    "#DEB8A0",
    "#A3B18A",
    "#9CB4CC",
    "#C9ADA7",
  ],
};

function generateSalesDashboardData(): SalesDashboardData["salesData"] {
  const categories = ["服装", "数码", "食品", "美妆"];
  const subbrands: Record<string, string[]> = {
    服装: ["云裳", "锦衣", "华服"],
    数码: ["极客", "智联", "未来"],
    食品: ["鲜滋", "美味", "优粮"],
    美妆: ["焕颜", "纯美", "丽质"],
  };
  const data: SalesDashboardData["salesData"] = [];
  const startDate = new Date("2024-07-01");

  for (let day = 0; day < 15; day++) {
    const date = new Date(startDate);
    date.setDate(date.getDate() + day);
    const dateStr = date.toISOString().split("T")[0];

    for (const category of categories) {
      for (const subbrand of subbrands[category]) {
        const baseSales = category === "数码" ? 800 : category === "服装" ? 600 : category === "美妆" ? 500 : 400;
        const subbrandFactor = subbrands[category].indexOf(subbrand) * 0.3 + 0.8;
        const dayFactor = 1 + Math.sin(day * 0.5) * 0.3;
        const randomFactor = 0.7 + Math.random() * 0.6;
        const sales = Math.round(baseSales * subbrandFactor * dayFactor * randomFactor);

        data.push({
          category,
          subbrand,
          date: dateStr,
          sales,
        });
      }
    }
  }

  return data;
}

export const salesDashboardData: SalesDashboardData = {
  categories: ["服装", "数码", "食品", "美妆"],
  subbrands: {
    服装: ["云裳", "锦衣", "华服"],
    数码: ["极客", "智联", "未来"],
    食品: ["鲜滋", "美味", "优粮"],
    美妆: ["焕颜", "纯美", "丽质"],
  },
  morandiColors: ["#8E9AAF", "#B8A9C9", "#DEB8A0", "#A3B18A", "#9CB4CC", "#C9ADA7"],
  salesData: generateSalesDashboardData(),
};

export const mapDrillDownData: MapDrillDownData = {
  nationalData: [
    { name: "北京市", value: 1800 },
    { name: "天津市", value: 1200 },
    { name: "河北省", value: 2100 },
    { name: "山西省", value: 1500 },
    { name: "内蒙古自治区", value: 900 },
    { name: "辽宁省", value: 1600 },
    { name: "吉林省", value: 1100 },
    { name: "黑龙江省", value: 1300 },
    { name: "上海市", value: 2500 },
    { name: "江苏省", value: 3200 },
    { name: "浙江省", value: 2900 },
    { name: "安徽省", value: 1800 },
    { name: "福建省", value: 2200 },
    { name: "江西省", value: 1400 },
    { name: "山东省", value: 2700 },
    { name: "河南省", value: 2400 },
    { name: "湖北省", value: 2000 },
    { name: "湖南省", value: 1900 },
    { name: "广东省", value: 3800 },
    { name: "广西壮族自治区", value: 1300 },
    { name: "海南省", value: 800 },
    { name: "重庆市", value: 1600 },
    { name: "四川省", value: 2300 },
    { name: "贵州省", value: 1000 },
    { name: "云南省", value: 1200 },
    { name: "西藏自治区", value: 400 },
    { name: "陕西省", value: 1700 },
    { name: "甘肃省", value: 900 },
    { name: "青海省", value: 500 },
    { name: "宁夏回族自治区", value: 600 },
    { name: "新疆维吾尔自治区", value: 700 },
    { name: "台湾省", value: 1500 },
    { name: "香港特别行政区", value: 1100 },
    { name: "澳门特别行政区", value: 300 },
  ],
  provinceCityData: {
    "广东省": [
      { name: "广州市", sales: 1200, growth: 12.5 },
      { name: "深圳市", sales: 1000, growth: 8.3 },
      { name: "东莞市", sales: 600, growth: -2.1 },
      { name: "佛山市", sales: 500, growth: 5.7 },
      { name: "惠州市", sales: 350, growth: 3.2 },
      { name: "珠海市", sales: 300, growth: 7.8 },
      { name: "中山市", sales: 280, growth: -1.5 },
      { name: "汕头市", sales: 220, growth: 2.1 },
      { name: "江门市", sales: 180, growth: 4.5 },
      { name: "湛江市", sales: 150, growth: 1.8 },
    ],
    "浙江省": [
      { name: "杭州市", sales: 900, growth: 15.2 },
      { name: "宁波市", sales: 650, growth: 9.8 },
      { name: "温州市", sales: 450, growth: 3.5 },
      { name: "绍兴市", sales: 320, growth: 6.7 },
      { name: "嘉兴市", sales: 280, growth: -0.8 },
      { name: "金华市", sales: 250, growth: 4.2 },
      { name: "台州市", sales: 220, growth: 2.9 },
      { name: "湖州市", sales: 180, growth: 5.1 },
      { name: "丽水市", sales: 120, growth: 1.5 },
      { name: "衢州市", sales: 100, growth: 3.8 },
    ],
    "江苏省": [
      { name: "苏州市", sales: 950, growth: 11.2 },
      { name: "南京市", sales: 800, growth: 8.7 },
      { name: "无锡市", sales: 550, growth: 4.3 },
      { name: "南通市", sales: 420, growth: 6.5 },
      { name: "常州市", sales: 380, growth: -1.2 },
      { name: "徐州市", sales: 320, growth: 2.8 },
      { name: "盐城市", sales: 250, growth: 3.5 },
      { name: "扬州市", sales: 220, growth: 5.1 },
      { name: "镇江市", sales: 180, growth: 1.9 },
      { name: "泰州市", sales: 150, growth: 4.2 },
    ],
  },
};
