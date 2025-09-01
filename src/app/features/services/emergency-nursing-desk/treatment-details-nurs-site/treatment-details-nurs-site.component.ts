import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { TreatmentService } from '../../../../api/treatment.service';
import { ActivatedRoute } from '@angular/router';
import { PatientService } from '../../../../api/patient.service';
import { AuthService } from '../../../../api/auth.service';
import { MaterialModule } from '../../../../shared/material/material.module';

@Component({
  selector: 'app-treatment-details-nurs-site',
  imports: [
    CommonModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSlideToggleModule,
    MaterialModule,
  ],
  templateUrl: './treatment-details-nurs-site.component.html',
  styleUrl: './treatment-details-nurs-site.component.css',
})
export class TreatmentDetailsNursSiteComponent {
  patientId!: number;
  patient: any = null;
  treatments: any[] = [];

  constructor(
    private treatmentService: TreatmentService,
    private route: ActivatedRoute,
    public patientService: PatientService,
    private authService: AuthService
  ) {}

  ngOnInit() {
    const idParam =
      this.route?.snapshot?.paramMap.get('id') ||
      this.route?.parent?.snapshot?.paramMap.get('id');

    this.patientId = idParam ? +idParam : NaN;

    if (isNaN(this.patientId)) {
      console.error('❌ Invalid patient ID');
      return;
    }

    console.log('✅ Patient ID from route:', this.patientId);
    this.loadTreatments(this.patientId);
    this.loadPatientDetails();
  }

  loadTreatments(patientId: number) {
    const user = this.authService.getCurrentUserFromToken();
    console.log(
      '🔍 Fetching treatments for patient ID:',
      patientId,
      'User:',
      user
    );
    this.treatmentService.getTreatment(patientId).subscribe({
      next: (res: any) => {
        console.log('✅ Treatments fetched:', res);
        if (res?.data) {
          // agar backend ek object bhejta hai to array banao, agar list bhejta hai to direct use karo
          const records = Array.isArray(res.data) ? res.data : [res.data];
          this.treatments = records.map((r: any) => ({
            ...r,
            submitted_by: r.submitted_by || user?.user || 'Unknown',
            designation: r.designation || user?.designation || 'N/A',
          }));
        } else {
          this.treatments = [];
        }
      },
      error: (err) => {
        console.error('❌ Error fetching treatments:', err);
      },
    });
  }

  loadPatientDetails() {
    this.patientService.getPatientById(this.patientId).subscribe({
      next: (data: any) => (this.patient = data),
      error: (err: any) => console.error('Patient fetch error:', err),
    });
  }
}
