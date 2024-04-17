import { Injectable } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RoutingService {

  constructor(
    private router: Router,
    private acRoute: ActivatedRoute
  ) { }

  updateUrl(url: string,
    page: number,
    pageSize: number,
    sortBy: string,
    sortOrder: string,
    filters?: any
  ) {
    console.log(filters)
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
