import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { catchError, Observable, throwError } from 'rxjs';
import { Transaction } from '../interfaces/transaction.interface';

@Injectable({
  providedIn: 'root',
})
export class TransactionService {
  private http = inject(HttpClient);

  getTranasctions(): Observable<Transaction[]> {
    return this.http.get<Transaction[]>(`${environment.apiUrl}/api/transaction/user`).pipe(
      catchError((error) => {
        console.error('Error get the transactions', error);
        return throwError(() => error);
      }),
    );
  }
}
