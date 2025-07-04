import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: '',
        loadComponent: () => import('./features/auth/login/login.component').then(m => m.LoginComponent)
    },
    {
        path: 'service',
        loadComponent: () => import('./features/services/service/service.component').then(m => m.ServiceComponent)
    },
    {
        path: 'triage-entry-desk',
        loadComponent: () => import('./features/services/entry-desk/triage-entry-desk/triage-entry-desk.component').then(m => m.TriageEntryDeskComponent)
    },
    {
        path: 'patient-list',
        loadComponent: () => import('./features/services/entry-desk/patient-list/patient-list.component').then(m => m.PatientListComponent)
    },
    {
        path: 'patient-added',
        loadComponent: () => import('./features/services/entry-desk/patient-added/patient-added.component').then(m => m.PatientAddedComponent)
    },
      {
        path: 'patient-details',
        loadComponent: () => import('./features/services/E-D-Desk/patient-details/patient-details.component').then(m => m.PatientDetailsComponent)
    },
    {
        path: 'patient-details/:id',
        loadComponent: () => import('./features/services/entry-desk/triage-entry-desk/triage-entry-desk.component').then(m => m.TriageEntryDeskComponent)
    },
     {
        path: 'prepare-summary/:id',
        loadComponent: () => import('./features/services/entry-desk/prepare-summary/prepare-summary.component').then(m => m.PrepareSummaryComponent)
    },

      {
        path: 'patient-dashboard/:id',
        loadComponent: () => import('./features/maincontenar/maincontenar.component').then(m => m.MaincontenarComponent),
      children: [
    {
      path: '',
      pathMatch: 'full',
      loadComponent: () => import('./features/services/E-D-Desk/patient-dashboard/patient-dashboard.component').then(m => m.PatientDashboardComponent),
    },
     {
      path: 'triage',
      loadComponent: () =>
        import('./features/services/E-D-Desk/e-d-desk-allrecords/triage-detail/triage-detail.component').then(m => m.TriageDetailComponent)
    },
      {
      path: 'Primary-Assessmen',
      loadComponent: () =>
        import('./features/services/E-D-Desk/e-d-desk-allrecords/primary-assessmen/primary-assessmen.component').then(m => m.PrimaryAssessmenComponent)
    },
      {
      path: 'doctor-notes',
      loadComponent: () =>
        import('./features/services/E-D-Desk/e-d-desk-allrecords/doctor-notes/doctor-notes.component').then(m => m.DoctorNotesComponent)
    },
      {
      path: 'Point-of-Care-Test',
      loadComponent: () =>
        import('./features/services/E-D-Desk/e-d-desk-allrecords/point-of-care-test/point-of-care-test.component').then(m => m.PointOfCareTestComponent)
    },
  ]
    },
        {
        path: 'side-header',
        loadComponent: () => import('./features/side-header/side-header.component').then(m => m.SideHeaderComponent)
    },
];