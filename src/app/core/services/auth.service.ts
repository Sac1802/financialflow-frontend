import { Injectable, signal, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, Observable, tap, throwError } from 'rxjs';
import { userLogin } from '../interfaces/user.login.interface';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private http = inject(HttpClient);
  isLoggedIn = signal(false);
  readonly TOKEN = 'access_token';

  constructor() {
    const token = localStorage.getItem(this.TOKEN);
    if (token) {
      this.isLoggedIn.set(true);
    }
  }

  login(data: userLogin) {
    return this.http.post<{ access_token: string }>(environment.apiUrl, data).pipe(
      tap((res) => {
        localStorage.setItem(this.TOKEN, res.access_token);
        this.isLoggedIn.set(true);
      }),
      catchError((err) => {
        console.error('Error login', err);
        return throwError(() => err);
      }),
    );
  }

  logout(){
    localStorage.removeItem(this.TOKEN);
    this.isLoggedIn.set(false);
  }
}
