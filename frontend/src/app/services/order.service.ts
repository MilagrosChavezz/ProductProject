import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { Product } from '../models/product.model';
import { Observable } from 'rxjs/internal/Observable';
import { OrderCart } from '../models/orderCart.model';

@Injectable({
  providedIn: 'root'
})
export class OrderService {


  url = environment.apiUrl + '/orders';
  

  constructor(private http:HttpClient) { }

 
  getUserCart():Observable<OrderCart> {
   const token = localStorage.getItem('token');
if (token) {
  console.log(JSON.parse(atob(token.split('.')[1])));
}

    return this.http.get<OrderCart>(`${this.url}/cart`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    });
  }

    addProductToCart(product: Product) {
    return this.http.post(`${this.url}/add`,{ productId: product.id }, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    });
  }
}
