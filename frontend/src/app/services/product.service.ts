import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { Product } from '../products/products.component';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  url = environment.apiUrl + '/products';
  

  constructor(private http:HttpClient) { }

  getProducts() {
    return this.http.get<Product[]>(this.url);
  }
}
