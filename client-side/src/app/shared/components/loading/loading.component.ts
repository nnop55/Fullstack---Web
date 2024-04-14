import { Component, Input } from '@angular/core';
import { CommonModule, NgStyle } from '@angular/common';

@Component({
  selector: 'app-loading',
  standalone: true,
  imports: [NgStyle],
  template: `
  <div class="loading-container"
  [ngStyle]="{
      'transform':'scale(' + size + ')',
      'justify-content': size === 0.5 && 'flex-end'
    }"
  >
    <div class="loader"></div>
  </div>
  `,
  styleUrls: ['./loading.component.scss']
})
export class LoadingComponent {
  @Input() size: number = 1;
}
