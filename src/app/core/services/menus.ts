import { Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { MenuItemEntity } from '../../shared/interface/menuModel';

@Injectable({
  providedIn: 'root',
})
export class Menus {
  private apiUrl = `${environment.apiUrl}/menus`;

  collapsedState = signal<boolean>(false);

  constructor(private http: HttpClient) {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('sidebar-collapsed');
      if (saved) this.collapsedState.set(JSON.parse(saved));
    }
  }

  toggleSidebar(): void {
    this.collapsedState.update((v) => !v);
    if (typeof window !== 'undefined') {
      localStorage.setItem('sidebar-collapsed', JSON.stringify(this.collapsedState()));
    }
  }
  getNavigationMenuTree(): Observable<MenuItemEntity[]> {
    return this.http.get<MenuItemEntity[]>(this.apiUrl);
  }
}
