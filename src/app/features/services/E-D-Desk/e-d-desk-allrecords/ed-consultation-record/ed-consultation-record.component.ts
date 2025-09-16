import { Component } from '@angular/core';
import { MaterialModule } from '../../../../../shared/material/material.module';
import { FormsModule } from '@angular/forms';
import { EdConsultationService } from '../../../../../api/ed-consultation.service';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '../../../../../api/auth.service';

@Component({
  selector: 'app-ed-consultation-record',
  imports: [MaterialModule, FormsModule],
  templateUrl: './ed-consultation-record.component.html',
  styleUrl: './ed-consultation-record.component.css'
})
export class EDConsultationRecordComponent {
  // ✅ Backend fields
  patientId!: number;
  department: string = '';
  callRespondedAt: string = '';
  consultantName: string = '';
  callGivenTo: string = '';
  callSeenAt: string = '';
  dispositionPlan: string = '';
  consultationImage: File | null = null;
  submittedBy: string = '';
  designation: string = '';

  // ✅ Store fetched consultations
  consultations: any[] = [];

  // Dropdown data
  callGivenOptions = ['Jr', 'Sr', 'Faculty'];
  departments = [
    'Anaesthesiology', 'Cardiology', 'Dermatology', 'Neurology',
    'Psychiatry', 'Radiology', 'Surgery', 'Urology'
  ];

  constructor(
    private consultationService: EdConsultationService,
    private route: ActivatedRoute,
    private authService: AuthService
  ) {}

  ngOnInit() {
    const idParam =
      this.route?.snapshot?.paramMap.get('id') ||
      this.route?.parent?.snapshot?.paramMap.get('id');

    this.patientId = idParam ? +idParam : NaN;
    console.log('✅ Patient ID from route:', this.patientId);

    const user = this.authService.getCurrentUserFromToken();
    this.submittedBy = user?.user || 'Current User';
    this.designation = user?.designation || 'Doctor';

    // 🔹 Get old consultation records
    this.getConsultations();
  }

  onFileSelected(event: any) {
    const file: File = event.target.files[0];
    if (file) {
      this.consultationImage = file;
      console.log('📂 File Selected:', file.name);
    }
  }

  saveConsultation() {
    const body = {
      patientId: this.patientId,
      department: this.department,
      callRespondedAt: this.callRespondedAt,
      consultantName: this.consultantName,
      callGivenTo: this.callGivenTo,
      callSeenAt: this.callSeenAt,
      dispositionPlan: this.dispositionPlan,
      submittedBy: this.submittedBy,
      designation: this.designation
    };

    this.consultationService
      .saveConsultation(body, this.consultationImage || undefined)
      .subscribe({
        next: (res: any) => {
          console.log('✅ Consultation Saved:', res);
          alert('Consultation Saved Successfully!');
          this.getConsultations(); 
        },
        error: (err: any) => {
          console.error('❌ Error Saving Consultation:', err);
        }
      });
  }

 getConsultations() {
  if (!this.patientId) return;

  this.consultationService.getConsultationByPatientId(this.patientId.toString())
    .subscribe({
      next: (res: any) => {
        console.log('📋 Consultations API Response:', res);
        this.consultations = res?.data || [];  
      },
      error: (err: any) => {
        console.error('❌ Error fetching consultations:', err);
      }
    });
}

}
