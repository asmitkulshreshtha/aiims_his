import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-investigation-order',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule
  ],
  templateUrl: './investigation-order.component.html',
  styleUrls: ['./investigation-order.component.css']
})
export class InvestigationOrderComponent {
  selectedTemplate: string = 'cbc';

  // CBC fields
  plateletCount: string = '';
  basophil: string = '';
  eosinophils: string = '';
  monocytes: string = '';
  lymphocytes: string = '';
  neutrophils: string = '';
  dlc: string = '';
  tlc: string = '';
  rdwCv: string = '';        // Use camelCase consistently in .ts and .html
  mcv: string = '';
  hct: string = '';
  hemoglobin: string = '';

  saveInvestigationOrder() {
    const body = {
      plateletCount: this.plateletCount,
      basophil: this.basophil,
      eosinophils: this.eosinophils,
      monocytes: this.monocytes,
      lymphocytes: this.lymphocytes,
      neutrophils: this.neutrophils,
      dlc: this.dlc,
      tlc: this.tlc,
      rdwCv: this.rdwCv,
      mcv: this.mcv,
      hct: this.hct,
      hemoglobin: this.hemoglobin
    };
    console.log('Saving investigation order:', body);
  }
}
