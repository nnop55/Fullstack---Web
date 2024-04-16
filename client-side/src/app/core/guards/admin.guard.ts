import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { inject } from '@angular/core';
import { Role } from '../../shared/utils/unions';

export const adminGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  if (authService.getBearerToken() && authService.getUserRole() === Role.user) {
    router.navigate(['/client']);
    return false
  }

  if (!authService.getBearerToken() || authService.getUserRole() !== Role.admin) {
    router.navigate(['/sign/in']);
    return false;
  }

  return true;
};
