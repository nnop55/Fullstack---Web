import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, map } from 'rxjs';
import { Role, Status } from 'src/app/shared/utils/unions';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private isAuthenticated = false;
  private userRole: number | null = null;
  private token: string | null = null;
  baseUrl: string = environment.baseUrl;

  constructor(private http: HttpClient, private router: Router) { }

  login(params: any): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}auth/login`, { ...params }).pipe(
      map(response => {
        if (response.code == Status.success) {
          this.userRole = response['data'].role;
          this.token = response['data'].accessToken;
          localStorage.setItem('currentUser', JSON.stringify(response['data']));
          this.router.navigate(this.userRole == Role.admin ? ['/admin'] : ['/client'])
        } else {

        }
        return response;
      })
    );
  }

  register(params: any): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}auth/register`, { ...params }).pipe(
      map(response => {
        if (response.code == Status.success) {
          this.login(
            {
              email: params['email'],
              password: params['password']
            }
          ).subscribe()
        } else {

        }

        return response;
      })
    );
  }

  logout(): Observable<void> {
    return this.http.post<any>(`${this.baseUrl}auth/logout`, {}).pipe(
      map(response => {
        localStorage.removeItem('currentUser');
        return;
      })
    );
  }

  recoverPassword(username: string): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}auth/recover-password`, { username }).pipe(
      map(response => {
        if (response.code == Status.success) {
          this.token = response['data'].accessToken;
          localStorage.setItem('currentUser', JSON.stringify(response));
        }
        return response;
      })
    );
  }

  isAuthenticatedUser(): boolean {
    return this.isAuthenticated;
  }

  getUserRole(): number | null {
    return this.userRole;
  }

  getBearerToken(): string | null {
    return this.token;
  }
}
