import { HttpClient } from "@angular/common/http";
import { Injectable, inject } from "@angular/core";
import { environment } from "../../../environments/environment";
import { catchError } from "rxjs";

@Injectable({
    providedIn: 'root'
})

export class GeneratePdfService {
    private http = inject(HttpClient);

    generatePdf(startDate: Date, endDate: Date): void{
        this.http.post(`${environment.apiUrl}/api/pdf/generate`, {
            startDate,
            endDate
        }).pipe(
            catchError((error) => {
                console.error('Error generating PDF:', error);
                throw error;
            })
        );
    }
}