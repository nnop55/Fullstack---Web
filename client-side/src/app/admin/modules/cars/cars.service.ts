import { Injectable, inject } from '@angular/core';
import { environment } from '../../../../environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CarsService {
  private baseUrl: string = environment.baseUrl
  private http: HttpClient = inject(HttpClient)

  getCars(queryParams: any): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}car/`, queryParams)
  }
}
