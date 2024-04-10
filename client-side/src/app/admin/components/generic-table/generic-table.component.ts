import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { RoutingService } from '../../services/routing.service';
import { ActivatedRoute } from '@angular/router';
import { NgFor } from '@angular/common';
import { PagingComponent } from '../paging/paging.component';
import { TableColumn } from '../../utils/unions';

@Component({
  selector: 'app-generic-table',
  templateUrl: './generic-table.component.html',
  styleUrls: ['./generic-table.component.scss'],
  standalone: true,
  imports: [NgFor, PagingComponent]
})
export class GenericTableComponent implements OnChanges {

  @Input() columns: TableColumn[] = [];
  @Input() path!: string;
  @Input() tableData!: any[];
  @Input() paginator: any = new Object();
  @Input() queryParams: any = new Object();

  sortBy: string = 'id';
  sortOrder: string = 'asc';
  currentPage: number = 1;
  pageSize: number = 10;

  pathName!: string;

  constructor(
    private routingService: RoutingService,
    private acRoute: ActivatedRoute
  ) {
    this.pathName = this.acRoute.snapshot.data['path']
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['paginator']) {
      this.paginator = changes['paginator'].currentValue
    }
    if (changes['queryParams']) {
      const newParams = changes['queryParams'].currentValue
      this.sortBy = newParams['sortBy'] ?? 'id';
      this.sortOrder = newParams['sortOrder'] ?? 'asc';
      this.currentPage = parseInt(newParams['page']) ?? 1;
      this.pageSize = parseInt(newParams['pageSize']) ?? 10;
    }
  }

  onPageChange(page: number): void {
    this.currentPage = page
    this.routingService.updateUrl(
      this.pathName,
      this.currentPage,
      this.pageSize,
      this.sortBy,
      this.sortOrder
    )
  }

  onSort(columnKey: string): void {
    if (columnKey === this.sortBy) {
      this.sortOrder = this.sortOrder === 'asc' ? 'desc' : 'asc';
    } else {
      this.sortBy = columnKey;
      this.sortOrder = 'asc';
    }

    this.routingService.updateUrl(
      this.pathName,
      this.currentPage,
      this.pageSize,
      this.sortBy,
      this.sortOrder
    )
  }
}
