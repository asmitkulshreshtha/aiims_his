import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PrimaryAssessmentService } from '../../../../../api/primary-assessment.service';
import { PatientReportService } from './patient-report.service';
@Component({
  selector: 'app-summary',
  imports: [],
  templateUrl: './summary.component.html',
  styleUrl: './summary.component.css',
})
export class SummaryComponent {
  patientData: any;
  patientId: number = 0;

  constructor(
    private primaryAssessmentService: PrimaryAssessmentService,
    private route: ActivatedRoute,
    public patientReportService: PatientReportService // Assuming this service is imported correctly
  ) {}

  ngOnInit() {
    const idFromRoute =
      this.route?.snapshot?.paramMap.get('id') ||
      this.route.parent?.snapshot?.paramMap.get('id');

    if (idFromRoute) {
      this.patientId = +idFromRoute;
      console.log('Patient ID:', this.patientId);

      this.primaryAssessmentService.getSummary(this.patientId).subscribe({
        next: (data: any) => {
          this.patientData = data;
          console.log('✅ Patient Data:', this.patientData);
        },
        error: (err) => {
          console.error('❌ Error loading summary', err);
          alert('Failed to load patient data');
        },
      });
    } else {
      console.error('🚫 No patient ID found in route');
    }
  }

  printPatientData() {
      const renameMap = {
        createdAt: 'creationDate',
        name: 'patientName' 
    };
    this.patientData = this.removeAndRenameFields(this.patientData, renameMap);
    const reportContent =
      this.patientReportService.generatePatientReportHtml(this.patientData) ??
      '';
    console.log('Generated Report Content:', reportContent);
    const printWindow = window.open('', '_blank');
    if (printWindow) {
      printWindow.document.open();
      printWindow.document.write(reportContent);
      printWindow.document.close();
      printWindow.focus();
      setTimeout(() => printWindow.print(), 500);
    } else {
      alert('Popup blocked!');
    }
  }
  





  removeAndRenameFields(data: any, renameMap: any ): any {
    // List of fields to remove
    const fieldsToRemove = ['updatedAt', 'id', 'patientId', 'designation', 'submittedBy', 'patient_id','crNumber'];

    // Handle non-object or null data
    if (typeof data !== 'object' || data === null) {
        return data;
    }

    // Handle arrays
    if (Array.isArray(data)) {
        return data.map(item => this.removeAndRenameFields(item, renameMap));
    }

    // Handle objects
    let newObj: any = {};
    for (const key in data) {
        if (!fieldsToRemove.includes(key)) {
            // Use renamed key if it exists in renameMap, otherwise keep original key
            const newKey = renameMap[key] || key;
            newObj[newKey] = this.removeAndRenameFields(data[key], renameMap);
        }
    }
    return newObj;
}
}
