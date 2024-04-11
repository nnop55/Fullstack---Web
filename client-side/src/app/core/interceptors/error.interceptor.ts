import { inject } from '@angular/core';
import {
  HttpRequest,
  HttpErrorResponse,
  HttpInterceptorFn,
  HttpHandlerFn
} from '@angular/common/http';
import { catchError, throwError } from 'rxjs';
import { ErrorService } from '../services/error.service';
import { AuthService } from '../services/auth.service';
import { LocalStorageService } from '../services/local-storage.service';

export const ErrorInterceptor: HttpInterceptorFn = (req: HttpRequest<unknown>, next:
  HttpHandlerFn) => {
  const errorService = inject(ErrorService)
  const authService = inject(AuthService)
  const ls = inject(LocalStorageService)

  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      errorService.handleError(error);

      if (error.status === 401) {
        authService.emitUnauthorizedEvent()
        ls.remove(AuthService.jwtKey)
      }

      return throwError(error);
    })
  );
};
