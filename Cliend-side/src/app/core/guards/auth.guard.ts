import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { LocalStorageService } from '../services/local-storage.service';


export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);
  const ls = inject(LocalStorageService)

  authService.unauthorized$.subscribe(() => {
    ls.remove('currentUser')
    router.navigate(['/auth/signin']);
    return false
  });

  if (!authService.getBearerToken()) {
    router.navigate(['/auth/signin']);
    return false;
  }
  return true;
};


