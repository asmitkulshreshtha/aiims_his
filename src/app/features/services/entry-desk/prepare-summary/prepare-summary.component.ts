import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PatientService } from '../../../../api/patient.service';

@Component({
  selector: 'app-prepare-summary',
  imports: [],
  templateUrl: './prepare-summary.component.html',
  styleUrl: './prepare-summary.component.css'
})
export class PrepareSummaryComponent {
    patient: any;
  constructor(
    public router: Router,
    public route: ActivatedRoute,
    public patientService: PatientService,
  ){}
}
