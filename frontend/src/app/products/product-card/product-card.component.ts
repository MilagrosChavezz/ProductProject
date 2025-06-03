import { Component, input } from '@angular/core';
import { Product } from '../products.component';

@Component({
  selector: 'app-product-card',
  imports: [],
  standalone: true,
  templateUrl: './product-card.component.html',
  styleUrl: './product-card.component.css'
})
export class ProductCardComponent {

    product = input<Product>();


}
