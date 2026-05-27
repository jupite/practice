import { NextResponse } from "next/server";
import { listCases, createCase } from "@/lib/caseStore";
import type { ApiResponse, CaseItem } from "@/types/case";

export const dynamic = "force-dynamic";

export async function GET() {
  const data = listCases();
  const response: ApiResponse<typeof data> = {
    code: 0,
    message: "ok",
    data,
  };
  return NextResponse.json(response);
}

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as Omit<
      CaseItem,
      "id" | "publishedAt" | "stats"
    > &
      Partial<Pick<CaseItem, "id" | "publishedAt" | "stats">>;

    if (!body.title || !body.summary || !body.description || !body.cover || !body.author) {
      const response: ApiResponse<null> = {
        code: 400,
        message: "缺少必要字段",
        data: null,
      };
      return NextResponse.json(response, { status: 400 });
    }

    const item = createCase(body);
    const response: ApiResponse<CaseItem> = {
      code: 0,
      message: "created",
      data: item,
    };
    return NextResponse.json(response, { status: 201 });
  } catch (err) {
    const response: ApiResponse<null> = {
      code: 500,
      message: "服务器错误",
      data: null,
    };
    return NextResponse.json(response, { status: 500 });
  }
}
