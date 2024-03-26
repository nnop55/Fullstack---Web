import { Component, Input, OnInit } from '@angular/core';
import { TableColumn } from 'src/app/shared/utils/unions';
import { GenericTableService } from './generic-table.service';

@Component({
  selector: 'app-generic-table',
  templateUrl: './generic-table.component.html',
  styleUrls: ['./generic-table.component.scss']
})
export class GenericTableComponent implements OnInit {

  @Input() columns: TableColumn[] = [];
  @Input() path!: string;

  data: any[] = [];
  currentPage: number = 1;
  pageSize: number = 10;
  totalRecords: number = 0;
  sortBy: string = 'id';
  sortingOrder: string = 'asc';

  constructor(private tableService: GenericTableService) { }

  ngOnInit(): void {
    this.loadData();
  }

  loadData(): void {
    this.tableService.getTableData(
      this.path,
      this.currentPage,
      this.pageSize,
      this.sortBy,
      this.sortingOrder).subscribe((response) => {
        this.data = response['data']
      })
  }

  onPageChange(page: number): void {
    this.currentPage = page
    this.loadData();
  }

  onSort(columnKey: string): void {
    if (columnKey === this.sortBy) {
      this.sortingOrder = this.sortingOrder === 'asc' ? 'desc' : 'asc';
    } else {
      this.sortBy = columnKey;
      this.sortingOrder = 'asc';
    }
    this.loadData();
  }
}
