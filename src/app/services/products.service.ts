import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { Observable } from 'rxjs';
import { Product, ResponseProduct, SearchFilter } from '../../type';
import { HttpClient, HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  private apiUrl = 'http://localhost:3000/products';

  constructor(private http: HttpClient) {}
  
  getProducts(pageNumber: number = 1, pageSize: number = 10, searchFilter: SearchFilter): Observable<ResponseProduct> {
    const params = new HttpParams()
    .set('pageNumber', pageNumber.toString())
    .set('pageSize', pageSize.toString())
    .set('minPrice', searchFilter.rangePrice[0])
    .set('maxPrice', searchFilter.rangePrice[1])
    .set('name', searchFilter.name.trim())
    .set('status', searchFilter.status)
    .set('rating', searchFilter.rating.toString())
    .set('category_id', searchFilter.category_id.toString());
    return this.http.get<any>(this.apiUrl, {params});
  }

  getProduct(id: number): Observable<Product> {
    return this.http.get<Product>(this.apiUrl + '/' + id);
  }

}
