import { NextResponse } from "next/server";
import {
  monthlyBusinessData,
  quarterlySalesData,
  categorySalesRoseData,
  salesDashboardData,
  mapDrillDownData,
} from "../../../../../data/case";
import type {
  ApiResponse,
  MonthlyBusinessData,
  QuarterlySalesData,
  CategorySalesRoseData,
  SalesDashboardData,
  MapDrillDownData,
  ChartDataType,
} from "@/types/case";

export const dynamic = "force-dynamic";

type ChartDataResponse =
  | MonthlyBusinessData
  | QuarterlySalesData
  | CategorySalesRoseData
  | SalesDashboardData
  | MapDrillDownData;

const chartDataMap: Record<ChartDataType, ChartDataResponse> = {
  "monthly-business": monthlyBusinessData,
  "quarterly-sales": quarterlySalesData,
  "category-sales-rose": categorySalesRoseData,
  "sales-dashboard": salesDashboardData,
  "map-drilldown": mapDrillDownData,
};

export async function GET(
  _request: Request,
  { params }: { params: { type: string } }
) {
  const chartType = params.type as ChartDataType;
  const data = chartDataMap[chartType];

  if (!data) {
    const response: ApiResponse<null> = {
      code: 404,
      message: "图表数据不存在",
      data: null,
    };
    return NextResponse.json(response, { status: 404 });
  }

  const response: ApiResponse<typeof data> = {
    code: 0,
    message: "ok",
    data,
  };
  return NextResponse.json(response);
}
