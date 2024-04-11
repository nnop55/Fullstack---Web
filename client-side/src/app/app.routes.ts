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
        path: 'auth',
        children: [
            {
                path: 'signin',
                loadComponent: () => import('./core/components/auth/auth.component').then(m => m.AuthComponent),
                data: { mode: 'signin' }
            },
            {
                path: 'signup',
                loadComponent: () => import('./core/components/auth/auth.component').then(m => m.AuthComponent),
                data: { mode: 'signup' }
            }
        ]
    },
    { path: '**', redirectTo: '/not-found' },
];
