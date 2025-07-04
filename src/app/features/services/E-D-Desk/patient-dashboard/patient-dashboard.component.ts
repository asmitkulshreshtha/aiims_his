import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PatientService } from '../../../../api/patient.service';
import { CommonModule } from '@angular/common'; 
import { MatTableModule } from '@angular/material/table';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider'; 
import { RouterModule } from '@angular/router';
@Component({
  selector: 'app-patient-dashboard',
  standalone: true,
  imports: [CommonModule,  MatTableModule, MatCardModule, MatDividerModule,RouterModule],
  templateUrl: './patient-dashboard.component.html',
  styleUrl: './patient-dashboard.component.css'
})
export class PatientDashboardComponent {
  patient: any;
  displayedColumns: string[] = [
  'id', 'status', 'spo2', 'hr', 'bp', 'rr', 'rbs', 'emergencyType', 'triage', 'triageNotes', 'date', 'time'
];

    constructor(
      public router: Router,
      public route: ActivatedRoute,
      public patientService: PatientService,
    ){}
   ngOnInit() {
  const id = Number(this.route.snapshot.paramMap.get('id'));
  this.patientService.getPatientById(id).subscribe((data: any) => {
    console.log('Patient data fetched:', data);
    this.patient = data;
  });
}


}
