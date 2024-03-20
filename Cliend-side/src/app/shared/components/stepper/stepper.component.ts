import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-stepper',
  templateUrl: './stepper.component.html',
  styleUrls: ['./stepper.component.scss']
})
export class StepperComponent {

  @Input() activeStep: number = 1;
  @Input() stepCount: number = 0;
  @Input() data: any[] = [0];

}
