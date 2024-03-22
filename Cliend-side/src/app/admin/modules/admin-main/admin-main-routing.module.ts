import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminMainComponent } from './admin-main.component';
import { AdminHeaderComponent } from '../../components/admin-header/admin-header.component';

const routes: Routes = [
  {
    path: '',
    component: AdminHeaderComponent,
    children: [
      { path: '', component: AdminMainComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminMainRoutingModule { }
