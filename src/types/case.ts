interface Chapter {
  slug: string;
  title: string;
  content: string;
}

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

export type ChartDataType =
  | "monthly-business"
  | "quarterly-sales"
  | "category-sales-rose"
  | "sales-dashboard";

export interface CaseItem {
  id: string;
  title: string;
  summary: string;
  description: string;
  cover: string;
  tags: string[];
  author: string;
  publishedAt: string;
  stats: {
    views: number;
    likes: number;
  };
  chartType?: string;
  chapters?: Chapter[];
}

export interface ApiResponse<T> {
  code: number;
  message: string;
  data: T;
}
