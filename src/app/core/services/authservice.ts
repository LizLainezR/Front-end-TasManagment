import { Injectable, inject, signal, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import Keycloak from 'keycloak-js';

interface UserProfile {
  username: string;
  roles: string[];
}

@Injectable({
  providedIn: 'root',
})
export class Authservice {
  private platformId = inject(PLATFORM_ID);
  private isBrowser = isPlatformBrowser(this.platformId);
  private KeycloakAuth: Keycloak | null = null;

  public userProfile = signal<UserProfile | null>(null);

  initialize(): Promise<boolean> {
    if (!this.isBrowser) {
      return Promise.resolve(true);
    }

    this.KeycloakAuth = new Keycloak({
      url: 'http://localhost:8080',
      realm: 'hyper-task-app',
      clientId: 'hyper-task-app',
    });

    return this.KeycloakAuth.init({
      onLoad: 'login-required',
      checkLoginIframe: false,
      pkceMethod: 'S256',
    })
      .then((authenticated) => {
        if (authenticated && this.KeycloakAuth) {
          this.userProfile.set({
            username: this.KeycloakAuth.tokenParsed?.['preferred_username'] || 'Usuario',
            roles: this.KeycloakAuth.tokenParsed?.['realm_access']?.roles || [],
          });
        }
        return authenticated;
      })
      .catch((error) => {
        console.error('Error durante la inicialización de Keycloak:', error);
        return false;
      });
  }

  hasToken(): boolean {
    return Boolean(this.KeycloakAuth?.token);
  }

  async getToken(): Promise<string> {
    if (!this.KeycloakAuth || !this.isBrowser) {
      return '';
    }

    try {
      await this.KeycloakAuth.updateToken(30);
    } catch (error) {
      console.warn('Keycloak token refresh failed:', error);
    }

    return this.KeycloakAuth.token || '';
  }

  login(): void {
    if (!this.isBrowser) {
      return;
    }

    if (this.KeycloakAuth) {
      this.KeycloakAuth.login({
        redirectUri: window.location.origin,
      });
    } else {
      console.error('Keycloak no está inicializado.');
    }
  }

  logout(): void {
    if (!this.isBrowser) {
      return;
    }

    this.KeycloakAuth?.logout({
      redirectUri: window.location.origin,
    });
    this.userProfile.set(null);
  }
}
