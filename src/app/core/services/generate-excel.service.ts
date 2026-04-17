import { HttpClient } from "@angular/common/http";
import { Injectable, inject } from "@angular/core";
import { environment } from "../../../environments/environment";
import { catchError } from "rxjs";

@Injectable({
    providedIn: 'root'
})

export class GenerateExcelService {
    private http = inject(HttpClient);

    generateExcel(startDate: Date, endDate: Date): void{
        this.http.post(`${environment.apiUrl}/api/excel/generate`, {
            startDate,
            endDate
        }).pipe(
            catchError((error) => {
                console.error('Error generating Excel:', error);
                throw error;
            })
        );
    }
    
}