import { Component, OnInit } from '@angular/core';
import { MaterialModule } from '../../../../../shared/material/material.module';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { TemplateService } from '../../../../../api/template.service';
import { AuthService } from '../../../../../api/auth.service';
import { PatientService } from '../../../../../api/patient.service';
import { Console } from 'console';
@Component({
  selector: 'app-discharge',
  standalone: true,
  imports: [MaterialModule, FormsModule],
  templateUrl: './discharge.component.html',
  styleUrl: './discharge.component.css',
})
export class DischargeComponent {
  selectedTemplate = '';
  patientId!: number;
  patient: any;
  isLoading = true;
  modalImage: string | null = null;
  // Transfer Out Slip
  transfer = {
    name: '',
    age: '',
    sex: '',
    guardian_name: '',
    address: '',
    referred_date: '',
    referred_time: '',
    referred_to_facility: '',
    transfer_provisional_diagnosis: '',
    transfer_attended_date: '',
    transfer_attended_time: '',
    chief_complaints: '',
    reason_for_referral: '',
    condition_at_referral: 'Stable',
    treatment_received: '',
    referring_physician_name: '',
    referring_physician_designation: '',
  };
  transferSlips: any[] = [];
  // Discharge Summary
  discharge = {
    name: '',
    age: '',
    sex: '',
    guardian_name: '',
    address: '',
    discharge_clinical_course: '',
    discharge_provisional_diagnosis: '',
    pulse: '',
    blood_pressure: '',
    respiratory_rate: '',
    spo2: '',
    pain_score: '',
    gcs: '',
    discharge_advice: '',
  };
  dischargeSummaries: any[] = [];

  // LAMA
  lama: any = {
    name: '',
    age: '',
    sex: '',
    guardian_name: '',
    address: '',
    lama_consent_document: null,
  };
  lamaFile: File | null = null;
  lamaConsents: any[] = [];

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    public templateService: TemplateService,
    public authService: AuthService,
    public patientService: PatientService
  ) {}

  ngOnInit() {
    const idParam =
      this.route?.snapshot?.paramMap.get('id') ||
      this.route?.parent?.snapshot?.paramMap.get('id');
    this.patientId = idParam ? +idParam : NaN;

    if (isNaN(this.patientId)) {
      console.error('❌ Invalid patient ID');
      this.isLoading = false;
      return;
    }

    this.loadData();
  }

  loadData() {
    this.isLoading = true;

    this.patientService.getPatientById(this.patientId).subscribe({
      next: (data: any) => {
        this.patient = data;

        // 👇 Copy data into all templates
        this.copyPatientDetailsTo(this.transfer);
        this.copyPatientDetailsTo(this.discharge);
        this.copyPatientDetailsTo(this.lama);

        this.isLoading = false;
      },
      error: (err: any) => {
        console.error('Patient fetch error:', err);
        this.isLoading = false;
      },
    });

    this.getDischargeSummaries();
    this.getTransferSlips();
    this.getLamaConsent(this.patientId);
  }

  copyPatientDetailsTo(target: any) {
    if (!this.patient) return;

    target.name = this.patient.name || '';
    target.address = this.patient.address || '';
    target.age = this.patient.age || '';
    target.sex = this.patient.gender || '';
    target.guardian_name = this.patient.guardianName || '';
  }

  getDischargeSummaries() {
    this.templateService.getDischargeSummary(this.patientId).subscribe({
      next: (res: any) => {
        this.dischargeSummaries = res.data.map((d: any) => ({
          ...d,
          showDetails: false,
        }));
      },
      error: (err: any) => {
        console.error('❌ Error fetching discharge summaries:', err);
      },
    });
  }
  getTransferSlips() {
    this.templateService.getTransferOutSlip(this.patientId).subscribe({
      next: (res: any) => {
        console.log('📦 Transfer Slip Data:', res.data);
        this.transferSlips = res.data.map((slip: any) => ({
          ...slip,
          showDetails: false,
        }));
      },
      error: (err: any) => console.error('❌ Transfer Out fetch error:', err),
    });
  }
  //  Save Transfer Slip
  onSaveTransferSlip() {
    const data = {
      patientId: this.patientId,
      ...this.transfer,
    };

    console.log('Transfer slip data:', data);

    this.templateService.transferOutSlipData(data).subscribe({
      next: (res: any) => {
        console.log('✅ Transfer slip saved:', res);
        this.getTransferSlips();
        // Optionally reset: this.transfer = { ...initial values }
      },
      error: (err: any) => {
        console.error('❌ Transfer slip save error:', err);
      },
    });
  }

  // Save Discharge Summary
  onSaveDischargeSummary() {
    const data = {
      patientId: this.patientId,
      ...this.discharge,
    };

    console.log('Discharge Summary data:', data);

    this.templateService.dischargeSummary(data).subscribe({
      next: (res: any) => {
        console.log('Discharge Summary saved:', res);
        this.getDischargeSummaries();
      },
      error: (err: any) => {
        console.error('Error saving Discharge Summary:', err);
      },
    });
  }
  // Save LAMA
  onLamaFileSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.lamaFile = file;
    }
  }

  onSaveLamaConsent() {
    console.log('Saving LAMA Consent for patient ID:', this.patientId);
    const formData = new FormData();

    formData.append('patientId', this.patientId.toString());
    formData.append('name', this.lama.name);
    formData.append('age', this.lama.age);
    formData.append('sex', this.lama.sex);
    formData.append('guardian_name', this.lama.guardian_name);
    formData.append('address', this.lama.address);

    if (this.lamaFile) {
      //  Change field name here
      formData.append('lamaConsentDocument', this.lamaFile);
    }

    this.templateService.saveLamaConsent(formData).subscribe({
      next: (res: any) => {
        console.log('✅ LAMA Consent saved:', res);
        this.getLamaConsent(this.patientId);
      },
      error: (err: any) => {
        console.error('❌ Error saving LAMA Consent:', err);
      },
    });
  }

  getLamaConsent(patientId: number = this.patientId) {
    // if (patientId) {
    //   console.warn('❗ Patient ID missing for LAMA fetch');
    //   return;
    // }
    console.log('Fetching LAMA Consent for patient ID:', patientId);
    this.templateService.getLamaConsent(this.patientId).subscribe({
      next: (res: any) => {
        console.log('📦 LAMA API response:', res);

        const latestConsent = res.data?.[res.data.length - 1]; 
        if (latestConsent) {
          console.log('Latest LAMA Consent:', latestConsent);
          this.lama = {
            ...latestConsent,
            showDetails: false,
          };
        }
      },
      error: (err: any) => {
        console.error('❌ Error fetching LAMA Consent:', err);
      },
    });
  }

  openImageModal(imagePath: string): void {
    this.modalImage = imagePath;
  }

  closeImageModal(): void {
    this.modalImage = null;
  }
}
