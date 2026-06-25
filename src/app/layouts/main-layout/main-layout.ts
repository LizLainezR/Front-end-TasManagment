import { Component, computed } from '@angular/core';
import { Sidebar } from '../sidebar/sidebar';
import { Navbar } from '../navbar/navbar';
import { RouterOutlet } from '@angular/router';
import { Menus } from '../../core/services/menus';

@Component({
  selector: 'app-main-layout',
  imports: [Sidebar, Navbar, RouterOutlet],
  templateUrl: './main-layout.html',
  styleUrl: './main-layout.scss',
})
export class MainLayout {
  constructor( private menuService: Menus) {}

  isCollapsed = computed(() => this.menuService.collapsedState());
}
