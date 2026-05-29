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
