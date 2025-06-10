import { Routes } from '@angular/router';
import { OrderComponent } from './order/order.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './auth-pages/login/login.component';
import { SignupComponent } from './auth-pages/signup/signup.component';

export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'order', component: OrderComponent },
  { path: 'products', loadChildren: () => import('./products/products.routes').then(m => m.routes) },
  { path: 'home', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  { path: '**', redirectTo: 'home' } 
];
