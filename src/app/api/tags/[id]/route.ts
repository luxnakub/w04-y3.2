import { NextResponse } from "next/server";
import type { ResultSetHeader, RowDataPacket } from "mysql2/promise";
import { query } from "@/lib/db";
import type {
  ApiResponse,
  UpdateTagsBody,
  Tags,
} from "@/types/tags";

type TagRow = Tags & RowDataPacket;
type RouteContext = { params: Promise<{ id: string }> };

// GET /api/tags/[id] : ดึงข้อมูลตาม id
export async function GET(
  request: Request,
  { params }: RouteContext
): Promise<NextResponse<Tags[]>> {
  const { id } = await params;
  const tags = await query<TagRow[]>({
    query: "SELECT * FROM tags WHERE id = ?",
    values: [id],
  });
  return NextResponse.json(tags, { status: 200 });
}

// PUT /api/tags/[id] : แก้ไขข้อมูลตาม id
export async function PUT(
  request: Request,
  { params }: RouteContext
): Promise<NextResponse<ApiResponse>> {
  const { id } = await params;
  const { tag_name }: UpdateTagsBody = await request.json();

  const result = await query<ResultSetHeader>({
    query: "UPDATE tags SET tag_name = ? WHERE id = ?",
    values: [tag_name, id],
  });

  const success = result.affectedRows > 0;
  return NextResponse.json(
    {
      message: success ? "success" : "error",
      status: success ? 200 : 404,
      tag: { id, tag_name },
    },
    { status: success ? 200 : 404 }
  );
}

// DELETE /api/tags/[id] : ลบข้อมูลตาม id
export async function DELETE(
  request: Request,
  { params }: RouteContext
): Promise<NextResponse<ApiResponse>> {
  const { id } = await params;

  const result = await query<ResultSetHeader>({
    query: "DELETE FROM tags WHERE id = ?",
    values: [id],
  });

  const success = result.affectedRows > 0;
  return NextResponse.json(
    {
      message: success ? "success" : "error",
      status: success ? 200 : 404,
      tag: { id },
    },
    { status: success ? 200 : 404 }
  );
}