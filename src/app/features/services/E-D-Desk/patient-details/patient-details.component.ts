import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PatientService } from '../../../../api/patient.service';
import { Router } from '@angular/router';
import { HeaderComponent } from '../../../header/header.component';

@Component({
  selector: 'app-patient-details',
  standalone: true,
  imports: [CommonModule, HeaderComponent],
  templateUrl: './patient-details.component.html',
  styleUrls: ['./patient-details.component.css'],
})
export class PatientDetailsComponent implements OnInit {
  patients: any[] = [];
  totalRecords = 0;
  currentPage = 1;
  totalPages = 0;
  fullResponse: any;

  constructor(public patientService: PatientService, public router: Router) {}

  ngOnInit() {
    this.getPatients();
  }

  getPatients() {
    this.patientService.getPatientsWithTriage().subscribe(
      (response: any) => {
        this.fullResponse = response;
        this.patients = response.data;
        this.totalRecords = response.totalRecords;
        this.currentPage = response.currentPage;
        this.totalPages = response.totalPages;
      },
      (error: any) => console.error('Error fetching patients', error)
    );
  }

  getLatestTriage(triageList: any[]): string | null {
    if (!triageList || triageList.length === 0) return null;

    const sorted = triageList
      .filter((t) => t.triage)
      .sort(
        (a, b) =>
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      );

    return sorted.length > 0 ? sorted[0].triage : null;
  }

  getTriageColorClass(triage: string | null): string {
    if (!triage) return 'triage-default';

    switch (triage.toLowerCase()) {
      case 'green':
        return 'triage-green';
      case 'yellow':
        return 'triage-yellow';
      case 'red':
        return 'triage-red';
      default:
        return 'triage-default';
    }
  }

  viewDetails(patient: any) {
    console.log('Navigating to patient details:', patient.id);
    this.router.navigate(['/patient-dashboard', patient.id]);
  }
}
