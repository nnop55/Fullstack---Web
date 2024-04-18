import { Component, Input, SimpleChange, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-skeleton-loading',
  standalone: true,
  imports: [],
  template: `
  <div class="skeleton-cont">
      <div class="skeleton-row"></div>
      <div class="skeleton-row"></div>
      <div class="skeleton-row"></div>
      <div class="skeleton-row"></div>
      <div class="skeleton-row"></div>
  </div>
  `,
  styleUrl: './skeleton-loading.component.scss'
})
export class SkeletonLoadingComponent {
}
