// import { Injectable } from '@angular/core';
// import { HttpClient } from '@angular/common/http';
// import { Observable, of } from 'rxjs';

// @Injectable({
//     providedIn: 'root'
// })
// export class PatientService {
//     public apiUrl = '/api/patients';
//     public mockPatients: any = [
//         {
//             id: 1,
//             queNo: 101,
//             patientName: 'John Doe',
//             crNumber: 'CR12345',
//             gender: 'Male',
//             age: 45,
//             category: 'Outpatient',
//             department: 'Cardiology',
//             room: 'C-101',
//             visitDateTime: '2025-06-18T10:00:00'
//         },
//         {
//             id: 2,
//             queNo: 102,
//             patientName: 'Jane Smith',
//             crNumber: 'CR67890',
//             gender: 'Female',
//             age: 30,
//             category: 'Inpatient',
//             department: 'Neurology',
//             room: 'N-204',
//             visitDateTime: '2025-06-19T14:30:00'
//         },
//         {
//             id: 3,
//             queNo: 103,
//             patientName: 'Alex Johnson',
//             crNumber: 'CR11223',
//             gender: 'Other',
//             age: 25,
//             category: 'Emergency',
//             department: 'Orthopedics',
//             room: 'E-305',
//             visitDateTime: '2025-06-19T09:15:00'
//         }
//     ];
//     constructor(public http: HttpClient) { }

//     //   addPatient(patient:any): Observable<any> {
//     //     return this.http.post(this.apiUrl, patient);
//     //   }

//     addPatient(patient: any): Observable<any> {
//         // Simulate adding to mock data
//         const newPatient = { ...patient, id: this.mockPatients.length + 1 };
//         this.mockPatients.push(newPatient);
//         return of(newPatient);
//     }

//     getPatients(): any {
//         return of(this.mockPatients); // Return mock data
//     }

//     getPatientById(id: number): any {
//         const patient = this.mockPatients.find((p: { id: number; }) => p.id === id);
//         return of(patient);
//     }

//     updatePatient(updatedPatient: any): Observable<any> {
//         const index = this.mockPatients.findIndex((p: { id: any; }) => p.id === updatedPatient.id);
//         if (index !== -1) {
//             this.mockPatients[index] = { ...this.mockPatients[index], ...updatedPatient };
//             return of(this.mockPatients[index]);
//         }
//         return of(updatedPatient);
//     }
// }

// ???????????????????????????????????????????????????????????????????????



import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class PatientService {
    public baseUrl = 'http://localhost:8000/api/patient';

    constructor(public http: HttpClient) { }
    addPatient(patient: any): Observable<any> {
        return this.http.post(`${this.baseUrl}/registerPatient`, patient);
    }

    getPatients(): Observable<any> {
        return this.http.get(`${this.baseUrl}/getPatientList`);
    }
    getPatientById(id: number): any {
        return this.http.get(`${this.baseUrl}/getPatientDetails/${id}`);
    }

    updatePatient(updatedPatient: any) {
        return this.http.put(`${this.baseUrl}/updatePatient/${updatedPatient.id}`, updatedPatient);
    }

    getPatientsWithTriage(): Observable<any> {
        return this.http.get(`${this.baseUrl}/patientList/triage`);
    }

    // Add triage data for a patient by ID
    addTriage(patientId: number, triageData: any): Observable<any> {
        return this.http.post(`${this.baseUrl}/addTriage/${patientId}`, triageData);
    }
}


