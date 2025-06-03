
import { Routes } from '@angular/router';
import { ProductsComponent } from './products.component';
import { ProductCardComponent } from './product-card/product-card.component';

export const routes: Routes = [
  { path: '', component: ProductsComponent },
  { path: ':id', component: ProductCardComponent }
];
