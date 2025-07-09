import { Component, OnInit } from '@angular/core';
import { MaterialModule } from '../../../../../shared/material/material.module';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { TemplateService } from '../../../../../api/template.service';
import { AuthService } from '../../../../../api/auth.service';
import { PatientService } from '../../../../../api/patient.service';

@Component({
  selector: 'app-doctor-notes',
  standalone: true,
  imports: [MaterialModule, FormsModule],
  templateUrl: './doctor-notes.component.html',
  styleUrl: './doctor-notes.component.css',
})
export class DoctorNotesComponent implements OnInit {
  selectedTemplate = '';
  patientId!: number;
  patient: any;
  isLoading = true;

  currentDate = new Date().toLocaleDateString();
  currentTime = new Date().toLocaleTimeString();

  // Emergency
  chief_complains = '';
  history_of_present_illness = '';
  review_of_symptoms = '';
  progression_of_symptoms = '';
  why_today = '';
  general_physical_examination = '';
  systemic_examination = '';
  relevant_investigation_findings = '';
  provisional_dx_differentials = '';
  emergency_further_management_plan = '';
  emergencyNotes: any[] = [];

  // Progress
  progressNotes: any[] = [];
  provisional_diagnosis = '';
  current_condition = '';
  pulse: number | null = null;
  blood_pressure = '';
  rr: number | null = null;
  spo2: number | null = null;
  pain_score: number | null = null;
  gcs: number | null = null;
  blood_test = '';
  imaging = '';
  progress_further_management_plan = '';

