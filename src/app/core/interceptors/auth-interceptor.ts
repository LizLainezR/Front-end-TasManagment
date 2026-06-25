import { HttpInterceptorFn } from '@angular/common/http';
import { inject, PLATFORM_ID } from '@angular/core';
import { from } from 'rxjs';
import { mergeMap } from 'rxjs/operators';
import { Authservice } from '../services/authservice';
import { isPlatformBrowser } from '@angular/common';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const platformId = inject(PLATFORM_ID);
  const authService = inject(Authservice);

  if (!isPlatformBrowser(platformId)) {
    return next(req);
  }

  return from(authService.getToken()).pipe(
    mergeMap((token) => {
      if (token && req.url.includes('/api/v1')) {
        const authReq = req.clone({
          setHeaders: {
            Authorization: `Bearer ${token}`,
          },
        });
        return next(authReq);
      }

      return next(req);
    }),
  );
};
