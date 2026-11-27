import { NextResponse } from "next/server";
import type { ResultSetHeader, RowDataPacket } from "mysql2/promise";
import { query } from "@/lib/db";
import type {
  ApiResponse,
  CreateTagsBody,
  Tags,
} from "@/types/tags";

type TagRow = Tags & RowDataPacket;

// GET /api/tags : ดึงข้อมูลทั้งหมด
export async function GET(): Promise<NextResponse<Tags[]>> {
  const tags = await query<TagRow[]>({
    query: "SELECT * FROM tags",
  });
  return NextResponse.json(tags, { status: 200 });
}

// POST /api/tags : เพิ่มข้อมูลใหม่
export async function POST(request: Request): Promise<NextResponse<ApiResponse>> {
  const { tag_name }: CreateTagsBody = await request.json();
  const result = await query<ResultSetHeader>({
    query: "INSERT INTO tags (tag_name) VALUES (?)",
    values: [tag_name],
  });

  const success = result.affectedRows > 0;
  return NextResponse.json(
    {
      message: success ? "success" : "error",
      status: success ? 201 : 400,
      tag: { id: result.insertId, tag_name },
    },
    { status: success ? 201 : 400 }
  );
}