
import { Routes } from '@angular/router';
import { ProductsComponent } from './products.component';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { ProductFormComponent } from './product-form/product-form.component';

export const routes: Routes = [
  { path: '', component: ProductsComponent },
   { path: 'new', component: ProductFormComponent },    
  { path: ':id', component: ProductDetailsComponent }

];
