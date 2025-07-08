import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Product } from '../models/product.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  url:string = environment.apiUrl + '/products';

  constructor(private http: HttpClient) {}

  createProduct(formData: FormData): Observable<Product> {
    const token = localStorage.getItem('token');

    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });

    return this.http.post<Product>(this.url + '/new', formData, { headers });
  }

  searchProducts(filters: {
    search?: string;
    priceOrder?: string;
  }): Observable<Product[]> {
    localStorage.setItem('productFilters', JSON.stringify(filters));
    let params = new HttpParams();

    if (filters.search) {
      params = params.set('search', filters.search);
    }
    if (filters.priceOrder) params = params.set('order', filters.priceOrder);

    return this.http.get<Product[]>(`${this.url}/search`, { params });
  }

  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(this.url);
  }

  getProductById(id: number): Observable<Product> {
    return this.http.get<Product>(`${this.url}/${id}`);
  }

  getFilters(): string | null {
    return localStorage.getItem('productFilters');
  }

  clearFilter():void {
    localStorage.removeItem('productFilters');
  }
}
