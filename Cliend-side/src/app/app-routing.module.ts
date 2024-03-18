import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthComponent } from './core/components/auth/auth.component';
import { authGuard } from './core/guards/auth.guard';
import { adminGuard } from './core/guards/admin.guard';
import { NotFoundComponent } from './core/components/not-found/not-found.component';

const routes: Routes = [
  { path: '', redirectTo: '/auth', pathMatch: "full" },
  { path: 'auth', component: AuthComponent },
  { path: 'not-found', component: NotFoundComponent },
  { path: '**', redirectTo: '/not-found' },
  {
    path: 'client',
    loadChildren: () => import('./client/client.module').then(m => m.ClientModule),
    canActivate: [authGuard]
  },
  {
    path: 'admin',
    loadChildren: () => import('./admin/admin.module').then(m => m.AdminModule),
    canActivate: [authGuard, adminGuard]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
