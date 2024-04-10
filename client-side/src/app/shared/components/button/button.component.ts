import { Component, EventEmitter, Input, Output } from '@angular/core';
import { UpperCasePipe } from '@angular/common';

@Component({
  selector: 'app-button',
  standalone: true,
  imports: [UpperCasePipe],
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss']
})
export class ButtonComponent {
  @Input() label: string = 'Button';
  @Input() className: string = '';
  @Input() disabled: boolean = false;
  @Input() btnType: 'submit' | 'button' = 'button';

  @Output() onClick: EventEmitter<void> = new EventEmitter<void>();

  constructor() { }

  emitClick(): void {
    this.onClick.emit()
  }
}
