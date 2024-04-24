import { Injectable, inject } from "@angular/core";
import { RoutingService } from "../services/routing.service";
import { IDropdown, ITableColumn } from "./unions";
import { Status } from "../../shared/utils/unions";
import { Observable, Subject, switchMap, take, takeUntil } from "rxjs";

@Injectable()
export class ModuleBase {
  data: any[] = []
  paginatorData: any = new Object();
  queryParams: any = { page: 1, pageSize: 10, sortBy: 'id', sortOrder: 'asc' };
  isLoading: boolean = false

  private destroy$ = new Subject<boolean>();

  routingService: RoutingService = inject(RoutingService)

  loadTable(serviceName: any,
    method: any) {
    let isFirstLoad = true;

    this.routingService.getQueryParams().pipe(
      switchMap(params => {
        if (Object.keys(params).length > 0)
          this.queryParams = params

        const dataObservable = this.getData(serviceName, method, this.queryParams);

        if (isFirstLoad) {
          isFirstLoad = false;
          return dataObservable.pipe(take(1));
        } else {
          return dataObservable;
        }
      }),
      takeUntil(this.destroy$)).subscribe();
  }


  private getData(
    serviceName: any,
    method: any,
    params: any
  ) {

    let loadingTimer = setTimeout(() => {
      this.isLoading = true;
    }, 500);

    return new Observable(observer => {
      serviceName[method](params).subscribe({
        next: (response: any) => {
          if (response.code === Status.success) {
            this.data = response.data.paginatedData;
            this.paginatorData = response.data.paginator;
          }
          clearTimeout(loadingTimer);
          this.isLoading = false;

          observer.next(response);
          observer.complete();
        },
        error: (error: any) => {
          clearTimeout(loadingTimer);
          this.isLoading = false;

          observer.error(error);
        }
      });
    });

  }

  getColumnSettings(): ITableColumn[] {
    return [];
  }

  transformValue(data: IDropdown[], value: string) {
    return data.filter(o => o.value == value)[0]['label']
  }

  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.unsubscribe()
  }
}