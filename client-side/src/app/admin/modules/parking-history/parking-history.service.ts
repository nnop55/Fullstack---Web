import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ParkingHistoryService {
  private baseUrl: string = environment.baseUrl

  constructor(private http: HttpClient) { }

  getParkingHistory(queryParams: any): Observable<any> {
    const { page = 1, pageSize = 10, sortBy = 'id', sortOrder = 'asc' } = queryParams
    const url = `${this.baseUrl}history/?page=${page}&pageSize=${pageSize}&sortBy=${sortBy}&sortOrder=${sortOrder}`;
    return this.http.get<any>(url)
  }
}
