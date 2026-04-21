import { HttpClient } from "@angular/common/http";
import { Injectable, inject } from "@angular/core";
import { environment } from "../../../environments/environment";
import { catchError } from "rxjs";

@Injectable({
    providedIn: 'root'
})

export class GeneratePdfService {
    private http = inject(HttpClient);

    private formatDate(date: Date): string {
        return date.toISOString().split('T')[0];
    }

    generatePdf(startDate: Date, endDate: Date){
        return this.http.post(`${environment.apiUrl}/api/pdf/generate`, {
            starDate: this.formatDate(startDate),
            endDate: this.formatDate(endDate)
        }, { responseType: 'blob' }).pipe(
            catchError((error) => {
                console.error('Error generating PDF:', error);
                throw error;
            })
        );
    }
}