import { Component, OnInit, signal } from '@angular/core';
import { OrderService } from '../services/order.service';
import { OrderCart, ProductCart } from '../models/orderCart.model';
import { CommonModule } from '@angular/common';
import { ProductService } from '../services/product.service';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-order-cart',
  imports: [CommonModule,RouterLink],
  standalone: true,
  templateUrl: './order-cart.component.html',
  styleUrl: './order-cart.component.css',
})
export class OrderCartComponent implements OnInit {
  orderItems = signal<ProductCart[]>([]);

  total = signal<number>(0);

  constructor(private orderService: OrderService,private router: Router, private route: ActivatedRoute) {}

  ngOnInit() {
    this.loadCart();
  }

  loadCart() {
    this.orderService.getUserCart().subscribe({
      next: (order: OrderCart) => {

        if (!order || !order.products) {
          this.orderItems.set([]);
          this.total.set(0);
          return;
        }

        const productsMapped: ProductCart[] = order.products.map((product) => ({
          id: product.id,
          name: product.name,
          price: product.price,
          quantity: product.ProductOrder?.quantity || 1,
        }));

      
        this.orderItems.set(productsMapped);
        this.total.set(order.totalPrice || 0);
      },
      error: (error) => {
        console.error('Error loading cart:', error);
      },
    });
  }

 
}
