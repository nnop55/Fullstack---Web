import { Routes } from '@angular/router';
import { adminGuard } from './core/guards/admin.guard';
import { authGuard } from './core/guards/auth.guard';

export const routes: Routes = [
    { path: '', redirectTo: '/auth/signup', pathMatch: "full" },
    {
        path: 'not-found',
        loadComponent: () => import('./core/components/not-found/not-found.component').then(m => m.NotFoundComponent),
    },
    {
        path: 'auth/signin',
        loadComponent: () => import('./core/components/auth/auth.component').then(m => m.AuthComponent),
        data: { mode: 'signin' }
    },
    {
        path: 'auth/signup',
        loadComponent: () => import('./core/components/auth/auth.component').then(m => m.AuthComponent),
        data: { mode: 'signup' }
    },
    {
        path: 'admin',
        loadChildren: () => import('./admin/admin.routes').then(m => m.AdminRoute),
        canActivate: [authGuard, adminGuard]
    },
    { path: '**', redirectTo: '/not-found' },
];
