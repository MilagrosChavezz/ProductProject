import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
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

searchProducts(filters: { search?: string ,priceOrder?:string}): Observable<Product[]> {
  
  localStorage.setItem('productFilters', JSON.stringify(filters));
  let params = new HttpParams();

  if (filters.search) {
    params = params.set('search', filters.search);
  }
    if (filters.priceOrder) params = params.set('order', filters.priceOrder); 
 
console.log(`${this.url}/search`, { params });
  return this.http.get<Product[]>(`${this.url}/search`, { params });
}

  getProducts() {
    return this.http.get<Product[]>(this.url);
  }

  getProductById(id: number) {
    return this.http.get<Product>(`${this.url}/${id}`);
  }

  getFilters(){
    return localStorage.getItem('productFilters')
  }

  addFilter(){
    localStorage.removeItem('productFilters'); 
  }

  clearFilter(){
    localStorage.removeItem('productFilters'); 
  }
  
}
