import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';
import { OrderCart } from '../models/orderCart.model';

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  url:string = environment.apiUrl + '/orders';

  constructor(private http: HttpClient) {}

  private getToken(): string | null {
  return localStorage.getItem('token');
}

  getUserCart(): Observable<OrderCart> {
    const token = this.getToken();
    if (token) {
      console.log(JSON.parse(atob(token.split('.')[1])));
    }

    return this.http.get<OrderCart>(`${this.url}/cart`, {
      headers: {
        Authorization: `Bearer ${this.getToken()}`,
      },
    });
  }

  addProductToCart(productId: number, quantity: number): Observable<OrderCart> {
    return this.http.post<OrderCart>(
      `${this.url}/add`,
      { productId, quantity },
      {
        headers: {
          Authorization: `Bearer ${this.getToken()}`,
        },
      }
    );
  }
}
