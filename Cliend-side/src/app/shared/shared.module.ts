import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TextInputComponent } from './components/text-input/text-input.component';
import { ButtonComponent } from './components/button/button.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DropdownComponent } from './components/dropdown/dropdown.component';

const exportComponents = [
  TextInputComponent,
  ButtonComponent,
  DropdownComponent,
]

@NgModule({
  declarations: [
    TextInputComponent,
    ButtonComponent,
    DropdownComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule
  ],
  exports: [
    ...exportComponents,
    ReactiveFormsModule,
    FormsModule
  ]
})
export class SharedModule { }


