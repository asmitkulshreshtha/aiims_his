import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { PatientService } from '../../../../api/patient.service';
import { MaterialModule } from '../../../../shared/material/material.module';
import { HeaderComponent } from '../../../header/header.component';

@Component({
  selector: 'app-patient-added',
  standalone: true,
  imports: [CommonModule, MaterialModule, ReactiveFormsModule , HeaderComponent],
  templateUrl: './patient-added.component.html',
  styleUrl: './patient-added.component.css'
})
export class PatientAddedComponent implements OnInit {
  patientForm: any;

  constructor(public fb: FormBuilder, public patientService: PatientService) {}

  ngOnInit() {
    this.patientForm = this.fb.group({
      queNo: ['', Validators.required],
      patientName: ['', Validators.required],
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
    console.log('Form submitted:');
    if (this.patientForm) {
      const formValue = this.patientForm.value;
      const visitDateTime = new Date(`${formValue.visitDate}T${formValue.visitTime}`);

      const patientData = {
        ...formValue,
        visitDateTime: visitDateTime.toISOString()
      };

      delete patientData.visitDate;
      delete patientData.visitTime;

      this.patientService.addPatient(patientData).subscribe(
        response => console.log('Patient added successfully', response),
        error => console.error('Error adding patient', error)
      );
    }
  }
}

