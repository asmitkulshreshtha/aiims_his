import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MaterialModule } from '../../../../../shared/material/material.module';
@Component({
  selector: 'app-point-of-care-test',
  imports: [FormsModule, MaterialModule],
  templateUrl: './point-of-care-test.component.html',
  styleUrl: './point-of-care-test.component.css'
})
export class PointOfCareTestComponent {
 ecgDate: Date | null = null;
  ecgTime: string = '';
  ecgFindings: string = '';
  ecgDoctorSign: string = '';
  ecgImagePreview: string | null = null;
doctorSign: string = '';
 findings: string = '';
 protocol: string = '';
  time: string = '';
  date: string = '';
/*************  ✨ Windsurf Command ⭐  *************/
  /**
   * Handles the file input change event for ECG image upload.
   * When a file is selected, it reads the file as a data URL and
   * updates the ecgImagePreview property with the result.
   * @param event The change event from the file input element.
   */
/*******  7d13679e-1bb9-4111-85c0-e8a8dfc100be  *******/  onEcgImageUpload(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
      const reader = new FileReader();
      reader.onload = (e) => {
        this.ecgImagePreview = e.target?.result as string;
      };
      reader.readAsDataURL(input.files[0]);
    }
  }
}
