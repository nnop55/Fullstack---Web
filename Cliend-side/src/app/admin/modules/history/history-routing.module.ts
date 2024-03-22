import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HistoryComponent } from './history.component';
import { AdminHeaderComponent } from '../../components/admin-header/admin-header.component';

const routes: Routes = [
  {
    path: '',
    component: AdminHeaderComponent,
    children: [
      { path: '', component: HistoryComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HistoryRoutingModule { }
