import { Routes } from '@angular/router';

export const ClientRoute: Routes = [
  {
    path: '',
    redirectTo: '',
    pathMatch: "full"
  },
  {
    path: '',
    loadComponent: () => import('./modules/main/main.component').then(m => m.MainComponent)
  }
]