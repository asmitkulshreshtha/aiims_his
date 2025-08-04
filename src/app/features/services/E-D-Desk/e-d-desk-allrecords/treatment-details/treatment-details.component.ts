import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-treatment-details',
  standalone: true,
  imports: [
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule
  ],
  templateUrl: './treatment-details.component.html',
  styleUrls: ['./treatment-details.component.css']
})
export class TreatmentDetailsComponent {
 treatmentData = {
  date: '',
  time: '',
  drugName: '',
  dose: '',
  frequency: '',
  route: '',
  specialInstructions: ''
};

saveTreatment() {
  const payload = {
    ...this.treatmentData,
    dateTime: `${this.treatmentData.date}T${this.treatmentData.time}`
  };
  console.log('Treatment saved:', payload);
}

}
