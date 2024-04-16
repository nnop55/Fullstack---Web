import { Routes } from '@angular/router';

export const DashboardRoutes: Routes = [
    {
        path: '',
        redirectTo: '',
        pathMatch: "full"
    },
    {
        path: '',
        loadComponent: () => import('./dashboard.component').then(m => m.DashboardComponent),
    }
]