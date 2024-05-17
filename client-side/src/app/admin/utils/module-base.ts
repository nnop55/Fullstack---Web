import { DestroyRef, Injectable, inject } from "@angular/core";
import { RoutingService } from "../services/routing.service";
import { IDropdown, ITableColumn } from "./unions";
import { Status } from "../../shared/utils/unions";
import { Observable, switchMap, take } from "rxjs";
import { CarModelService } from "../services/car-model.service";
import { takeUntilDestroyed } from "@angular/core/rxjs-interop";

@Injectable()
export class ModuleBase {
  data: any[] = []
  paginatorData: any = new Object();
  queryParams: any = { page: 1, pageSize: 10, sortBy: 'id', sortOrder: 'asc' };
  isLoading: boolean = false

  private destroy$ = inject(DestroyRef);

  routingService: RoutingService = inject(RoutingService)
  carModelService: CarModelService = inject(CarModelService)

  loadTable(serviceName: any,
    method: any) {
    let isFirstLoad = true;

    this.routingService.getQueryParams().pipe(
      switchMap(params => {
        if (Object.keys(params).length > 0)
          this.queryParams = params

        const data$ = this.getData(serviceName, method, this.queryParams);

        if (isFirstLoad) {
          isFirstLoad = false;
          return data$.pipe(take(1));
        } else {
          return data$;
        }
      }),
      takeUntilDestroyed(this.destroy$)).subscribe();
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

          this.fillOrClearModelDropdown(params)

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

  fillOrClearModelDropdown(params: any) {
    const mark = params['mark'];
    mark ? this.carModelService.fillModelDropdown(mark) :
      this.carModelService.clearModelDropdown()
  }

  getColumnSettings(): ITableColumn[] {
    return [];
  }

  transformValue(data: IDropdown[], value: string) {
    return data.filter(o => o.value == value)[0]['label']
  }
}