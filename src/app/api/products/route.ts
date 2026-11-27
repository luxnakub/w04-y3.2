import { NextResponse } from "next/server";
import type { ResultSetHeader, RowDataPacket } from "mysql2/promise";
import { query } from "@/lib/db";
import type { ApiResponse, CreateProductBody, Product } from "@/types/products";

type ProductRow = Product & RowDataPacket;

export async function GET(): Promise<NextResponse<Product[]>> {
  const products = await query<ProductRow[]>({
    query: "SELECT * FROM products",
  });
  return NextResponse.json(products, { status: 200 });
}

export async function POST(request: Request): Promise<NextResponse<ApiResponse>> {
  const { product_name, price }: CreateProductBody = await request.json();
  const result = await query<ResultSetHeader>({
    query: "INSERT INTO products (product_name, price) VALUES (?, ?)",
    values: [product_name, price],
  });

  const success = result.affectedRows > 0;
  return NextResponse.json(
    {
      message: success ? "success" : "error",
      status: success ? 201 : 400,
      product: { id: result.insertId, product_name, price },
    },
    { status: success ? 201 : 400 }
  );
}