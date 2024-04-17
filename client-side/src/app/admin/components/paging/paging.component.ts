import { Component, Input, SimpleChanges, output } from '@angular/core';
import { DropdownComponent } from '../../../shared/components/dropdown/dropdown.component';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { ButtonComponent } from '../../../shared/components/button/button.component';

@Component({
  selector: 'app-paging',
  standalone: true,
  imports: [DropdownComponent, ReactiveFormsModule, ButtonComponent],
  templateUrl: './paging.component.html',
  styleUrl: './paging.component.scss'
})
export class PagingComponent {

  @Input() currentPage: number = 1;
  @Input() totalPages!: number;
  @Input() totalCount!: number;
  @Input() pageSize!: number;

  pageChange = output<number>()
  sizeChange = output<number>()

  pageSizeControl: FormControl = new FormControl(null)
  pageSizeOptions = [
    { label: 10, value: 10 },
    { label: 15, value: 15 },
    { label: 25, value: 25 },
    { label: 50, value: 50 },
    { label: 100, value: 100 }
  ]

  from!: number;

  ngOnInit(): void {
    this.from = (this.pageSize * (this.currentPage - 1)) + 1
    this.pageSizeControl.setValue(this.pageSize)

    this.pageSizeControl
      .valueChanges
      .subscribe(value => {
        if (value !== this.pageSize) {
          this.sizeChange.emit(value)
        }
      })
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['totalPages']) {
      this.totalPages = changes['totalPages'].currentValue
    }
    if (changes['totalCount']) {
      this.totalCount = changes['totalCount'].currentValue
    }
  }

  prevPage(isLoop: boolean = false): void {
    if (this.currentPage > 1) {
      this.currentPage--
      this.from = ((this.pageSize * (this.currentPage - 1)) - this.pageSize) + 1 + this.pageSize
    }

    if (isLoop && this.currentPage == 1) {
      this.pageChange.emit(this.currentPage);
    } else if (!isLoop && this.currentPage >= 1) {
      this.pageChange.emit(this.currentPage);
    }
  }

  nextPage(isLoop: boolean = false): void {
    if (this.currentPage < this.totalPages) {
      this.currentPage++
      this.from = (this.pageSize * (this.currentPage - 1)) + 1
    }

    if (isLoop && this.currentPage == this.totalPages) {
      this.pageChange.emit(this.currentPage);
    } else if (!isLoop && this.currentPage <= this.totalPages) {
      this.pageChange.emit(this.currentPage);
    }
  }

  firstPage() {
    while (this.currentPage > 1) {
      this.prevPage(true)
    }
  }

  lastPage() {
    while (this.currentPage < this.totalPages) {
      this.nextPage(true)
    }
  }

}
