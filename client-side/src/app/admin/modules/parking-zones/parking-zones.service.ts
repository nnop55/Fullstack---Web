import { Injectable, inject } from '@angular/core';
import { environment } from '../../../../environments/environment.development';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ParkingZonesService {
  private baseUrl: string = environment.baseUrl
  private http: HttpClient = inject(HttpClient)

  getParkingZones(queryParams: any): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}parking/`, queryParams)
  }

  getParkingZoneById(zoneId: number): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}parking/${zoneId}`)
  }

  editParkingZones(params: any): Observable<any> {
    return this.http.put<any>(`${this.baseUrl}parking/edit/${params.id}`, params)
  }
}
