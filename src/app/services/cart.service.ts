import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private apiUrl = 'http://localhost:3000/cart';

  constructor(private http: HttpClient) { }

  getCart(): Observable<[]> {
    return this.http.get<any>(this.apiUrl);
  }

  postCart() {
    return;
  }
}
