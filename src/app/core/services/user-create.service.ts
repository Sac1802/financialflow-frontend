import { Injectable, signal, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, Observable, tap, throwError } from 'rxjs';
import { userRegister } from '../interfaces/user.register.interface';
import { environment } from '../../../environments/environment';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class userCreateSercice {
  private http = inject(HttpClient);
  private router = inject(Router);
  createdSuccess = signal<boolean>(false);

  createUser(data: userRegister) {
    return this.http.post<string>(`${environment.apiUrl}/api/user`, data).pipe(
      tap((res) => {
        this.createdSuccess.set(true);
        this.router.navigate(['login']);
      }),
      catchError((err) => {
        console.error('Error login', err);
        return throwError(() => err);
      }),
    );
  }
}
