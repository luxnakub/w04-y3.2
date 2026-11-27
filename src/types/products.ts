export interface Product {
  id: number;
  product_name: string;
  price: number;
  created_at: string | null;
  updated_at: string | null;
}

export interface CreateProductBody {
  product_name: string;
  price: number;
}

export interface UpdateProductBody {
  product_name: string;
  price: number;
}

export interface ApiResponse {
  message: string;
  status: number;
  product?: {
    id: number | string;
    product_name?: string;
    price?: number;
  };
}