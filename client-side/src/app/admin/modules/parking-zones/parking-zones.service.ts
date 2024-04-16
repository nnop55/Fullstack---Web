import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment.development';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ParkingZonesService {
  private baseUrl: string = environment.baseUrl

  constructor(private http: HttpClient) { }

  getParkingZones(queryParams: any): Observable<any> {
    const { page = 1, pageSize = 10, sortBy = 'id', sortOrder = 'asc' } = queryParams
    const url = `${this.baseUrl}parking/?page=${page}&pageSize=${pageSize}&sortBy=${sortBy}&sortOrder=${sortOrder}`;
    return this.http.get<any>(url)
  }
}
