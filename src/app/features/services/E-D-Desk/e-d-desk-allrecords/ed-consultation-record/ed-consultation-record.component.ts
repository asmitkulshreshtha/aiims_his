import { Component } from '@angular/core';
import { MaterialModule } from '../../../../../shared/material/material.module';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-ed-consultation-record',
  imports: [MaterialModule, FormsModule],
  templateUrl: './ed-consultation-record.component.html',
  styleUrl: './ed-consultation-record.component.css'
})
export class EDConsultationRecordComponent {
 callGivenOptions = ['Sr Consultant', 'Jr Doctor', 'Nurse'];
  callGivenTo = '';
  callRespondedAt = '';
  consultantName = '';
  department = '';
  callSeenAt = '';
  specialInstructions = '';

  // Disposition checkboxes
  admitting = false;
  noBedsAvailable = false;
  observation = false;
  crossReferral = false;
  willReview = false;
  discharge = false;
  departments = [
    'Anaesthesiology',
    'Burns and Plastic Surgery',
    'Cardio Thoracic Surgery',
    'Cardiology',
    'Clinical Hematology',
    'Dentistry',
    'Dermatology',
    'Endocrinology And Metabolism',
    'ENT Otorhinolaryngology',
    'Gastroenterology',
    'General Medicine',
    'General Surgery',
    'Medical Oncology'
  ];
  // Route checkboxes
  iv = false;
  oral = false;
  pr = false;
  rt = false;
  id = false;
  sc = false;

  // Frequency checkboxes
  stat = false;
  od = false;
  bd = false;
  tds = false;
  qid = false;

  saveConsultation() {
    const body = {
      callGivenTo: this.callGivenTo,
      callRespondedAt: this.callRespondedAt,
      consultantName: this.consultantName,
      department: this.department,
      callSeenAt: this.callSeenAt,
      disposition: {
        admitting: this.admitting,
        noBedsAvailable: this.noBedsAvailable,
        observation: this.observation,
        crossReferral: this.crossReferral,
        willReview: this.willReview,
        discharge: this.discharge,
      },
      routes: {
        iv: this.iv,
        oral: this.oral,
        pr: this.pr,
        rt: this.rt,
        id: this.id,
        sc: this.sc,
      },
      frequency: {
        stat: this.stat,
        od: this.od,
        bd: this.bd,
        tds: this.tds,
        qid: this.qid,
      },
      specialInstructions: this.specialInstructions,
    };

    console.log('Saving Consultation Record:', body);
    alert('Consultation Saved Successfully!');
  }
}
