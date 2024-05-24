import { Component, Input, SimpleChanges, inject } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { DropdownComponent } from '../../../shared/components/dropdown/dropdown.component';
import { TextInputComponent } from '../../../shared/components/text-input/text-input.component';
import { LoadingDirective } from '../../../shared/directives/loading.directive';
import { PagingComponent } from '../paging/paging.component';
import { RoutingService } from '../../services/routing.service';
import { ActivatedRoute } from '@angular/router';
import { SearchModes, ITableColumn } from '../../utils/unions';
import { debounceTime } from 'rxjs';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-table',
  standalone: true,
  imports: [PagingComponent, LoadingDirective, TextInputComponent, DropdownComponent, ReactiveFormsModule, NgClass],
  templateUrl: './table.component.html',
  styleUrl: './table.component.scss'
})
export class TableComponent {

  @Input() columns: ITableColumn[] = [];
  @Input() path!: string;
  @Input() tableData!: any[];
  @Input() paginator: any = new Object();
  @Input() queryParams: any = new Object();
  @Input() isLoading: boolean = false;
  @Input() editable: boolean = false;
  @Input() erasable: boolean = false;

  sortBy: string = 'id';
  sortOrder: string = 'asc';
  currentPage: number = 1;
  pageSize: number = 10;

  pathName!: string;
  searchTerms: any = {};
  searchControls: { [key: string]: FormControl } = {};
  SearchModes = SearchModes

  private routingService: RoutingService = inject(RoutingService)
  private acRoute: ActivatedRoute = inject(ActivatedRoute)

  ngOnInit(): void {
    this.pathName = this.acRoute.snapshot.data['path']
    this.initForm()
    this.onFilter()
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

  initForm() {
    this.columns.forEach(column => {
      const key = column.key
      if (column.searchable !== undefined && key) {
        if (column.searchable === SearchModes.FromTo) {
          this.searchControls[`${key}From`] = new FormControl(this.queryParams[`${key}From`] ?? null);
          this.searchControls[`${key}To`] = new FormControl(this.queryParams[`${key}To`] ?? null);
          return
        }
        this.queryParams[key] ? (
          this.searchControls[key] = new FormControl(this.queryParams[key]),
          this.searchTerms[key] = this.queryParams[key]
        ) : (
          this.searchControls[key] = new FormControl(null)
        )

      }
    });
  }

  onFilter() {
    for (
      const [key, value] of
      Object.entries(this.searchControls)
    ) {
      value.valueChanges
        .pipe(
          debounceTime(500)
        ).subscribe(searchTerm => {
          if (key === 'mark') {
            this.searchControls['model'].setValue(null)
          }

          this.searchTerms[key] = searchTerm;
          this.currentPage = 1
          this.updateUrl()
        })
    }
  }

  onPageChange(
    page: number,
    pageSize: number
  ): void {
    this.pageSize = pageSize
    this.currentPage = page
    this.updateUrl()
  }

  onSort(columnKey: string): void {
    if (columnKey === this.sortBy) {
      this.sortOrder = this.sortOrder === 'asc' ? 'desc' : 'asc';
    } else {
      this.sortBy = columnKey;
      this.sortOrder = 'asc';
    }

    this.updateUrl()
  }

  updateUrl() {
    this.routingService.updateUrl(
      this.pathName,
      this.currentPage,
      this.pageSize,
      this.sortBy,
      this.sortOrder,
      this.searchTerms
    )
  }
}
