import { Routes } from '@angular/router';

export const HistoryRoute: Routes = [
    {
        path: '',
        redirectTo: '',
        pathMatch: "full"
    },
    {
        path: '',
        loadComponent: () => import('./history.component').then(m => m.HistoryComponent),
    }
]