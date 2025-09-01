import { Component } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { SideHeaderComponent } from '../side-header/side-header.component';
import { ActivatedRoute, NavigationEnd, Router, RouterModule } from '@angular/router';
import { filter } from 'rxjs';
import { EmergencyNursingDeskHeaderComponent } from '../emergency-nursing-desk-header/emergency-nursing-desk-header.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-maincontenar',
  imports: [HeaderComponent, SideHeaderComponent , RouterModule , EmergencyNursingDeskHeaderComponent , CommonModule],
  templateUrl: './maincontenar.component.html',
  styleUrl: './maincontenar.component.css'
})
export class MaincontenarComponent {
 
deskType!: string;

  constructor(private route: ActivatedRoute, private router: Router) {}

 ngOnInit() {
  // if (this.router){
  //   this.router.events
  //     .pipe(filter(event => event instanceof NavigationEnd))
  //     .subscribe(() => {
  //       let activeRoute = this.route;

  //       // Go down to the deepest activated route
  //       while (activeRoute.firstChild) {
  //         activeRoute = activeRoute.firstChild;
  //       }

  //       // Now we are at the route with the parameters
  //       activeRoute.paramMap.subscribe(params => {
  //         this.deskType = params.get('deskType') || '';
  //         console.log('Desk Type:', this.deskType);
  //       });
  //     });
  // }
   if (this.route) {
   this.route.paramMap.subscribe(params => {
    this.deskType = params.get('deskType') || '';
    console.log('Desk Type:', this.deskType);
  });
  }
}
}
