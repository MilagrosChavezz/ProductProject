import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Product } from '../models/product.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

   url = environment.apiUrl + '/products';

     constructor(private http:HttpClient) { }

  createProduct(formData: FormData){
  const token = localStorage.getItem('token'); 

  const headers = new HttpHeaders({
    Authorization: `Bearer ${token}`
  });

  return this.http.post(this.url + '/new', formData, { headers });
}




  getProducts() {
    return this.http.get<Product[]>(this.url);
  }

  getProductById(id: number) {
    return this.http.get<Product>(`${this.url}/${id}`);
  }

  
}
