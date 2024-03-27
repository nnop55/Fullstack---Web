import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ParkingZonesComponent } from './parking-zones.component';
import { AdminHeaderComponent } from '../../components/admin-header/admin-header.component';

const routes: Routes = [
  {
    path: '',
    component: AdminHeaderComponent,
    children: [
      {
        path: '',
        component: ParkingZonesComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ParkingZonesRoutingModule { }
