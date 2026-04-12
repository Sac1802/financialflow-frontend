import { HttpClient } from "@angular/common/http";
import { Injectable, inject } from "@angular/core";
import { environment } from "../../../environments/environment";
import { UserInfo } from "../interfaces/user.info.interface";
import { catchError, Observable } from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class UserService{
    private http = inject(HttpClient);

    getUserInfo(): Observable<UserInfo>{
        return this.http.get<UserInfo>(`${environment.apiUrl}/api/user/id`).pipe(
            catchError((error) => {
                console.error('Error fetching user info:', error);
                throw error;
            })
        );
    }
}