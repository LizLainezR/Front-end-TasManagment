import { APP_INITIALIZER, ApplicationConfig, PLATFORM_ID, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { provideClientHydration, withEventReplay } from '@angular/platform-browser';
import { provideHttpClient, withFetch, withInterceptors, withInterceptorsFromDi } from '@angular/common/http';

import { providePrimeNG } from 'primeng/config';

import Aura from '@primeuix/themes/aura';
import { Authservice } from './core/services/authservice';
import { authInterceptor } from './core/interceptors/auth-interceptor';
import { isPlatformBrowser } from '@angular/common';

export function initializeKeycloakFactory(authService: Authservice, platformId: Object) {
  return () => {
    if (!isPlatformBrowser(platformId)) {
      return Promise.resolve(true); // Evita ejecutar Keycloak en Node.js (Server)
    }
    return authService.initialize(); // Lo ejecuta con seguridad en el Navegador (Client)
  };
}

export const appConfig: ApplicationConfig = {
  providers: [
    providePrimeNG({
      theme:{
        preset: Aura
      }
    }),
    provideBrowserGlobalErrorListeners(),
    provideHttpClient(withFetch(), withInterceptorsFromDi(),withInterceptors([authInterceptor]) ),
    provideRouter(routes),
    provideClientHydration(withEventReplay()),

    {
      provide: APP_INITIALIZER,
      useFactory: initializeKeycloakFactory,
      deps: [Authservice, PLATFORM_ID],
      multi: true
    }
  ],
};
