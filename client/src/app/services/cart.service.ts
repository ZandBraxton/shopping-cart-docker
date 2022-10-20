import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { addProduct, Cart, CartItem } from '../interfaces/cart.interface';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private apiUrl = 'http://localhost:3000/cart';
  constructor(private http: HttpClient) {}

  getCart(): Observable<Cart> {
    return this.http.get<Cart>(this.apiUrl);
  }

  addToCart(body: addProduct): Observable<Cart> {
    return this.http.post<Cart>(`${this.apiUrl}/add`, body);
  }

  deleteFromCart(productId: string): Observable<unknown> {
    return this.http.delete(`${this.apiUrl}/delete/${productId}`);
  }

  updateCart(body: addProduct): Observable<Cart> {
    return this.http.put<Cart>(`${this.apiUrl}/update`, body);
  }

  checkoutCart(): Observable<Cart> {
    return this.http.post<Cart>(`${this.apiUrl}/checkout`, {});
  }
}
