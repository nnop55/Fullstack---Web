import { Component, Input, OnInit } from '@angular/core';
import { TableColumn } from 'src/app/shared/utils/unions';

@Component({
  selector: 'app-generic-table',
  templateUrl: './generic-table.component.html',
  styleUrls: ['./generic-table.component.scss']
})
export class GenericTableComponent implements OnInit {

  @Input() columns: TableColumn[] = [];
  @Input() path!: string;

  @Input() tableData!: any[];

  currentPage: number = 1;
  pageSize: number = 10;
  sortBy: string = 'id';
  sortingOrder: string = 'asc';

  constructor() { }

  ngOnInit(): void {
    // this.loadData();
  }

  onPageChange(page: number): void {
    this.currentPage = page
    // this.loadData();
  }

  onSort(columnKey: string): void {
    if (columnKey === this.sortBy) {
      this.sortingOrder = this.sortingOrder === 'asc' ? 'desc' : 'asc';
    } else {
      this.sortBy = columnKey;
      this.sortingOrder = 'asc';
    }
    // this.loadData();
  }
}
