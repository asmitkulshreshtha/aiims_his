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
  //  ngOnInit() {
  //     const id = Number(this.route.snapshot.paramMap.get('id'));
  //     this.patientService.getPatientById(id).subscribe((data: any) => {
  //       console.log('Patient data fetched:', data);
  //       this.patient = data;
  //     });
  //   }

}
