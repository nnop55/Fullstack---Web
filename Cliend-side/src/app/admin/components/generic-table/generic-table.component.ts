import { Component, Input, OnInit } from '@angular/core';
import { TableColumn } from 'src/app/shared/utils/unions';

@Component({
  selector: 'app-generic-table',
  templateUrl: './generic-table.component.html',
  styleUrls: ['./generic-table.component.scss']
})
export class GenericTableComponent implements OnInit {

  @Input() columns: TableColumn[] = [];
  data: any[] = [];
  currentPage: number = 1;
  pageSize: number = 10;
  totalRecords: number = 0;
  sortingKey: string = '';
  sortingOrder: string = '';

  constructor() { }

  ngOnInit(): void {
    this.loadData();
  }

  loadData(): void {
    // const url = `/api/data?page=${this.currentPage}&pageSize=${this.pageSize}&sortBy=${this.sortingKey}&sortOrder=${this.sortingOrder}`;
    // this.http.get<any[]>(url)
    //   .subscribe(response => {
    //     this.data = response.data;
    //     this.totalRecords = response.totalRecords;
    //   });
    this.data = [{ id: 1, vinCode: 'ABC123' }, { id: 2, vinCode: 'DEF456' }]
  }

  onPageChange(page: number): void {
    this.currentPage = page;
    this.loadData();
  }

  onSort(columnKey: string): void {
    if (columnKey === this.sortingKey) {
      this.sortingOrder = this.sortingOrder === 'asc' ? 'desc' : 'asc';
    } else {
      this.sortingKey = columnKey;
      this.sortingOrder = 'asc';
    }
    this.loadData();
  }
}
