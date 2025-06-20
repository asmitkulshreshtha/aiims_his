import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MaterialModule } from '../../../shared/material/material.module';
import { HttpClientModule } from '@angular/common/http';
@Component({
  selector: 'app-service',
  imports: [RouterModule, MaterialModule, HttpClientModule
  ],
  templateUrl: './service.component.html',
  styleUrl: './service.component.css'
})
export class ServiceComponent {
  isMenuOpen = false;
  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }
}
