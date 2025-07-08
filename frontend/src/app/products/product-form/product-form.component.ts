import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ProductService } from '../../services/product.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-product-form',
  imports: [ReactiveFormsModule],
  templateUrl: './product-form.component.html',
  styleUrl: './product-form.component.css',
})
export class ProductFormComponent {
  selectedFile: File | null = null;
  constructor(private productService: ProductService, private router: Router) {}

productForm = new FormGroup({
  name: new FormControl<string>('', {
    nonNullable: true,
    validators: [Validators.required, Validators.minLength(2)],
  }),
  description: new FormControl<string | null>('', {
    validators: [Validators.required, Validators.minLength(10)],
  }),
  price: new FormControl<number>(0, {
    nonNullable: true,
    validators: [Validators.required, Validators.min(0.01)],
  }),
  category: new FormControl<string | null>('', {
    validators: [Validators.required],
  }),
});


  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length) {
      this.selectedFile = input.files[0];
    }
  }
  onSubmit(): void {
    if (this.productForm.valid) {
      const formData = new FormData();
      formData.append('name', this.productForm.get('name')?.value ?? '');
      formData.append(
        'description',
        this.productForm.get('description')?.value || ''
      );
      formData.append(
        'price',
        this.productForm.get('price')?.value?.toString() ?? '0'
      );
      formData.append(
        'category',
        this.productForm.get('category')?.value || ''
      );

      if (this.selectedFile) {
        formData.append('image', this.selectedFile, this.selectedFile.name);
      }

      this.productService.createProduct(formData).subscribe({
        next: (res) => {
          console.log('Producto creado:', res);

          this.productForm.reset();
          this.selectedFile = null;

          Swal.fire({
            icon: 'success',
            title: 'Product ',
            text: '¡Product has been added successfully!',
            timer: 2000,
            showConfirmButton: false,
          });

          this.router.navigate(['/products']);
        },
        error: (err) => {
          console.error('Error creando producto:', err);
        },
      });
    } else {
      console.log('Formulario inválido');
    }
  }
}
