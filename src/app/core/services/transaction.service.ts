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

  saveTransaction(transaction: Transaction): Observable<Transaction>{
    return this.http.post<Transaction>(`${environment.apiUrl}/api/transaction`, transaction).pipe(
      catchError((error) => {
        console.error('Error saving transaction', error);
        return throwError(() => error);
      })
    );
  }

  deleteTransaction(id: number): Observable<number>{
    return this.http.delete<number>(`${environment.apiUrl}/api/transaction/${id}`).pipe(
      catchError((error) => {
        console.error('Error deleting transaction', error);
        return throwError(() => error);
      })
    );
  }
}
