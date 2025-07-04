import { Component, OnInit } from '@angular/core';
import { MaterialModule } from '../../../../../shared/material/material.module';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
@Component({
  selector: 'app-doctor-notes',
  standalone: true,
  imports: [MaterialModule, FormsModule, ],
  templateUrl: './doctor-notes.component.html',
  styleUrl: './doctor-notes.component.css'
})
export class DoctorNotesComponent implements OnInit {
  patientData = {
    id: 12,
    name: 'YAMINI VERMA R',
    age: 27,
    gender: 'Female',
    cr_number: '345',
    category: 'OBC',
    department: 'Trauma & Emergency',
    createdAt: '2025-06-23T05:24:14.338Z'
  };
showEmergencyFields: boolean = true;
selectedTemplate: string = '';
   doctorName = 'Dr. Roshan'; 
  designation = 'Senior Resident';
  currentDate = new Date().toLocaleDateString();
  currentTime = new Date().toLocaleTimeString();
    chiefComplains = '';
  presentIllnessHistory = '';
  reviewOfSymptom = '';
  progressionOfSymptoms = '';
  whyToday = '';
  generalExamination = '';
  systemicExamination = '';
  investigationFindings = '';
  provisionalDx = '';
  managementPlan = '';
  patientId!: string;
  showProgressNote: boolean = true;

progressDiagnosis: string = '';
currentCondition: string = '';
progressPulse: number | null = null;
progressBp: string = '';
progressRr: number | null = null;
progressSpo2: number | null = null;
painScore: number | null = null;
gcsScore: number | null = null;
bloodTest: string = '';
imagingTest: string = '';
furtherPlan: string = '';

ahoType = '';
placeOfEvent = '';
dateOfInjury: any;
timeOfInjury = '';
mechanismOfInjury = '';
mlcNo = '';
presentingComplaints = '';
lossOfConsciousness = '';
entBleed = '';
amnesia = '';
seizures = '';
vomiting = '';
injuryDetails = '';
allergyHistory = '';
medicationHistory = '';
pastHistory = '';
lmp = '';
upt = '';
lastMeal = '';
priorTreatment = '';
xrayAdvised = false;
ctAdvised = false;
mriAdvised = false;
treatmentPlan = '';


  constructor(private router: Router, private route: ActivatedRoute) {}
  ngOnInit() {
  const paramMapSource = this.route.parent ? this.route.parent.paramMap : this.route.paramMap;
  paramMapSource.subscribe(params => {
    const id = params.get('id');
    if (id !== null) {
      this.patientId = id;
      // ...your logic...
    } else {
      console.error('❌ ID not available');
    }
  });
}

 onSave() {
  const dataToSave = {
    chiefComplains: this.chiefComplains,
    presentIllnessHistory: this.presentIllnessHistory,
    reviewOfSymptom: this.reviewOfSymptom,
    progressionOfSymptoms: this.progressionOfSymptoms,
    whyToday: this.whyToday,
    generalExamination: this.generalExamination,
    systemicExamination: this.systemicExamination,
    investigationFindings: this.investigationFindings,
    provisionalDx: this.provisionalDx,
    managementPlan: this.managementPlan,

    // Progress Note fields
    progressDiagnosis: this.progressDiagnosis,
    currentCondition: this.currentCondition,
    progressPulse: this.progressPulse,
    progressBp: this.progressBp,
    progressRr: this.progressRr,
    progressSpo2: this.progressSpo2,
    painScore: this.painScore,
    gcsScore: this.gcsScore
  };

  localStorage.setItem(`doctorNotes_${this.patientId}`, JSON.stringify(dataToSave));
  console.log('✅ Saved doctor notes with progress note');
}


onCancel() {
  this.router.navigate(['/']); 
}

onReset() {
  this.chiefComplains = '';
  this.presentIllnessHistory = '';
  this.reviewOfSymptom = '';
  this.progressionOfSymptoms = '';
  this.whyToday = '';
  this.generalExamination = '';
  this.systemicExamination = '';
  this.investigationFindings = '';
  this.provisionalDx = '';
  this.managementPlan = '';
  this.showProgressNote = true; 
  this.progressDiagnosis = '';
  this.currentCondition = '';
  this.progressPulse = null;
  this.progressBp = '';
  this.progressRr = null;
  this.progressSpo2 = null;
  this.painScore = null;
  this.gcsScore = null;
  this.bloodTest = '';
  this.imagingTest = '';
  this.furtherPlan ='';
this.ahoType = '';
this.placeOfEvent = '';
// this.dateOfInjury :any;
this.timeOfInjury = '';
this.mechanismOfInjury = '';
this.mlcNo = '';
this.presentingComplaints = '';
this.lossOfConsciousness = '';
this.entBleed = '';
this.amnesia = '';
this.seizures = '';
this.vomiting = '';
this.injuryDetails = '';
this.allergyHistory = '';
this.medicationHistory = '';
this.pastHistory = '';
this.lmp = '';
this.upt = '';
this.lastMeal = '';
this.priorTreatment = '';
this.xrayAdvised = false;
this.ctAdvised = false;
this.mriAdvised = false;
this.treatmentPlan = '';

}

}
