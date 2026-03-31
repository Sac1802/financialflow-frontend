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

  login(data: userLogin): Observable<string> {
    return this.http
      .post(
        `${environment.apiUrl}/api/auth/login`,
        data,
        { 
          responseType: 'text',
          headers: { 'Content-Type': 'application/json' }
        },
      )
      .pipe(
        tap((token) => {
          localStorage.setItem(this.TOKEN, token);
          this.isLoggedIn.set(true);
        }),
        catchError((err) => {
          console.error('Error login', err);
          return throwError(() => err);
        }),
      );
  }

  logout() {
    localStorage.removeItem(this.TOKEN);
    this.isLoggedIn.set(false);
  }
}
