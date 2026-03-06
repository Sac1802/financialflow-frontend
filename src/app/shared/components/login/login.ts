import { Component, inject } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-login',
  imports: [MatIconModule],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {
  hidePassword: boolean = true;
  private authService = inject(AuthService);

  toggleVisibility(){
    this.hidePassword = !this.hidePassword;
  }

  onLogin(event: Event, email: string, password: string): void {
    event.preventDefault();

    const loginData = {
      email: email.trim(),
      password,
    };

    this.authService.login(loginData).subscribe({
      next: () => {
        console.log('Login successful');
      },
      error: () => {
        console.error('Login failed');
      },
    });
  }
}
