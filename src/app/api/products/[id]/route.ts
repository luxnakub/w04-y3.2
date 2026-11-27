import { NextResponse } from "next/server";
import type { ResultSetHeader, RowDataPacket } from "mysql2/promise";
import { query } from "@/lib/db";
import type { ApiResponse, UpdateProductBody, Product } from "@/types/products";

type ProductRow = Product & RowDataPacket;
type RouteContext = { params: Promise<{ id: string }> };

// 2. GET /api/products/[id] : ดึงข้อมูลเฉพาะเรคอร์ดที่ระบุ id
export async function GET(
  request: Request,
  { params }: RouteContext
): Promise<NextResponse<Product[]>> {
  const { id } = await params;
  const products = await query<ProductRow[]>({
    query: "SELECT * FROM products WHERE id = ?",
    values: [id],
  });
  return NextResponse.json(products, { status: 200 });
}

// 4. PUT /api/products/[id] : แก้ไขข้อมูลตาม id
export async function PUT(
  request: Request,
  { params }: RouteContext
): Promise<NextResponse<ApiResponse>> {
  const { id } = await params;
  const { product_name, price }: UpdateProductBody = await request.json();

  const result = await query<ResultSetHeader>({
    query: "UPDATE products SET product_name = ?, price = ? WHERE id = ?",
    values: [product_name, price, id],
  });

  const success = result.affectedRows > 0;
  return NextResponse.json(
    {
      message: success ? "success" : "error",
      status: success ? 200 : 404,
      product: { id, product_name, price },
    },
    { status: success ? 200 : 404 }
  );
}

// 5. DELETE /api/products/[id] : ลบข้อมูลตาม id
export async function DELETE(
  request: Request,
  { params }: RouteContext
): Promise<NextResponse<ApiResponse>> {
  const { id } = await params;

  const result = await query<ResultSetHeader>({
    query: "DELETE FROM products WHERE id = ?",
    values: [id],
  });

  const success = result.affectedRows > 0;
  return NextResponse.json(
    {
      message: success ? "success" : "error",
      status: success ? 200 : 404,
      product: { id },
    },
    { status: success ? 200 : 404 }
  );
}