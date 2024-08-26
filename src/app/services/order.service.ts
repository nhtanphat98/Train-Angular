import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CreateOrderDetailDto, CreateOrderDto } from '../../type';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  private apiUrl = 'http://localhost:3000/order';

  constructor(private http: HttpClient) { }

  getOrdersByUserId(): Observable<[]> {
    return this.http.get<any>(this.apiUrl);
  }

  postOrder(createOrderDto: CreateOrderDto, createOrderDetailDto: CreateOrderDetailDto[]) {
    const body = {createOrderDto, createOrderDetailDto};
    return this.http.post<any>(this.apiUrl, body);
  }
}
