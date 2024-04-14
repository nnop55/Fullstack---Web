import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, Subject, map } from 'rxjs';
import { Role, Status } from 'src/app/shared/utils/unions';
import { environment } from 'src/environments/environment.development';
import { LocalStorageService } from './local-storage.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  static readonly jwtKey = 'CURRENT-USER';

  private baseUrl: string = environment.baseUrl;

  private unauthorizedSubject = new Subject<void>();
  unauthorized$ = this.unauthorizedSubject.asObservable();

  constructor(
    private http: HttpClient,
    private router: Router,
    private ls: LocalStorageService
  ) { }

  emitUnauthorizedEvent() {
    this.unauthorizedSubject.next();
  }

  login(params: any): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}auth/login`, { ...params }).pipe(
      map(response => {
        if (response.code == Status.success) {
          this.ls.set(AuthService.jwtKey, response['data'])
          this.router.navigate(this.getUserRole() == Role.admin ? ['/admin'] : ['/client'])
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
        }

        return response;
      })
    );
  }

  logout(): Observable<void> {
    return this.http.post<any>(`${this.baseUrl}user/logout`, {}).pipe(
      map(response => {
        this.ls.remove(AuthService.jwtKey)
        return;
      })
    );
  }

  recoverPassword(password: string): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}auth/recover-password`, { password }).pipe(
      map(response => {
        this.ls.remove(AuthService.jwtKey)
        return response;
      })
    );
  }

  sendCodeToEmail(email: string): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}auth/verify-email`, { email }).pipe(
      map(response => {
        if (response.code == Status.success) {
          this.ls.set(AuthService.jwtKey, response['data'])
        }

        return response;
      })
    );
  }

  verifyCode(code: string): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}auth/verify-code`, { code });
  }

  getUserRole(): number | null {
    return this.user ?
      this.user['role'] :
      null
  }

  getBearerToken(): string | null {
    return this.user ?
      this.user['accessToken'] :
      null
  }

  get user() {
    return this.ls.get(AuthService.jwtKey)
  }
}
