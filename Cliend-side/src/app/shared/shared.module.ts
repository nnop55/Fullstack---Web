import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TextInputComponent } from './components/text-input/text-input.component';
import { ButtonComponent } from './components/button/button.component';



@NgModule({
  declarations: [
    TextInputComponent,
    ButtonComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    TextInputComponent,
    ButtonComponent
  ]
})
export class SharedModule { }
