import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class TemplateService {
  public baseUrl = 'http://localhost:8000/api/templates';
  constructor(public http: HttpClient) {}
  emergencycareData(emergencycare: any) {
    return this.http.post(
      `${this.baseUrl}/create-emergencycare`,
      emergencycare
    );
  }
  getemergencycare(id: number): any {
    return this.http.get(`${this.baseUrl}/emergency-care/${id}`);
  }
  traumaTemplateData(traumaTemplate: any) {
    return this.http.post(`${this.baseUrl}/trauma-template`, traumaTemplate);
  }
  
    gettraumaTemplate(id: number): any {
    return this.http.get(`${this.baseUrl}/trauma-template/${id}`);
  }

  progressNoteseData(progressNotes: any) {
    return this.http.post(`${this.baseUrl}/progress-notes`, progressNotes);
  }

  getprogressNotes(id: number): any {
    return this.http.get(`${this.baseUrl}/progress-notes/${id}`);
  }
}
