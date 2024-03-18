import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminMainRoutingModule } from './admin-main-routing.module';
import { AdminMainComponent } from './admin-main.component';


@NgModule({
  declarations: [
    AdminMainComponent
  ],
  imports: [
    CommonModule,
    AdminMainRoutingModule
  ]
})
export class AdminMainModule { }
