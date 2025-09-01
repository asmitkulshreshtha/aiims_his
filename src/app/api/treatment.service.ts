import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TreatmentService {
  private saveUrl = 'http://localhost:8000/api/treatment/save-treatment';
  private getUrl = 'http://localhost:8000/api/treatment/get-treatment';

  constructor(private http: HttpClient) {}

  private getHeaders() {
    const token = localStorage?.getItem('authToken');
    return new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    });
  }

  saveTreatment(data: any) {
    return this.http.post(this.saveUrl, data, { headers: this.getHeaders() });
  }

  getTreatment(patientId: number) {
    return this.http.get(`${this.getUrl}/${patientId}`, { headers: this.getHeaders() });
  }
}
