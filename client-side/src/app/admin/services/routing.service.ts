import { Injectable, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, map, take } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RoutingService {
  private router: Router = inject(Router)
  private acRoute: ActivatedRoute = inject(ActivatedRoute)

  updateUrl(url: string,
    page: number,
    pageSize: number,
    sortBy: string,
    sortOrder: string,
    filters: any
  ) {
    const queryParams = { page, pageSize, sortBy, sortOrder, ...filters }
    this.router.navigate([url], { queryParams });
  }

  getQueryParams(): Observable<any> {
    return this.acRoute.queryParams.pipe(
      map(params => {
        return params;
      })
    );
  }

}
