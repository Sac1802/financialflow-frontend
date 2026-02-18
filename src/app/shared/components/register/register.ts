import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-register',
  imports: [MatIconModule],
  templateUrl: './register.html',
  styleUrl: './register.css',
})
export class Register {
  hidePassword: boolean = true;

  toggleVisibility() {
    this.hidePassword = !this.hidePassword;
  }
}
