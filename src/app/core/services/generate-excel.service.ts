import { HttpClient } from "@angular/common/http";
import { Injectable, inject } from "@angular/core";
import { environment } from "../../../environments/environment";
import { catchError } from "rxjs";

@Injectable({
    providedIn: 'root'
})

export class GenerateExcelService {
    private http = inject(HttpClient);

    private formatDate(date: Date): string {
        return date.toISOString().split('T')[0];
    }

    generateExcel(startDate: Date, endDate: Date){
        return this.http.post(`${environment.apiUrl}/api/excel/generate`, {
            starDate: this.formatDate(startDate),
            endDate: this.formatDate(endDate)
        }, { responseType: 'blob' }).pipe(
            catchError((error) => {
                console.error('Error generating Excel:', error);
                throw error;
            })
        );
    }

}