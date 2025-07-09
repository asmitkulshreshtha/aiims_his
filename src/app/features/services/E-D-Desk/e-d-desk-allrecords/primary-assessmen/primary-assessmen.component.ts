import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MaterialModule } from '../../../../../shared/material/material.module';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-primary-assessmen',
  standalone: true,
  imports: [FormsModule, MaterialModule],
  templateUrl: './primary-assessmen.component.html',
  styleUrl: './primary-assessmen.component.css',
})
export class PrimaryAssessmenComponent {
  gross_added_sounds: string = 'none';
  respiratory_effort: string = 'normal';
  airway_open_stable: string = '';
  rr: number | null = null;
  spo2: number | null = null;
  respEffortOther: string = '';
  air_entry: string = '';
  grossSoundsOther: string = '';

  pulse_rate: number | null = null;
  pulse_regular: string = '';
  crt_seconds: number | null = null;
  skin: string = 'warm';
  skinOther: string = '';
  bp_right_arm: string = '';
  bp_left_arm : string = '';
  circulation_other: string = '';
  assessment_other: string = '';
  gcs_e: number | null = null;
  gcs_v: number | string | null = null;
  gcs_m: number | null = null;
  gcsTotal: number = 0;
  gcs_total: string = '';
  pupil_right_eye: number | null = null;
  reaction_to_light_right: string | null = null;
  pupil_left_eye: number | null = null;
  reaction_to_light_left: string | null = null;
  asymmetry_limb_movement: string = '';
  facial_asymmetry: string = '';
  posturing: string = '';
 temperature_f: number | null = null;
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
    const e = typeof this.gcs_e === 'number' ? this.gcs_e : 0;
    const m = typeof this.gcs_m === 'number' ? this.gcs_m : 0;

    let total = e + m;
    let vText = '';

    if (typeof this.gcs_v === 'number') {
      total += this.gcs_v;
    } else if (this.gcs_v === 'T') {
      vText = 'T';
    }

    this.gcs_total = total + vText;
  }

  onSave() {
    const data = {
      airway_open_stable: this.airway_open_stable,
      rr: this.rr,
      spo2: this.spo2,
      respiratory_effort: this.respiratory_effort,
      respEffortOther: this.respEffortOther,
      gross_added_sounds: this.gross_added_sounds,
      grossSoundsOther: this.grossSoundsOther,
      air_entry: this.air_entry,
      pulse_rate: this.pulse_rate,
      pulse_regular: this.pulse_regular,
      crt_seconds: this.crt_seconds,
      skin: this.skin,
      skinOther: this.skinOther,
      bp_right_arm: this.bp_right_arm,
      bp_left_arm: this.bp_left_arm,
      circulation_other: this.circulation_other,
      assessment_other: this.assessment_other,
      gcs_e: this.gcs_e,
      gcs_v: this.gcs_v,
      gcs_m: this.gcs_m,
      gcs_total: this.gcs_total,
      pupil_right_eye: this.pupil_right_eye,
      reaction_to_light_right: this.reaction_to_light_right,
      pupil_left_eye: this.pupil_left_eye,
      reaction_to_light_left: this.reaction_to_light_left,
      asymmetry_limb_movement: this.asymmetry_limb_movement,
      facial_asymmetry: this.facial_asymmetry,
      posturing: this.posturing,
      temperature_f: this.temperature_f,
      rash: this.rash,
      cynosis: this.cynosis,
    };

    const hasAnyValue = Object.values(data).some(
      (value) => value !== null && value !== '' && value !== undefined
    );

    if (hasAnyValue) {
      console.log('Saving form data:', data);
      localStorage.setItem(
        `primaryAssessment_${this.patientId}`,
        JSON.stringify(data)
      );
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
    this.gross_added_sounds = 'none';
    this.respiratory_effort = 'normal';
    this.airway_open_stable = '';
    this.rr = null;
    this.spo2 = null;
    this.respEffortOther = '';
    this.air_entry = '';
    this.grossSoundsOther = '';
    this.pulse_rate = null;
    this.pulse_regular = '';
    this.crt_seconds = null;
    this.skin= 'warm';
    this.skinOther = '';
    this.bp_right_arm = '';
    this.bp_left_arm = '';
    this.circulation_other = '';
    this.assessment_other = '';
    this.gcs_e = null;
    this.gcs_v = null;
    this.gcs_m = null;
    this.gcsTotal = 0;
    this.gcs_total = '';
    this.pupil_right_eye = null;
    this.reaction_to_light_right = null;
    this.pupil_left_eye = null;
    this.reaction_to_light_left = null;
    this.asymmetry_limb_movement = '';
    this.facial_asymmetry = '';
    this.posturing = '';
    this.temperature_f = null;
    this.rash = '';
    this.cynosis = '';
  }
}
