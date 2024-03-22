import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './admin.component';

const routes: Routes = [{ path: '', redirectTo: '', pathMatch: "full" },
{ path: '', loadChildren: () => import('./modules/admin-main/admin-main.module').then(m => m.AdminMainModule) },
{ path: 'history', loadChildren: () => import('./modules/history/history.module').then(m => m.HistoryModule) }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
