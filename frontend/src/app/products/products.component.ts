import { Component, signal } from '@angular/core';
import { ProductCardComponent } from './product-card/product-card.component';
import { ProductService } from '../services/product.service';
export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
}
@Component({
  selector: 'app-products',
  imports: [ProductCardComponent],
  standalone: true,
  templateUrl: './products.component.html',
  styleUrl: './products.component.css'
})
export class ProductsComponent {

products= signal<Product[]>([]);

constructor(private productService:ProductService){}

ngOnInit(){
  this.productService.getProducts().subscribe((data: Product[]) => {
    this.products.set(data);
  });
}


}





