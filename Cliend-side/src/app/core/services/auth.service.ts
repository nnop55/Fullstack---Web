import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private isAuthenticated = false;
  private userRole: string | null = null;
  private token: string | null = null;

  constructor(private http: HttpClient) { }

  login(email: string, password: string): Observable<any> {
    return this.http.post<any>('your_login_endpoint', { email, password }).pipe(
      map(response => {
        if (response) {
          this.userRole = response.role;
          this.token = response.accessToken;
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
        if (response) {
          this.token = response.accessToken;
          localStorage.setItem('currentUser', JSON.stringify(response));
        }
        return response;
      })
    );
  }

  isAuthenticatedUser(): boolean {
    return this.isAuthenticated;
  }

  getUserRole(): string | null {
    return this.userRole;
  }

  getBearerToken(): string | null {
    return this.token;
  }
}