  // Trauma
  traumaNotes: any[] = [];
  aho = '';
  place_of_event = '';
  date_of_injury: any;
  time_of_injury = '';
  mechanism_of_injury = '';
  mlc_no = '';
  presenting_complaints = '';
  loss_of_consciousness = '';
  ent_bleed = '';
  amnesia = '';
  seizures = '';
  vomiting = '';
  injury_identified = '';
  allergy_history = '';
  medication_history = '';
  past_history = '';
  lmp = '';
  upt = '';
  last_meal = '';
  prior_treatment = '';
  treatment_plan = '';
  xray_advised = false;
  ct_advised = false;
  mri_advised = false;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    public templateService: TemplateService,
    public authService: AuthService,
    public patientService: PatientService
  ) {}

  ngOnInit() {
    const idParam =
      this.route.snapshot.paramMap.get('id') ||
      this.route.parent?.snapshot.paramMap.get('id');
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

    this.templateService.getemergencycare(this.patientId).subscribe({
      next: (data: any) => (this.emergencyNotes = data.data),
      error: (err: any) => console.error('Emergency fetch error:', err),
      complete: () => (this.isLoading = false),
    });

    this.templateService.getprogressNotes(this.patientId).subscribe({
      next: (data: any) => (this.progressNotes = data.data),
      error: (err: any) => console.error('Progress fetch error:', err),
    });

    this.templateService.gettraumaTemplate(this.patientId).subscribe({
      next: (data: any) => (this.traumaNotes = data.data),
      error: (err: any) => console.error('Trauma fetch error:', err),
    });

    this.patientService.getPatientById(this.patientId).subscribe({
      next: (data: any) => (this.patient = data),
      error: (err: any) => console.error('Patient fetch error:', err),
    });
  }

  onSaveEmergency() {
    const user = this.authService.getCurrentUserFromToken();
    const data = {
      patient_id: this.patientId,
      chief_complains: this.chief_complains,
      history_of_present_illness: this.history_of_present_illness,
      review_of_symptoms: this.review_of_symptoms,
      progression_of_symptoms: this.progression_of_symptoms,
      why_today: this.why_today,
      general_physical_examination: this.general_physical_examination,
      systemic_examination: this.systemic_examination,
      relevant_investigation_findings: this.relevant_investigation_findings,
      provisional_dx_differentials: this.provisional_dx_differentials,
      emergency_further_management_plan: this.emergency_further_management_plan,
      submitted_by: user?.user || 'Unknown',
      designation: user?.designation || 'N/A',
      showDetails: false,
    };

    this.templateService.emergencycareData(data).subscribe({
      next: (res: any) => {
        const savedNote = res.data;
        savedNote.showDetails = false; // for toggle in UI
        this.emergencyNotes.unshift(savedNote);
        console.log('✅ Emergency note saved & added to list');
      },
      error: (err: any) => console.error('Emergency save error:', err),
    });
  }

  onSaveProgressNote() {
    const user = this.authService.getCurrentUserFromToken();
    const note = {
      patient_id: this.patientId,
      doctor_name: user?.user || 'Unknown',
      designation: user?.designation || 'N/A',
      date: this.currentDate,
      time: this.currentTime,
      provisional_diagnosis: this.provisional_diagnosis,
      current_condition: this.current_condition,
      pulse: this.pulse,
      blood_pressure: this.blood_pressure,
      rr: this.rr,
      spo2: this.spo2,
      pain_score: this.pain_score,
      gcs: this.gcs,
      blood_test: this.blood_test,
      imaging: this.imaging,
      progress_further_management_plan: this.progress_further_management_plan,
    };

    this.templateService.progressNoteseData(note).subscribe({
      next: (res: any) => {
        const savedNote = res.data;

        if (Array.isArray(savedNote)) {
          // Agar server ek pura array bhejta hai
          this.progressNotes = savedNote.map((n) => ({
            ...n,
            showDetails: false,
          }));
        } else {
          // Agar server ek hi note bhejta hai
          savedNote.showDetails = false;
          this.progressNotes.unshift(savedNote);
        }

        console.log('✅ Progress note saved & added to list');
      },
      error: (err: any) => console.error('Progress save error:', err),
    });
  }

  onSaveTraumaNote() {
    const user = this.authService.getCurrentUserFromToken();
    const note = {
      patient_id: this.patientId,
      aho: this.aho,
      place_of_event: this.place_of_event,
      date_of_injury: this.date_of_injury,
      time_of_injury: this.time_of_injury,
      mechanism_of_injury: this.mechanism_of_injury,
      doctor_name: user?.user || 'Unknown',
      designation: user?.designation || 'N/A',
      date: this.currentDate,
      time: this.currentTime,
      mlc_no: this.mlc_no,
      presenting_complaints: this.presenting_complaints,
      loss_of_consciousness: this.loss_of_consciousness,
      ent_bleed: this.ent_bleed,
      amnesia: this.amnesia,
      seizures: this.seizures,
      vomiting: this.vomiting,
      injury_identified: this.injury_identified,
      allergy_history: this.allergy_history,
      medication_history: this.medication_history,
      past_history: this.past_history,
      lmp: this.lmp,
      upt: this.upt,
      last_meal: this.last_meal,
      prior_treatment: this.prior_treatment,
      investigation_advised: this.getSelectedInvestigations(),
      treatment_plan: this.treatment_plan,
      showDetails: false,
    };

    this.templateService.traumaTemplateData(note).subscribe({
      next: (res: any) => {
        // ✅ Server se fresh data aayega with _id / createdAt etc.
        const savedNote = res.data;
        savedNote.showDetails = false; // toggle ke liye zaruri hai

        // ✅ Array me add karo UI ke liye
        this.traumaNotes.unshift(savedNote); // naya top par aaye

        console.log('✅ Trauma saved & added to list');
      },
      error: (err: any) => console.error('Trauma save error:', err),
    });
  }

  getSelectedInvestigations(): string[] {
    const list = [];
    if (this.xray_advised) list.push('X-ray');
    if (this.ct_advised) list.push('CT Scan');
    if (this.mri_advised) list.push('MRI');
    return list;
  }

  onReset() {
    this.selectedTemplate = '';
    this.chief_complains = '';
    this.history_of_present_illness = '';
    this.review_of_symptoms = '';
    this.progression_of_symptoms = '';
    this.why_today = '';
    this.general_physical_examination = '';
    this.systemic_examination = '';
    this.relevant_investigation_findings = '';
    this.provisional_dx_differentials = '';
    this.emergency_further_management_plan = '';

    this.provisional_diagnosis = '';
    this.current_condition = '';
    this.pulse = null;
    this.blood_pressure = '';
    this.rr = null;
    this.spo2 = null;
    this.pain_score = null;
    this.gcs = null;
    this.blood_test = '';
    this.imaging = '';
    this.progress_further_management_plan = '';

    this.aho = '';
    this.place_of_event = '';
    this.date_of_injury = '';
    this.time_of_injury = '';
    this.mechanism_of_injury = '';
    this.mlc_no = '';
    this.presenting_complaints = '';
    this.loss_of_consciousness = '';
    this.ent_bleed = '';
    this.amnesia = '';
    this.seizures = '';
    this.vomiting = '';
    this.injury_identified = '';
    this.allergy_history = '';
    this.medication_history = '';
    this.past_history = '';
    this.lmp = '';
    this.upt = '';
    this.last_meal = '';
    this.prior_treatment = '';
    this.xray_advised = false;
    this.ct_advised = false;
    this.mri_advised = false;
    this.treatment_plan = '';
  }

  onCancel() {
    this.router.navigate(['/']);
  }
}
