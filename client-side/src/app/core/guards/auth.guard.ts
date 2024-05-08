import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { inject } from '@angular/core';
import { LocalStorageService } from '../services/local-storage.service';

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);
  const ls = inject(LocalStorageService)

  const not = () => {
    router.navigate(['/sign/in']);
    return false
  }

  authService.unauthorized$.subscribe((authorized) => {
    if (!authorized) {
      ls.remove(AuthService.jwtKey)
      not()
    }
  });

  if (!authService.getBearerToken()) {
    not()
  }
  return true;
};
