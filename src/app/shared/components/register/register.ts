import { Component, inject, signal } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { userCreateSercice } from '../../../core/services/user-create.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  imports: [MatIconModule, ReactiveFormsModule],
  templateUrl: './register.html',
  styleUrl: './register.css',
})
export class Register {
  private service = inject(userCreateSercice);
  registerForm: FormGroup;
  hidePassword: boolean = true;
  private fb = inject(FormBuilder);
  private router = inject(Router);
  correctPasswors = signal<boolean>(true);

  constructor(){
    this.registerForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(5)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      confirmPassword: ['', [Validators.required, Validators.minLength(8)]]
    });
  }

  toggleVisibility() {
    this.hidePassword = !this.hidePassword;
  }

  onRegister(): void{
    if(this.registerForm.invalid){
      this.registerForm.markAllAsTouched();
      return;
    }

    const {name, email, password, confirmPassword} = this.registerForm.value as {
      name: string;
      email: string;
      password: string;
      confirmPassword: string;
    };

    if(password !== confirmPassword){
      this.correctPasswors.set(false);
      return;
    }

    this.correctPasswors.set(true);
    console.log({name, email, password});
    this.service.createUser({name, email, password}).subscribe({
      next: () => {
        console.log('User Created');
        this.router.navigate(['/login']);
      },
      error: (err) => {
        console.error('Error created user', err);
        return;
      }
    });
  }
}
