import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { Role } from 'src/app/shared/utils/unions';

export const adminGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  if (!authService.getBearerToken() || authService.getUserRole() !== Role.admin) {
    router.navigate(['/auth/signin']);
    return false;
  }
  return true;
};
