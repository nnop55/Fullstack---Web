import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

export const adminGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  if (!authService.isAuthenticatedUser() || authService.getUserRole() !== 'admin') {
    router.navigate(['/auth']);
    return false;
  }
  return true;
};
