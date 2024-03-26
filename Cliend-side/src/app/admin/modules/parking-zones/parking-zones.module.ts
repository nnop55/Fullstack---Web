import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ParkingZonesRoutingModule } from './parking-zones-routing.module';
import { ParkingZonesComponent } from './parking-zones.component';
import { AdminSharedModule } from '../../components/admin-shared.module';


@NgModule({
  declarations: [
    ParkingZonesComponent
  ],
  imports: [
    CommonModule,
    ParkingZonesRoutingModule,
    AdminSharedModule
  ]
})
export class ParkingZonesModule { }
