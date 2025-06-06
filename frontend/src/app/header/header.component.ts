import { CommonModule } from '@angular/common';
import {
  Component,

  effect,

  signal,
  SimpleChanges,
} from '@angular/core';
import { RouterLink } from '@angular/router';
import { LoginComponent } from '../login/login.component';
import { UserService } from '../services/auth.service';

@Component({
  selector: 'app-header',
  imports: [CommonModule, RouterLink],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent  {

isLoggedIn = signal<boolean>(false); 

  constructor(private authService: UserService) {
   
    effect(() => {
      this.isLoggedIn.set(this.authService.isLoggedIn())
    });
  }
  menuOpen = false;

  logout() {
    this.authService.logout();
  }
  toggleMenu() {
    this.menuOpen = !this.menuOpen;
  }
}


