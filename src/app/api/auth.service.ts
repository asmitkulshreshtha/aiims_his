import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  public baseUrl = 'http://localhost:8000/api/auth';

  constructor(public http: HttpClient) {}
  registerPatient(patient: any): Observable<any> {
    return this.http?.post(`${this.baseUrl}/register`, patient);
  }

  login(patient: any) {
    return this.http?.post(`${this.baseUrl}/login`, patient);
  }
  // auth.service.ts
  getCurrentUserFromToken(): any {
    const token = localStorage?.getItem('authToken');
    if (!token) return null;

    const payload = token.split('.')[1];
    const decoded = atob(payload); 
    return JSON.parse(decoded); 
  }
}
