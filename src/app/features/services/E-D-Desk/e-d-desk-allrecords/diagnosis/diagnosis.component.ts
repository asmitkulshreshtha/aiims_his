import { Component } from '@angular/core';
import { MaterialModule } from '../../../../../shared/material/material.module';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-diagnosis',
   standalone: true,
  imports: [MaterialModule, FormsModule],
  templateUrl: './diagnosis.component.html',
  styleUrl: './diagnosis.component.css'
})
export class DiagnosisComponent {
remark = '';

}
