import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GenericTableComponent } from './generic-table/generic-table.component';
import { PagingComponent } from './paging/paging.component';
import { AdminFooterComponent } from './admin-footer/admin-footer.component';
import { AdminHeaderComponent } from './admin-header/admin-header.component';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';



@NgModule({
  declarations: [
    GenericTableComponent,
    PagingComponent,
    AdminFooterComponent,
    AdminHeaderComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    HttpClientModule
  ],
  exports: [
    GenericTableComponent,
    PagingComponent,
    AdminFooterComponent,
    AdminHeaderComponent,
    RouterModule,
    HttpClientModule
  ]
})
export class AdminSharedModule { }
