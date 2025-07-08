import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { UserLogin } from '../../models/userLogin.model';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule, CommonModule, RouterLink],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  errorMessage: string = '';

  constructor(private authService: AuthService, private router: Router) {}


loginForm: FormGroup = new FormGroup({
  email: new FormControl<string>('', [Validators.required, Validators.email]),
  password: new FormControl<string>('', [Validators.required])
});


onSubmit() {
  if (this.loginForm.invalid) {
    this.errorMessage = 'Please fill out all required fields with the correct information.';
    return;
  }

  const userLogin: UserLogin = {
    email: this.loginForm.value.email!,
    password: this.loginForm.value.password!
  };

  this.authService.login(userLogin).subscribe({
    next: (response) => {
      this.authService.setLoginStatus(response.token ?? '', response.user);
      this.router.navigate(['/products']);
    },
    error: (error) => {
      console.error('Login failed', error);
      this.errorMessage = error.status === 401
        ? error.error.message || 'Invalid email or password.'
        : 'An error occurred during login. Please try again later.';
    }
  });
}
}
