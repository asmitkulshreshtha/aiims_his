import { Component } from '@angular/core';
import { MaterialModule } from '../../shared/material/material.module';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
@Component({
  selector: 'app-header',
  standalone: true,
  imports: [ CommonModule, MaterialModule, ReactiveFormsModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  isMenuOpen = false;

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }

   constructor(public router: Router) {}

  navigateTo(path: string) {
    this.router.navigate([path]);
  }
}
