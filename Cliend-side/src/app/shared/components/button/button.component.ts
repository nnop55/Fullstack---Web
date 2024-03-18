import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss']
})
export class ButtonComponent {
  @Input() label: string = 'Button';
  @Input() className: string = '';
  @Input() disabled: boolean = false;

  @Output() onClick: EventEmitter<void> = new EventEmitter<void>();

  constructor() { }

  emitClick(): void {
    this.onClick.emit()
  }
}
