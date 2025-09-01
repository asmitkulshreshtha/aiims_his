import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { VitalsService } from '../../../../api/vitals.service';
import { MaterialModule } from '../../../../shared/material/material.module';

@Component({
  selector: 'app-vitals-recording',
  standalone: true,
  imports: [
    FormsModule,
    CommonModule,
    MaterialModule
  ],
  templateUrl: './vitals-recording.component.html',
  styleUrls: ['./vitals-recording.component.css']
})
export class VitalsRecordingComponent {
  patientId!: number;
  patient: any = null;

  vitalsData: any = {
    weightKg: null,
    heightCm: null,
    bmi: null,
    temperature: null,
    pulseRate: null,
    respiration: null,
    systolicBP: null,
    diastolicBP: null,
    meanBloodPressure: null,
    spo2: null,
    allergies: '',
    rbs: null,
    time: ''
  };

  vitalsRecords: any[] = [];

  constructor(
    private route: ActivatedRoute,
    private vitalsService: VitalsService
  ) {}

  ngOnInit() {
    const idParam = this.route?.snapshot?.paramMap.get('id') || this.route?.parent?.snapshot?.paramMap.get('id');
    this.patientId = idParam ? +idParam : NaN;

    if (isNaN(this.patientId)) return;

    this.loadVitals(this.patientId);
  }

  calculateBMI() {
    if (this.vitalsData.weightKg && this.vitalsData.heightCm) {
      const heightM = this.vitalsData.heightCm / 100;
      this.vitalsData.bmi = +(this.vitalsData.weightKg / (heightM * heightM)).toFixed(2);
    }
  }

  saveVitals() {
    const body = { ...this.vitalsData, patientId: this.patientId };
    this.vitalsService.saveVitals(body).subscribe({
      next: res => {
        console.log('Vitals saved:', res);
        this.loadVitals(this.patientId); // refresh
      },
      error: err => console.error('Error saving vitals', err)
    });
  }

  loadVitals(patientId: number) {
    this.vitalsService.getVitals(patientId).subscribe({
      next: (res: any) => {
        console.log('Vitals records:', res);
        this.vitalsRecords = res.data || [];
      },
      error: err => console.error('Error fetching vitals', err)
    });
  }
}
