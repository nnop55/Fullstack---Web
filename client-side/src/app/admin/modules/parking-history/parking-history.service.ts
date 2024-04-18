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
    return this.http.post<any>(`${this.baseUrl}history/`, queryParams)
  }
}
