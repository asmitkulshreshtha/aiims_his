
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable} from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    public baseUrl = 'http://localhost:8000/api/auth';

    constructor(public http: HttpClient) { }
    registerPatient(patient: any): Observable<any> {
        return this.http.post(`${this.baseUrl}/register`, patient);
    }

    login(patient: any){
        return this.http.post(`${this.baseUrl}/login`, patient);
    }
   
}