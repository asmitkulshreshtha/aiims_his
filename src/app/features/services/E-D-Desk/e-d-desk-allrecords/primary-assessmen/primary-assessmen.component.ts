import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MaterialModule } from '../../../../../shared/material/material.module';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-primary-assessmen',
  standalone: true,
  imports: [FormsModule, MaterialModule],
  templateUrl: './primary-assessmen.component.html',
  styleUrl: './primary-assessmen.component.css'
})
export class PrimaryAssessmenComponent {
  grossSounds: string = 'none';
  respEffort: string = 'normal';
  airwayStatus: string = '';
  rr: number | null = null;
  spo2: number | null = null;
  respEffortOther: string = '';
  airEntry: string = '';
  grossSoundsOther: string = '';

  pulseRate: number | null = null;
isRegular: string = '';
crt: number | null = null;
skinType: string = 'warm';
skinOther: string = '';
bp: string = '';
rightArm: string = '';
leftArm: string = '';
circulationOther: string = '';
overallcirculationOther: string = '';
gcsE: number | null = null;
gcsV: number | string | null = null;
gcsM: number | null = null;
gcsTotal: number = 0;
gcsTotalDisplay: string = '';
rightEyeSize: number | null = null;
rightEyeReaction: string | null = null;
leftEyeSize: number | null = null;
leftEyeReaction: string | null = null;
limbAsymmetry: string = '';
facialAsymmetry: string = '';
posturing: string = '';
temperature: number | null = null;
rash: string = '';
cynosis: string = '';
patientId!: string;
constructor(private router: Router, private route: ActivatedRoute) {}
ngOnInit() {
  // this.route.paramMap.subscribe(params => {
  //   const id = params.get('id');
  //   if (id !== null) {
  //     this.patientId = id;
  //   } else {
  //     console.error('❌ ID not available');
  //   }
  // });
}

calculateGcsTotal() {
  const e = typeof this.gcsE === 'number' ? this.gcsE : 0;
  const m = typeof this.gcsM === 'number' ? this.gcsM : 0;

  let total = e + m;
  let vText = '';

  if (typeof this.gcsV === 'number') {
    total += this.gcsV;
  } else if (this.gcsV === 'T') {
    vText = 'T';
  }

  this.gcsTotalDisplay = total + vText;
}

onSave() {
  const data = {
    airwayStatus: this.airwayStatus,
    rr: this.rr,
    spo2: this.spo2,
    respEffort: this.respEffort,
    respEffortOther: this.respEffortOther,
    grossSounds: this.grossSounds,
    grossSoundsOther: this.grossSoundsOther,
    airEntry: this.airEntry,
    pulseRate: this.pulseRate,
    isRegular: this.isRegular,
    crt: this.crt,
    skinType: this.skinType,
    skinOther: this.skinOther,
    bp: this.bp,
    rightArm: this.rightArm,
    leftArm: this.leftArm,
    circulationOther: this.circulationOther,
    overallcirculationOther: this.overallcirculationOther,
    gcsE: this.gcsE,
    gcsV: this.gcsV,
    gcsM: this.gcsM,
    gcsTotalDisplay: this.gcsTotalDisplay,
    rightEyeSize: this.rightEyeSize,
    rightEyeReaction: this.rightEyeReaction,
    leftEyeSize: this.leftEyeSize,
    leftEyeReaction: this.leftEyeReaction,
    limbAsymmetry: this.limbAsymmetry,
    facialAsymmetry: this.facialAsymmetry,
    posturing: this.posturing,
    temperature: this.temperature,
    rash: this.rash,
    cynosis: this.cynosis
  };

  const hasAnyValue = Object.values(data).some(value => value !== null && value !== '' && value !== undefined);

  if (hasAnyValue) {
    console.log('Saving form data:', data);
    localStorage.setItem(`primaryAssessment_${this.patientId}`, JSON.stringify(data));
    console.log('✅ Form data saved to localStorage');
  } else {
    console.warn('⚠️ No data entered to save');
  }
}


onCancel() {
  if (this.patientId) {
    this.router.navigate(['/patient-dashboard', this.patientId]);
  } else {
    console.error('❌ ID not available');
  }
}

  onReset() {
    this.grossSounds = 'none';
    this.respEffort = 'normal';
    this.airwayStatus = '';
    this.rr = null;
    this.spo2 = null;
    this.respEffortOther = '';
    this.airEntry = '';
    this.grossSoundsOther = '';
    this.pulseRate = null;
    this.isRegular = '';
    this.crt = null;
    this.skinType = 'warm';
    this.skinOther = '';
    this.bp = '';
    this.rightArm = '';
    this.leftArm = '';
    this.circulationOther = '';
    this.overallcirculationOther = '';
    this.gcsE = null;
    this.gcsV = null;
    this.gcsM = null;
    this.gcsTotal = 0;
    this.gcsTotalDisplay = '';
    this.rightEyeSize = null;
    this.rightEyeReaction = null;
    this.leftEyeSize = null;
    this.leftEyeReaction = null;
    this.limbAsymmetry = '';
    this.facialAsymmetry = '';
    this.posturing = '';
    this.temperature = null;
    this.rash = '';
    this.cynosis = '';
  }
}
