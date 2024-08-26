import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CreateOrderDetailDto, CreateOrderDto, Order } from '../../type';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  private apiUrl = 'http://localhost:3000/order';

  constructor(private http: HttpClient) { }

  getOrdersHistoryByUserId(user_id: number): Observable<Order[]> {
    const params = new HttpParams()
    .set('user_id', user_id.toString());
    return this.http.get<any>(this.apiUrl + "?userId=" + user_id);
  }

  postOrder(createOrderDto: CreateOrderDto, createOrderDetailDto: CreateOrderDetailDto[]) {
    const body = {createOrderDto, createOrderDetailDto};
    return this.http.post<any>(this.apiUrl, body);
  }
}
