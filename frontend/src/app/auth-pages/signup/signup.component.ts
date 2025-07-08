import { Component } from '@angular/core';
import { UserSignup } from '../../models/userSingup.model';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth.service';
import { Router, RouterLink } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-signup',
  imports: [ReactiveFormsModule, CommonModule, RouterLink],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css',
})
export class SignupComponent {
  constructor(private authService: AuthService, private router: Router) {}

  errorMessage: string = '';

  get email() {
    return this.registerForm.get('email')!;
  }

  get password() {
    return this.registerForm.get('password')!;
  }

  registerForm: FormGroup = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(6),
    ]),
    firstName: new FormControl('', [Validators.required]),
    lastName: new FormControl('', [Validators.required]),
    address: new FormControl('', [Validators.required]),
  });

  onSubmit() {
    if (this.registerForm.invalid) {
      this.errorMessage = 'Please fill in all required fields correctly.';
      return;
    }
    const userSignup: UserSignup = {
      email: this.registerForm.value.email,
      password: this.registerForm.value.password,
      firstName: this.registerForm.value.firstName,
      lastName: this.registerForm.value.lastName,
      address: this.registerForm.value.address,
    };

    this.authService.signup(userSignup).subscribe({
      next: () => {
        Swal.fire({
          icon: 'success',
          title: 'Successfully registered',
          text: 'You will be redirect to login shortly...',
          showConfirmButton: false,
          timer: 2500,
        }).then(() => {
          this.router.navigate(['/login']);
        });
      },
      error: (error) => {
        console.error('Signup failed', error);
        if (error.status === 400) {
          this.errorMessage = error.error.message || 'Invalid signup data';
        } else {
          this.errorMessage =
            'An error occurred during signup. Please try again later.';
        }
      },
    });
  }
}
