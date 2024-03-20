import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { Status } from 'src/app/shared/utils/unions';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private isAuthenticated = false;
  private userRole: number | null = null;
  private token: string | null = null;

  constructor(private http: HttpClient) { }

  login(email: string, password: string): Observable<any> {
    return this.http.post<any>('your_login_endpoint', { email, password }).pipe(
      map(response => {
        if (response.code == Status.success) {
          this.userRole = response['data'].role;
          this.token = response['data'].accessToken;
          localStorage.setItem('currentUser', JSON.stringify(response));
        }
        return response;
      })
    );
  }

  logout(): Observable<void> {
    return this.http.post<any>('your_logout_endpoint', {}).pipe(
      map(response => {
        localStorage.removeItem('currentUser');
        return;
      })
    );
  }

  recoverPassword(username: string): Observable<any> {
    return this.http.post<any>('your_recover_password_endpoint', { username }).pipe(
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
