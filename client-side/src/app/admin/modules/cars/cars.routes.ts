import { Routes } from '@angular/router';

export const CarsRoutes: Routes = [
    {
        path: '',
        redirectTo: '',
        pathMatch: "full"
    },
    {
        path: '',
        loadComponent: () => import('./cars.component').then(m => m.CarsComponent),
    }
]