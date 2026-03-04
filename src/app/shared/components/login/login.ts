import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { userLogin } from '../../../core/interfaces/user.login.interface';

@Component({
  selector: 'app-login',
  imports: [MatIconModule],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {
  hidePassword: boolean = true;

  toggleVisibility(){
    this.hidePassword = !this.hidePassword;
  }
}
