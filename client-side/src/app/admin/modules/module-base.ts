import { inject } from "@angular/core";
import { RoutingService } from "../services/routing.service";
import { TableColumn } from "../utils/unions";
import { Status } from "../../shared/utils/unions";

export class ModuleBase {
  data: any[] = []
  paginatorData: any = new Object();
  queryParams: any;
  routingService: RoutingService = inject(RoutingService)
  isLoading: boolean = false

  onRoute(serviceName: any,
    method: any) {
    this.routingService.getQueryParams().subscribe(params => {
      if (params) this.queryParams = params;
      this.getData(
        serviceName,
        method,
        this.queryParams
      );
    });
  }

  getData(
    serviceName: any,
    method: any,
    params: any
  ) {
    this.isLoading = true
    serviceName[method](
      params
    ).subscribe({
      next: (response: any) => {
        if (response.code == Status.success) {
          this.data = response['data']['paginatedData']
          this.paginatorData = response['data']['paginator']
        }
        this.isLoading = false
      },
      error: () => this.isLoading = false
    })

  }

  getColumnSettings(): TableColumn[] {
    return [];
  }
}