import { Routes } from '@angular/router';

export const AdminRoute: Routes = [
  {
    path: '',
    redirectTo: '',
    pathMatch: "full"
  },
  {
    path: '',
    loadComponent: () => import('./components/admin-layout/admin-layout.component').then(m => m.AdminLayoutComponent),
    children: [
      {
        path: 'parking-zones',
        loadComponent: () => import('./modules/parking-zones/parking-zones.component').then(m => m.ParkingZonesComponent),
        data: { path: '/admin/parking-zones' }
      },
      {
        path: 'history',
        loadComponent: () => import('./modules/history/history.component').then(m => m.HistoryComponent),
      },
    ]
  },


];
