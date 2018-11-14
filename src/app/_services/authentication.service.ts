import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class AuthenticationService {
    constructor(private http: HttpClient) { }

    login(email: string, password: string) {
        return this.http.post<any>(`${config.apiUrl}/users/login`, { email, password })
            .pipe(map(authResponse => {
                // login successful if there's a jwt token in the response
                if (authResponse && authResponse.jwt) {
                    // store user details and jwt token in local storage to keep user logged in between page refreshes
                    console.log("token", JSON.stringify(authResponse) );
                    localStorage.setItem('currentUser', JSON.stringify(authResponse));
                }

                return authResponse;
            }));
    }

    logout() {
        // remove user from local storage to log user out
        localStorage.removeItem('currentUser');
    }
}