import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './auth-pages/login/login.component';
import { SignupComponent } from './auth-pages/signup/signup.component';
import { OrderCartComponent } from './order-cart/order-cart.component';
import { UserProfileComponent } from './user-profile/user-profile.component';

export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'order', component: OrderCartComponent },
  { path: 'products', loadChildren: () => import('./products/products.routes').then(m => m.routes) },
  { path: 'profile', component: UserProfileComponent },
  { path: 'home', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  { path: '**', redirectTo: 'home' } 
];
