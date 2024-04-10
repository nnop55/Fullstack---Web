import { Routes } from '@angular/router';

export const ParkingZonesRoute: Routes = [
    {
        path: '',
        redirectTo: '',
        pathMatch: "full"
    },
    {
        path: '',
        loadComponent: () => import('./parking-zones.component').then(m => m.ParkingZonesComponent),
    }
]