import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { ErrorService } from '../services/error.service';
import { AuthService } from '../services/auth.service';
import { LocalStorageService } from '../services/local-storage.service';
import { catchError, throwError } from 'rxjs';

export const errorInterceptor: HttpInterceptorFn = (req, next) => {
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
