import { UpperCasePipe } from '@angular/common';
import { Component, Input, output } from '@angular/core';
import { LoadingDirective } from '../../directives/loading.directive';

@Component({
  selector: 'app-button',
  standalone: true,
  imports: [UpperCasePipe, LoadingDirective],
  templateUrl: './button.component.html',
  styleUrl: './button.component.scss'
})
export class ButtonComponent {
  @Input() label: string = 'Button';
  @Input() className: string = '';
  @Input() disabled: boolean = false;
  @Input() btnType: 'submit' | 'button' = 'button';
  @Input() isLoading: boolean = false;
  @Input() mode: 'with-icon' | 'only-icon' | 'default' = 'default';
  @Input() imgSrc!: string;

  onClick = output<void>();

  emitClick(): void {
    this.onClick.emit()
  }
}
