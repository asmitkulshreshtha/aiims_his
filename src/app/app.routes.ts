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
        path: 'patient-details/:id',
        loadComponent: () => import('./features/services/entry-desk/triage-entry-desk/triage-entry-desk.component').then(m => m.TriageEntryDeskComponent)
    }
];