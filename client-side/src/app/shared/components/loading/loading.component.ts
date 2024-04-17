import { NgStyle } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-loading',
  standalone: true,
  imports: [NgStyle],
  template: `
   <div class="loading-container"
  [ngStyle]="{
      'transform':'scale(' + size + ')',
      'justify-content': size === 0.5 && 'flex-end',
        'backdrop-filter':isBlur && 'blur(1px)'
    }"
  >
    <div class="loader"></div>
  </div>
  `,
  styleUrl: './loading.component.scss'
})
export class LoadingComponent {
  @Input() size!: number;
  @Input() isBlur!: boolean;

}
