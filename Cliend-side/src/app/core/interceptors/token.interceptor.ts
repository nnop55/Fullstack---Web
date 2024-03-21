import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { environment } from 'src/environments/environment.development';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  baseUrl: string = environment.baseUrl;

  constructor(private authService: AuthService) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (this.shouldAddToken(request.url)) {
      const token = this.authService.getBearerToken();
      const authReq = request.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`
        }
      });
      return next.handle(token ? authReq : request);
    } else {
      return next.handle(request);
    }
  }

  private shouldAddToken(url: string): boolean {
    return url.startsWith(`${this.baseUrl}auth/login`) || url.startsWith(`${this.baseUrl}auth/verify-email`);
  }
}
