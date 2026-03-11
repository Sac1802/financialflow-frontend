import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-login',
  imports: [
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule
  ],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {
  hidePassword: boolean = true;
  loginForm: FormGroup;
  private authService = inject(AuthService);
  private fb = inject(FormBuilder);

  constructor() {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  toggleVisibility(): void {
    this.hidePassword = !this.hidePassword;
  }

  onLogin(): void {
    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      return;
    }

    const { email, password } = this.loginForm.value;

    this.authService.login({ email, password }).subscribe({
      next: (data) => {
        console.log('Login successful');
      },
      error: (err) => {
        console.error('Login failed', err);
      },
    });
  }
}
