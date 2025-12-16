import { CanActivateFn, Router, ActivatedRouteSnapshot } from '@angular/router';
import { inject } from '@angular/core';
import { RoleUtilisateur } from '../../enums/RoleUtilisateur/role-utilisateur';
import { AuthService } from '../../services/Auth/auth.service';

export const roleGuard: CanActivateFn = (route, state) => {
  const auth = inject(AuthService);
  const router = inject(Router);
  if(!auth.isAuthenticated()){
    router.navigate(['/login']);
    return false;
  }
  const required = (route.data['role'] as RoleUtilisateur);
  if (required.length && !auth.hasRole(required)) {
    router.navigate(['/forbidden']);
    return false;
  }
  return true;
};
