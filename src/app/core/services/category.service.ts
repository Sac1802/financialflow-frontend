import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { environment } from '../../../environments/environment';
import { catchError, Observable, throwError } from 'rxjs';
import { CategoryAmounts } from '../interfaces/category-amounts.interface';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  private http = inject(HttpClient);

  getCategoryAmounts(): Observable<CategoryAmounts[]> {
    return this.http.get<CategoryAmounts[]>(`${environment.apiUrl}/api/categories/amount`).pipe(
      catchError((error) => {
        console.error('Error get the category amounts', error);
        return throwError(() => error);
      }),
    );
  }
}
