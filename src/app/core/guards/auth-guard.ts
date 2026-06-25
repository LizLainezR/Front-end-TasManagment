import { CanActivateFn } from '@angular/router';
import { Authservice } from '../services/authservice';
import { inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(Authservice);
  const platformId = inject(PLATFORM_ID);

  if (!isPlatformBrowser(platformId)) {
    return true;
  }

  if (authService.hasToken()) {
    return true;
  }
 
  return false;
};
