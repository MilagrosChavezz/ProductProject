import { Component, signal } from '@angular/core';
import { ProductCardComponent } from './product-card/product-card.component';
import { ProductService } from '../services/product.service';
import { Product } from '../models/product.model';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-products',
  imports: [ProductCardComponent,FormsModule,CommonModule],
  standalone: true,
  templateUrl: './products.component.html',
  styleUrl: './products.component.css'
})
export class ProductsComponent {

products= signal<Product[]>([]);
searchTerm: string = '';
noResults:boolean=false;
priceOrder: string = '';


constructor(private productService:ProductService){}

ngOnInit(){

   const savedFilters = this.productService.getFilters();
  if (savedFilters) {
    const filters = JSON.parse(savedFilters);
    this.searchTerm = filters.search || '';
    this.priceOrder = filters.priceOrder || '';
    this.onFilterChange();
  } else {
    this.productService.getProducts().subscribe((data: Product[]) => {
    this.products.set(data);
  });
  }

}

clearFilters(){
this.searchTerm = '';
this.priceOrder = '';
  this.productService.clearFilter();
  this.onFilterChange();
}

onFilterChange() {
  const filters = {
    search: this.searchTerm,
    priceOrder: this.priceOrder
  };


  this.productService.searchProducts(filters).subscribe({
    next: (products: Product[]) => {
      this.products.set(products);
      this.noResults = products.length === 0;
    },
    error: (err) => {
      console.error(err);
      this.noResults = true;
    }
  });
}


}





