import { Routes } from '@angular/router';
import { adminGuard } from './core/guards/admin.guard';
import { authGuard } from './core/guards/auth.guard';

export const routes: Routes = [
    {
        path: 'not-found',
        loadComponent: () => import('./core/components/not-found/not-found.component').then(m => m.NotFoundComponent),
    },
    {
        path: '',
        canActivate: [authGuard],
        children: [
            { path: '', redirectTo: '/admin', pathMatch: "full" },
            {
                path: 'admin',
                loadChildren: () => import('./admin/admin.routes').then(m => m.AdminRoute),
                canActivate: [adminGuard]
            },
            {
                path: 'client',
                loadChildren: () => import('./client/client.routes').then(m => m.ClientRoute),
            }
        ]
    },
    {
        path: 'sign',
        children: [
            {
                path: 'in',
                loadComponent: () => import('./core/components/sign/sign.component').then(m => m.SignComponent),
                data: { mode: 'in' }
            },
            {
                path: 'up',
                loadComponent: () => import('./core/components/sign/sign.component').then(m => m.SignComponent),
                data: { mode: 'up' }
            }
        ]
    },
    { path: '**', redirectTo: '/not-found' },
];
