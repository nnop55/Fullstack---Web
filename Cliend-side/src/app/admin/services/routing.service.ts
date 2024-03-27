import { Injectable } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RoutingService {

  constructor(private router: Router, private acRoute: ActivatedRoute) { }

  updateUrl(url: string,
    page: number = 1,
    pageSize: number = 10,
    sortBy: string = 'id',
    sortOrder: string = 'asc') {
    const queryParams = { page, pageSize, sortBy, sortOrder }
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
