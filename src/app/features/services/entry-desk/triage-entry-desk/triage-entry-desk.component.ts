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
  imports: [CommonModule, MaterialModule, ReactiveFormsModule, HttpClientModule , HeaderComponent],
  templateUrl: './triage-entry-desk.component.html',
  styleUrl: './triage-entry-desk.component.css'
})
export class TriageEntryDeskComponent implements OnInit {
  patient: any;
  triageForm: any;
 isMenuOpen = false;
  constructor(
    public route: ActivatedRoute,
    public router: Router,
    public patientService: PatientService,
    public fb: FormBuilder
  ) {
    this.triageForm = this.fb.group({
      emergency: ['', Validators.required],
      emergencyType: [''],  // ✅ New field
      type: ['', Validators.required],
      date: ['', Validators.required],
      time: ['', Validators.required],
      shiftedTo: ['', Validators.required],
      triageNotes: [''],
      status: ['', Validators.required],
      hr: [null],
      bp: [''],
      rr: [null],
      spo2: [null],
      complaints: [''],
      rbs: [null],
    });

  }

  ngOnInit() {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.patientService.getPatientById(id).subscribe((data: any) => {
      this.patient = data;
      if (data) {
        this.triageForm.patchValue({
          emergency: data.emergency || '',
          emergencyType: data.emergencyType || '',
          type: data.type || '',
          date: data.date || '',
          time: data.time || '',
          shiftedTo: data.shiftedTo || '',
          triageNotes: data.triageNotes || '',
          status: data.status || '',
          hr: data.hr || '',
          bp: data.bp || '',
          rr: data.rr || '',
          spo2: data.spo2 || '',
          complaints: data.complaints || '',
          rbs: data.rbs || '',
        });
      }
    });
  }
 toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }
  saveTriageInfo() {
    if (this.triageForm.valid && this.patient) {
      const updatedPatient: any = {
        ...this.patient,
        ...this.triageForm.value
      };
      this.patientService.updatePatient(updatedPatient).subscribe(
        response => {
          this.patient = response;
          console.log('Patient updated successfully', response);
          this.router.navigate(['/patient-list']);
        },
        error => console.error('Error updating patient', error)
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
