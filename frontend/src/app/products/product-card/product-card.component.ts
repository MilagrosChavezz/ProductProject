import { Component, input } from '@angular/core';
import { Product } from '../../models/product.model';  
import { RouterLink } from '@angular/router';
import { environment } from '../../../environments/environment.development';

@Component({
  selector: 'app-product-card',
  imports: [RouterLink],
  standalone: true,
  templateUrl: './product-card.component.html',
  styleUrl: './product-card.component.css'
})
export class ProductCardComponent {

    product = input<Product>();
    apiUrl = environment.apiUrl;

}
