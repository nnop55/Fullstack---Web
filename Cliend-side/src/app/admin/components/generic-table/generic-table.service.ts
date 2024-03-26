import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class GenericTableService {

  private baseUrl: string = environment.baseUrl

  constructor(private http: HttpClient) { }

  getTableData(
    path: string,
    currentPage: number,
    pageSize: number,
    sortBy: string,
    sortingOrder: string
  ): Observable<any> {
    const url = `${this.baseUrl + path}?page=${currentPage}&pageSize=${pageSize}&sortBy=${sortBy}&sortOrder=${sortingOrder}`;
    return this.http.get<any[]>(url)
  }
}
