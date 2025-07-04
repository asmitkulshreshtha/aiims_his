import { Component } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { SideHeaderComponent } from '../side-header/side-header.component';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-maincontenar',
  imports: [HeaderComponent, SideHeaderComponent , RouterModule],
  templateUrl: './maincontenar.component.html',
  styleUrl: './maincontenar.component.css'
})
export class MaincontenarComponent {

}
