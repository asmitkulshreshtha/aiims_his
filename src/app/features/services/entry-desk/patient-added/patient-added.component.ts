import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { PatientService } from '../../../../api/patient.service';
import { MaterialModule } from '../../../../shared/material/material.module';
import { HeaderComponent } from '../../../header/header.component';

@Component({
  selector: 'app-patient-added',
  standalone: true,
  imports: [CommonModule, MaterialModule, ReactiveFormsModule, HeaderComponent],
  templateUrl: './patient-added.component.html',
  styleUrl: './patient-added.component.css'
})
export class PatientAddedComponent implements OnInit {
  patientForm: any;
  successMessage: string = '';
  isSubmitting: boolean = false;

  constructor(public fb: FormBuilder, public patientService: PatientService) {}

  ngOnInit() {
    this.patientForm = this.fb.group({
      name: ['', Validators.required],
      crNumber: ['', Validators.required],
      gender: ['', Validators.required],
      age: ['', Validators.required],
      category: ['', Validators.required],
      department: ['', Validators.required],
      room: ['', Validators.required],
      visitDate: ['', Validators.required],
      visitTime: ['', Validators.required]
    });
  }

  onSubmit() {
    if (this.patientForm.valid) {
      this.isSubmitting = true;

      const formValue = this.patientForm.value;
      const patientData = {
        ...formValue,
        visitDateTime: new Date(`${formValue.visitDate}T${formValue.visitTime}`).toISOString()
      };

      this.patientService.addPatient(patientData).subscribe(
        response => {
          console.log('✅ Patient added successfully', response);
          this.successMessage = '✅ Patient added successfully!';
          
          setTimeout(() => {
            this.successMessage = '';
            this.patientForm.reset();
            this.isSubmitting = false;
          }, 3000);
        },
        error => {
          console.error('❌ Error adding patient', error);
          this.successMessage = '❌ Error while adding patient!';
          
          setTimeout(() => {
            this.successMessage = '';
            this.isSubmitting = false;
          }, 3000);
        }
      );
    }
  }
}
