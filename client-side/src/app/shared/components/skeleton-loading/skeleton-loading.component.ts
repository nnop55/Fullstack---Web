import { Component, Input, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-skeleton-loading',
  standalone: true,
  imports: [],
  template: `
  <div class="skeleton-cont">
    @for(row of rows; track $index){
      <div class="skeleton-row">
        <div class="skeleton-item"></div>
      </div>
    }
  </div>
  `,
  styleUrl: './skeleton-loading.component.scss'
})
export class SkeletonLoadingComponent {
  @Input() rowCount: number = 5;
  rows: number[] = Array(this.rowCount).fill(0)

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['rowCount']) {
      this.rows = Array(this.rowCount).fill(0)
    }
  }
}
