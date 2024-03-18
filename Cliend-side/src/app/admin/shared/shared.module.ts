import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminHeaderComponent } from './components/admin-header/admin-header.component';
import { AdminFooterComponent } from './components/admin-footer/admin-footer.component';



@NgModule({
  declarations: [
    AdminHeaderComponent,
    AdminFooterComponent
  ],
  imports: [
    CommonModule
  ]
})
export class SharedModule { }
