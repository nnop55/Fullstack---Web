import { NgClass, NgFor, NgIf } from '@angular/common';
import { Component, EventEmitter, HostListener, Input, OnChanges, AfterViewInit, Output, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-stepper',
  templateUrl: './stepper.component.html',
  styleUrls: ['./stepper.component.scss'],
  standalone: true,
  imports: [NgClass, NgIf, NgFor]
})
export class StepperComponent implements AfterViewInit, OnChanges {

  @Input() activeStep: number = 1;
  @Input() stepCount: number = 0;
  @Input() data: any[] = [];
  @Input() restart: boolean = false

  @Output() onStepClicked: EventEmitter<number> = new EventEmitter<number>();

  finishedStep: number = 0

  lineWidth: string = "10px";
  boxGap: string = "5px"

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.calculateRange()
    }, 100)
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['activeStep'] &&
      changes['activeStep'].currentValue > this.finishedStep) {
      this.finishedStep = this.activeStep
    }

    if (changes['restart'] &&
      changes['restart'].currentValue == true) {
      this.finishedStep = 1;
    }
  }

  onStepClick(step: any) {
    this.activeStep = step.level
    this.onStepClicked.emit(this.activeStep)
  }

  @HostListener("window:resize")
  onResize() {
    this.calculateRange()
  }

  calculateRange() {
    const firstButtonRect = this.getButtonRect(1);
    const secondButtonRect = this.getButtonRect(2);

    const rangeInPixels = Math.abs(firstButtonRect.left - secondButtonRect.left);

    this.lineWidth = `${this.calc(rangeInPixels - 70, 60)}px`
    this.boxGap = `${this.calc((rangeInPixels - 70) / 15, 10)}px`
  }


  private getButtonRect(step: number): DOMRect {
    const button = document.querySelector(`#stepButton${step}`) as HTMLElement;
    return button.getBoundingClientRect();
  }

  private calc(range: number, min: number): number {
    return range < min ? min : range;
  }

}
