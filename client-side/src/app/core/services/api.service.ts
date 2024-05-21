import { Injectable, inject } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private baseUrl: string = environment.baseUrl;
  private http: HttpClient = inject(HttpClient)


  getUserRoles(): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}user/roles`)
  }
}


