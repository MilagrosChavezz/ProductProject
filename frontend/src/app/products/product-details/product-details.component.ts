import { Component,signal } from '@angular/core';
import { Product } from '../../models/product.model';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from '../../services/product.service';
import { OrderService } from '../../services/order.service';
import Swal from 'sweetalert2';
import { environment } from '../../../environments/environment.development';

@Component({
  selector: 'app-product-details',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.css'
})
export class ProductDetailsComponent {

   apiUrl = environment.apiUrl;
   product = signal<Product | null>(null);

   quantity: number = 1;


   constructor(
    private route: ActivatedRoute,
    private productService: ProductService,
    private orderService: OrderService,
    private router: Router
  ) {}

    ngOnInit() {
      
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.loadProduct(id);
  }

  loadProduct(id: number) {
    this.productService.getProductById(id).subscribe({
      next: (data) => {
        this.product.set(data);
      },
      error: (err) => {
        console.error('Error to load product', err);
      }
    });
  }

  onQuantityChange(event: Event) {
  const input = event.target as HTMLInputElement;
  this.quantity = Number(input.value) || 1;
}

 AddToCart() {

  if (!this.product()) return;

  if (this.quantity < 1) {
    Swal.fire('Invalid quantity', 'Please enter a quantity of at least 1.', 'warning');
    return;
  }
  
  this.orderService.addProductToCart(this.product()!.id, this.quantity).subscribe({
    next: () => {
      Swal.fire({
        icon: 'success',
        title: 'Product added to cart',
        timer: 1500,
        showConfirmButton: false
      });
      this.router.navigate(['/order']);
    },
    error: (err) => {
     
      Swal.fire({
        icon: 'error',
        title: 'Login required',
        text:  'You need to login to add products to the cart',
        confirmButtonText: 'Login'
      }).then((result) => {
        if (result.isConfirmed) {
          this.router.navigate(['/login']);
        }
      });
      
    }
  });
}

 

}
