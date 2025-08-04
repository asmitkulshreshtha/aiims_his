import { Component, OnInit } from '@angular/core';
import { PatientService } from '../../../../api/patient.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MaterialModule } from '../../../../shared/material/material.module';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
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

  constructor(
    public route: ActivatedRoute,
    public router: Router,
    public patientService: PatientService,
    public fb: FormBuilder
  ) {
    this.triageForm = this.fb.group({
      // emergency: ['', Validators.required],
      status: ['', Validators.required],
      spo2: [null],
      hr: [''], // Capital H matches JSON
      bp: [''],
      rr: [null],
      rbs: [null],
      emergencyType: [''],
      date: ['', Validators.required],
      time: ['', Validators.required],
      triage: [''],
      triageNotes: [''],
    });
  }

  ngOnInit() {
    const id = Number(this.route?.snapshot?.paramMap.get('id'));
    this.patientService?.getPatientById(id).subscribe((data: any) => {
      console.log('Patient data fetched:', data);
      this.patient = data;

      // Get current date and time
      const now = new Date();
      const currentDate = now.toISOString().substring(0, 10);
      const currentTime = now.toTimeString().substring(0, 5);

      // Patch values
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
        rbs: data.rbs || '',
      });
    });
  }

  /*************  ✨ Windsurf Command ⭐  *************/
  /**
   * Toggles the menu open or closed. Used by the menu toggle button.
   * @returns {void}
   */
  /*******  7570077a-cc33-4e34-9ca0-fde2c59f4133  *******/ toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }

  saveTriageInfo() {
    this.successMessage = '';
    this.isSubmitting = true;

    console.log('Form submitted with values:', this.triageForm?.value);
    if (this.patient) {
      this.patientService
        .addTriage(this.patient.id, this.triageForm.value)
        .subscribe(
          (response) => {
            console.log('Patient updated successfully', response);
            this.successMessage = '✅ Patient details saved successfully!';
            this.isSubmitting = false;

            setTimeout(() => {
              this.router.navigate(['/prepare-summary', this.patient?.id]);
            }, 2000);
          },
          (error) => {
            console.error('Error updating patient', error);
            this.successMessage = '❌ saving patient data. Please try again.';
            this.isSubmitting = false;
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
