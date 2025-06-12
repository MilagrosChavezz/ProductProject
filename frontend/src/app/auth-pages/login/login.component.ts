import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import {  FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { UserLogin } from '../../models/userLogin.model';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  imports:[ReactiveFormsModule,CommonModule,RouterLink],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  errorMessage: string = '';

  constructor(private authService:AuthService,private router:Router) {}

  loginForm:FormGroup = new FormGroup({
    email: new FormControl(''),
    password: new FormControl('')
  });

  ngOnInit(): void {
  
  }


  OnSubmit() {
   
    const userLogin: UserLogin = {
      email: this.loginForm.value.email,
      password: this.loginForm.value.password
    };
    
    this.authService.login(userLogin).subscribe({
  next: (response) => {
    console.log('Login successful', response);
    this.authService.setLoginStatus(response.token || '');
    this.router.navigate(['/products']);
  },
  error: (error) => {
    console.error('Login failed', error);

    if (error.status === 401) {
      this.errorMessage = error.error.message || 'invalid email or password';
    } else {
      this.errorMessage = 'An error occurred during login. Please try again later.';
    }
  }
});

  }
}