import {
  ChangeDetectionStrategy,
  Component,
  inject,
  PLATFORM_ID,
  signal,
  computed,
  OnInit,
  Inject,
  HostListener,
} from '@angular/core';
import { isPlatformBrowser, CommonModule } from '@angular/common';
import { Router, NavigationEnd, RouterLink, RouterLinkActive } from '@angular/router';
import { filter } from 'rxjs/operators';

import { MenuItemEntity } from '../../shared/interface/menuModel';
import { Menus } from '../../core/services/menus';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive],
  templateUrl: './sidebar.html',
  styleUrl: './sidebar.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Sidebar implements OnInit {
  // STATE LOCAL
  menuItems = signal<MenuItemEntity[]>([]);
  loading = signal(true);
  activeMenuId = signal<string | null>(null);
  // DERIVED STATE
  isCollapsed = computed(() => this.menuService.collapsedState());
  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    private menuService: Menus,
    private router: Router,
  ) {}

  ngOnInit(): void {
    if (!isPlatformBrowser(this.platformId)) return;

    this.loadMenu();
    this.syncRouteWithMenu();
  }
 // Cambia esto en tu sidebar.component.ts:

@HostListener('window:keydown', ['$event'])
handleSidebarShortcut(event: KeyboardEvent): void {
  // Verificamos la combinación Ctrl + B manualmente de forma segura
  if (event.ctrlKey && event.key.toLowerCase() === 'b') {
    event.preventDefault();
    this.menuService.toggleSidebar();
  }
}
  // -----------------------------
  // MENU ACTIONS
  // -----------------------------
  toggleMenu(menuId: string): void {
    if (this.isCollapsed()) {
      this.menuService.toggleSidebar();
      this.activeMenuId.set(menuId);
      return;
    }
    this.activeMenuId.set(this.activeMenuId() === menuId ? null : menuId);
  }

   toggleSidebar(): void {
    this.menuService.toggleSidebar(); 
  }

  private loadMenu(): void {
    this.loading.set(true);

    this.menuService.getNavigationMenuTree().subscribe({
      next: (data) => {
        this.menuItems.set(data);
        this.loading.set(false);
        this.setActiveFromRoute();
      },
      error: (err) => {
        console.error('Menu error:', err);
        this.loading.set(false);
      },
    });
  }



  // -----------------------------
  // AUTO-OPEN MENU BY ROUTE
  // -----------------------------
  private syncRouteWithMenu(): void {
    this.router.events
      .pipe(filter((e) => e instanceof NavigationEnd))
      .subscribe(() => this.setActiveFromRoute());
  }

  private setActiveFromRoute(): void {
    const currentUrl = this.router.url;

    const found = this.menuItems().find((menu) =>
      menu.submenus?.some((sub) => currentUrl.includes(sub.route || '')),
    );

    if (found) {
      this.activeMenuId.set(found.id);
    }
  }
}
