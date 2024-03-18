import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

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
    return url.startsWith('your_login_endpoint') || url.startsWith('your_recover_password_endpoint');
  }
}
