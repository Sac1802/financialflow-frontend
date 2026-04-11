import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { environment } from '../../../environments/environment';
import { catchError, Observable, throwError } from 'rxjs';
import { CategoryAmounts } from '../interfaces/category-amounts.interface';
import { Category } from '../interfaces/category.interface';
import { CategoryUser } from '../interfaces/category.user.interface';

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

  saveNewCategory(category: Category): Observable<Category>{
    console.log(category);
    return this.http.post<Category>(`${environment.apiUrl}/api/categories`, category).pipe(
      catchError((error) => {
        console.error('Error saving new category', error);
        return throwError(() => error);
      })
    );
  }

  getCategoriesByUser(): Observable<CategoryUser[]>{
    return this.http.get<CategoryUser[]>(`${environment.apiUrl}/api/categories/id`).pipe(
      catchError((error) => {
        console.error('Error getting categories by user', error);
        return throwError(() => error);
      })
    );
  }
}
