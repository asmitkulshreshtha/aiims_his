import { Component, OnInit } from '@angular/core';
import { PatientService } from '../../../../api/patient.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MaterialModule } from '../../../../shared/material/material.module';
import {
  FormBuilder,
  ReactiveFormsModule,
  Validators,
  FormArray,
} from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from '../../../header/header.component';

@Component({
  selector: 'app-triage-entry-desk',
  standalone: true,
  imports: [
    CommonModule,
    MaterialModule,
    ReactiveFormsModule,
    HttpClientModule,
    HeaderComponent,
  ],
  templateUrl: './triage-entry-desk.component.html',
  styleUrl: './triage-entry-desk.component.css',
})
export class TriageEntryDeskComponent implements OnInit {
  patient: any;
  triageForm: any;
  isMenuOpen = false;
  successMessage = '';
  isSubmitting = false;
  isPdfOpen = false;
  mode: string = '';
  constructor(
    public route: ActivatedRoute,
    public router: Router,
    public patientService: PatientService,
    public fb: FormBuilder
  ) {
    this.triageForm = this.fb.group({
      status: ['', Validators.required],
      spo2: [
        null,
        [Validators.required, Validators.min(0), Validators.max(100)],
      ],
      pulse: [
        '',
        [Validators.required, Validators.min(0), Validators.max(300)],
      ],
      dbp: ['', [Validators.required, Validators.min(0), Validators.max(200)]],
      sbp: ['', [Validators.required, Validators.min(0), Validators.max(300)]],
      rr: [null, [Validators.required, Validators.min(0), Validators.max(80)]],
      temp: [
        null,
        [Validators.required, Validators.min(0), Validators.max(120)],
      ],
      emergencyType: ['NON-TRAUMA'],
      triage: ['GREEN'],
      triageNotes: [''],
      arrivalMode: ['', Validators.required],
      referralStatus: ['', Validators.required],
      complaints: this.fb.array([]),
      triageTimeStamp: [new Date().toISOString()],
      submittedBy: [''],
      designation: [''],
    });
  }

  ngOnInit() {
    this.route.queryParams.subscribe((params) => {
      this.mode = params['mode'];

      console.log(this.mode);
    });

    const id = Number(this.route?.snapshot?.paramMap.get('id'));
    this.patientService?.getPatientById(id).subscribe((data: any) => {
      this.patient = data;

      this.triageForm.patchValue({
        status: data.status || '',
        spo2: data.spo2 || null,
        pulse: data.pulse || '',
        dbp: data.dbp || '',
        sbp: data.sbp || '',
        rr: data.rr || null,
        temp: data.temp || null,
        emergencyType: data.emergencyType || 'NON-TRAUMA',
        triage: data.triage || 'GREEN',
        triageNotes: data.triageNotes || '',
        arrivalMode: data.arrivalMode || '',
        referralStatus: data.referralStatus || '',
        triageTimeStamp: data.triageTimeStamp || new Date().toISOString(),
        submittedBy: data.submittedBy || '',
        designation: data.designation || '',
      });

      if (data.complaints && data.complaints.length > 0) {
        data.complaints.forEach((c: any) => {
          this.complaints.push(
            this.fb.group({
              complaint: c.complaint,
              duration: c.duration,
            })
          );
        });
      }

      if (this.complaints.length === 0) {
        this.addComplaint();
      }
    });
  }

  get complaints(): FormArray {
    return this.triageForm.get('complaints') as FormArray;
  }

  addComplaint() {
    this.complaints.push(
      this.fb.group({
        complaint: ['', Validators.required],
        duration: ['', Validators.required],
      })
    );
  }

  removeComplaint(index: number) {
    if (this.complaints.length > 1) {
      this.complaints.removeAt(index);
    }
  }

  saveTriageInfo() {
    this.successMessage = '';
    this.isSubmitting = true;

    if (this.triageForm.invalid) {
      this.successMessage = '❌ Please fill all required fields.';
      this.isSubmitting = false;
      this.triageForm.markAllAsTouched();
      setTimeout(() => {
        this.successMessage = '';
      }, 3000);
      return;
    }

    const payload = this.triageForm.value;

    if (this.patient) {
      this.patientService.addTriage(this.patient.id, payload).subscribe(
        (response) => {
          this.successMessage = '✅ Patient details saved successfully!';
          this.isSubmitting = false;
          if (this.mode === 'e') {
            setTimeout(() => {
              this.router.navigate(['/ed-desk/patient-details']);
            }, 2000);
          } else {
            console.log('Patient updated:', response);
            setTimeout(() => {
              this.router.navigate(['/triage-list']);
            }, 2000);
          }
        },
        (error) => {
          console.error('Error updating patient', error);
          this.successMessage =
            '❌ Error saving patient data. Please try again.';
          this.isSubmitting = false;
        }
      );
    }
  }

  saveDraft() {
    console.log('Draft Saved:', this.triageForm.value);
    this.successMessage = '📝 Draft saved successfully!';
  }

  clearForm() {
    this.triageForm.reset();
  }

  cancel() {
    this.router.navigate(['/triage-list']);
  }

  openPdf() {
    this.isPdfOpen = true;
  }

  closePdf() {
    this.isPdfOpen = false;
  }

  closeOnOutside(event: MouseEvent) {
    if ((event.target as HTMLElement).classList.contains('modal')) {
      this.closePdf();
    }
  }
}
