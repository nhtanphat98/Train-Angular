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
          | ReadonlyArray<string | number | boolean>;
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
    price: string;
    description: string;
    quantity: number;
    name: string;
    status: string
    image: string;
    rating: number;
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
