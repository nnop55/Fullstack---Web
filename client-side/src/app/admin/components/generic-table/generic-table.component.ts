import { Component, Input, SimpleChanges } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { DropdownComponent } from '../../../shared/components/dropdown/dropdown.component';
import { TextInputComponent } from '../../../shared/components/text-input/text-input.component';
import { LoadingDirective } from '../../../shared/directives/loading.directive';
import { PagingComponent } from '../paging/paging.component';
import { RoutingService } from '../../services/routing.service';
import { ActivatedRoute } from '@angular/router';
import { SearchModes, TableColumn } from '../../utils/unions';

@Component({
  selector: 'app-generic-table',
  standalone: true,
  imports: [PagingComponent, LoadingDirective, TextInputComponent, DropdownComponent, ReactiveFormsModule],
  templateUrl: './generic-table.component.html',
  styleUrl: './generic-table.component.scss'
})
export class GenericTableComponent {

  @Input() columns: TableColumn[] = [];
  @Input() path!: string;
  @Input() tableData!: any[];
  @Input() paginator: any = new Object();
  @Input() queryParams: any = new Object();
  @Input() isLoading: boolean = false;

  sortBy: string = 'id';
  sortOrder: string = 'asc';
  currentPage: number = 1;
  pageSize: number = 10;

  pathName!: string;
  searchControls: { [key: string]: FormControl } = {};
  SearchModes = SearchModes

  constructor(
    private routingService: RoutingService,
    private acRoute: ActivatedRoute
  ) {
    this.pathName = this.acRoute.snapshot.data['path']
  }

  ngOnInit(): void {
    this.initForm()
  }

  initForm() {
    this.columns.forEach(column => {
      if (column.searchable !== undefined && column.key) {
        if (column.searchable === SearchModes.FromTo) {
          this.searchControls[column.key + 'From'] = new FormControl(null);
          this.searchControls[column.key + 'To'] = new FormControl(null);
          return
        }
        this.searchControls[column.key] = new FormControl(null);
      }
    });
    this.onFilter()
  }

  onFilter() {
    for (
      const [key, value] of
      Object.entries(this.searchControls)
    ) {
      value.valueChanges.subscribe(searchTerm => {
        this.routingService.updateUrl(
          this.pathName,
          this.currentPage,
          this.pageSize,
          this.sortBy,
          this.sortOrder,
          { [key]: searchTerm }
        )
      })
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['paginator']) {
      this.paginator = changes['paginator'].currentValue
    }
    if (changes['queryParams']) {
      const newParams = changes['queryParams'].currentValue
      this.sortBy = newParams['sortBy'] ?? 'id';
      this.sortOrder = newParams['sortOrder'] ?? 'asc';
      this.currentPage = parseInt(newParams['page']) || 1;
      this.pageSize = parseInt(newParams['pageSize']) || 10;
    }
  }

  onPageChange(
    page: number,
    pageSize: number = this.pageSize
  ): void {
    this.currentPage = page
    this.routingService.updateUrl(
      this.pathName,
      this.currentPage,
      pageSize,
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
