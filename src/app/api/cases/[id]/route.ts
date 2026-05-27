import { NextResponse } from "next/server";
import { getCaseById } from "@/lib/caseStore";
import type { ApiResponse, CaseItem } from "@/types/case";

export const dynamic = "force-dynamic";

export async function GET(
  _request: Request,
  { params }: { params: { id: string } }
) {
  const item = getCaseById(params.id);
  if (!item) {
    const response: ApiResponse<null> = {
      code: 404,
      message: "案例不存在",
      data: null,
    };
    return NextResponse.json(response, { status: 404 });
  }
  const response: ApiResponse<CaseItem> = {
    code: 0,
    message: "ok",
    data: item,
  };
  return NextResponse.json(response);
}
