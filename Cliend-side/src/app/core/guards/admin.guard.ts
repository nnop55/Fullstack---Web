import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { Role } from 'src/app/shared/utils/unions';

export const adminGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  if (!authService.isAuthenticatedUser() || authService.getUserRole() !== Role.admin) {
    router.navigate(['/auth']);
    return false;
  }
  return true;
};
