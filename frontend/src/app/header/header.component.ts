import { CommonModule } from '@angular/common';
import {
  Component,
  effect,
  signal,
} from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-header',
  imports: [CommonModule, RouterLink],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent  {

  isLoggedIn = signal<boolean>(false); 
  menuOpen:boolean = false;

  constructor(private authService: AuthService,private router:Router) {
    effect(() => {
      this.isLoggedIn.set(this.authService.isLoggedIn())
    });
  }

  get isAdmin(): boolean {
    return this.authService.isAdmin();
  }
  
  goToAddProduct() {
    this.router.navigate(['/products/new']);
  }
  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
  toggleMenu() {
    this.menuOpen = !this.menuOpen;
  }
  
}


