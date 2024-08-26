import { HttpContext, HttpHeaders, HttpParams } from "@angular/common/http";

export interface Options{
    headers?:
    | HttpHeaders
    | {
        [header: string]: string | string[];
      };
  observe?: 'body';
  context?: HttpContext;
  params?:
    | HttpParams
    | {
        [param: string]:
          | string
          | number
          | boolean
          | ReadonlyArray<string | number | boolean>
      };
  reportProgress?: boolean;
  responseType?: 'json';
  withCredentials?: boolean;
  transferCache?:
    | {
        includeHeaders?: string[];
      }
    | boolean;
}

export interface ResponseProduct {
    data: Product[];
    total: number;
    pageNumber: number;
    pageSize: number;
    totalPages: number;
}

export interface Product {
    id: number;
    price: number;
    description: string;
    quantity: number;
    name: string;
    status: string
    image: string;
    rating: number;
}

export interface Category {
    id: number;
    name: string;
}

export interface SearchFilter {
    rangePrice: number[],
    name: string,
    status: string,
    rating: number,
    category_id: number,
}

export interface PaginationParams {
    [param: string]:
          | string
          | number
          | boolean
          | ReadonlyArray<string | number | boolean>;
    pageNumber: number;
    pageSize: number;
}

export interface CreateOrderDto {
    user_id: number;
  }

  export interface CreateOrderDetailDto {
    product_id: number;
    order_id: number;
    quantity: number;
  }
  
  export interface OrderDetail{
    id: number;
    product_id: number;
    order_id: number;
    quantity: number;
    created_at: Date;
  }

  export interface Order{
    id: number;
    user_id: number;
    created_at: Date;
    orderDetail: OrderDetail[];
  }