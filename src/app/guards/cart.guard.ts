import { CanActivateFn, Router } from '@angular/router';
import { CartService } from '../shared/services/cart.service';
import { inject } from '@angular/core';

export const cartGuard: CanActivateFn = (route, state) => {
  const cartService = inject(CartService);
  const router = inject(Router);

  if (cartService.loadCart().length > 0) return true;
  else {
    router.navigate(['']);
    return false;
  }

  return true;
};
