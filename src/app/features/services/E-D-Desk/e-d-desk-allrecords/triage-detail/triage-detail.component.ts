import { Component, OnInit } from '@angular/core';
import { PatientService } from '../../../../../api/patient.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { MaterialModule } from '../../../../../shared/material/material.module';
@Component({
  selector: 'app-triage-detail',
    imports: [FormsModule, MaterialModule],
  standalone: true,
  templateUrl: './triage-detail.component.html',
  styleUrls: ['./triage-detail.component.css'] 
})
export class TriageDetailComponent implements OnInit {
  patient: any;
  triageForm: FormGroup;
  isMenuOpen = false;
  successMessage = '';
  isSubmitting = false;

  displayedColumns: string[] = ['triage', 'triageNotes', 'date', 'time'];

  triageData = [
    { triage: "GREEN", triageNotes: "zsxdftgyh xcv", date: "2025-06-27", time: "12:33:00", patient_id: 13 },
    { triage: "GREEN", triageNotes: "xdfgvh cgvh", date: "2024-02-02", time: "00:23:00", patient_id: 13 },
    { triage: "GREEN", triageNotes: "bhyf uhfvbuhf", date: "2025-12-22", time: "00:22:00", patient_id: 13 },
    { triage: "GREEN", triageNotes: "qASDFG", date: "2025-02-02", time: "00:11:00", patient_id: 13 },
    { triage: "BLACK", triageNotes: "vgh b", date: "2025-02-02", time: "02:22:00", patient_id: 13 },
    { triage: "RED", triageNotes: "all data", date: "2025-02-02", time: "11:14:00", patient_id: 13 }
  ];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private patientService: PatientService,
    private fb: FormBuilder
  ) {
    this.triageForm = this.fb.group({
      status: ['', Validators.required],
      spo2: [null],
      hr: [''],
      bp: [''],
      rr: [null],
      rbs: [null],
      emergencyType: [''],
      date: ['', Validators.required],
      time: ['', Validators.required],
      triage: [''],
      triageNotes: ['']
    });
  }

  ngOnInit(): void {
    const id = Number(this.route.parent?.snapshot.paramMap.get('id'));
    console.log('Fetching patient with ID:', id);

    this.patientService.getPatientById(id).subscribe((data: any) => {
      console.log('Patient data fetched:', data);
      this.patient = data;

      const now = new Date();
      const currentDate = now.toISOString().substring(0, 10);
      const currentTime = now.toTimeString().substring(0, 5);

      this.triageForm.patchValue({
        emergencyType: data.emergencyType || '',
        date: data.date || currentDate,
        time: data.time || currentTime,
        triageNotes: data.triageNotes || '',
        status: data.status || '',
        hr: data.hr || '',
        bp: data.bp || '',
        rr: data.rr || '',
        spo2: data.spo2 || '',
        rbs: data.rbs || ''
      });
    });
  }

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }

  saveTriageInfo() {
    this.successMessage = '';
    this.isSubmitting = true;

    console.log('Form submitted with values:', this.triageForm.value);

    if (this.patient) {
      const updatedPatient: any = {
        ...this.patient,
        ...this.triageForm.value
      };

      this.patientService.updatePatient(updatedPatient).subscribe(
        response => {
          console.log('Patient updated successfully', response);
          this.successMessage = '✅ Patient details saved successfully!';
          this.isSubmitting = false;

          setTimeout(() => {
            this.router.navigate(['/prepare-summary', this.patient.id]);
          }, 2000);
        },
        error => {
          console.error('Error updating patient', error);
          this.successMessage = '❌ Error saving patient data. Please try again.';
          setTimeout(() => {
            this.successMessage = '';
            this.isSubmitting = false;
          }, 4000);
        }
      );
    }
  }

  clearForm() {
    this.triageForm.reset();
  }

  cancel() {
    this.router.navigate(['/patient-list']);
  }
}
