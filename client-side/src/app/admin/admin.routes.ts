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
        loadChildren: () => import('./modules/parking-zones/parking-zones.routes').then(m => m.ParkingZonesRoute),
        data: { path: '/admin/parking-zones' }
      },
      {
        path: 'history',
        loadChildren: () => import('./modules/history/history.routes').then(m => m.HistoryRoute),
      },
    ]
  },


];
