import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-paging',
  templateUrl: './paging.component.html',
  styleUrls: ['./paging.component.scss']
})
export class PagingComponent {
  @Input() currentPage: number = 1;
  @Input() totalPages: number = 10;
  @Output() pageChange: EventEmitter<number> = new EventEmitter<number>();
  pages = Array.from({ length: this.totalPages }, (_, i) => i + 1)


  prevPage(): void {
    if (this.currentPage > 1) {
      this.pageChange.emit(this.currentPage - 1);
    }
  }

  nextPage(): void {
    if (this.currentPage < this.totalPages) {
      this.pageChange.emit(this.currentPage + 1);
    }
  }

  gotoPage(page: number): void {
    if (page >= 1 && page <= this.totalPages) {
      this.pageChange.emit(page);
    }
  }
}
