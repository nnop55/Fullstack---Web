import { Routes } from '@angular/router';

export const ParkingHistoryRoute: Routes = [
    {
        path: '',
        redirectTo: '',
        pathMatch: "full"
    },
    {
        path: '',
        loadComponent: () => import('./parking-history.component').then(m => m.ParkingHistoryComponent),
    }
]