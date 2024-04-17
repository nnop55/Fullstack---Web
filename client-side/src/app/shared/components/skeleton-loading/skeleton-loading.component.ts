import { Component, Input, SimpleChange, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-skeleton-loading',
  standalone: true,
  imports: [],
  template: `
  <div class="skeleton-cont">
    @for(row of rows; track $index){
      <div class="skeleton-row"></div>
    }
  </div>
  `,
  styleUrl: './skeleton-loading.component.scss'
})
export class SkeletonLoadingComponent {
  rows = Array(5).fill(0)
}
