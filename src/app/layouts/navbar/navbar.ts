import { Component, HostListener, inject, signal } from '@angular/core';
import { Authservice } from '../../core/services/authservice';
import { UpperCasePipe } from '@angular/common';
import { Menus } from '../../core/services/menus';

@Component({
  selector: 'app-navbar',
  imports: [],
  templateUrl: './navbar.html',
  styleUrl: './navbar.scss',
})
export class Navbar {
username: string | undefined;
  
  // SOLUCIÓN 1: Tipamos explícitamente el Signal como boolean
  isUserDropdownOpen = signal<boolean>(false);

  constructor(
    private authService: Authservice,
    private menuService: Menus
  ) {
    this.username = this.authService.userProfile()?.username;
  }

  // SOLUCIÓN 2: Cambiamos el parámetro a 'Event' genérico para calmar al decorador
  @HostListener('window:keydown.control.k', ['$event'])
  handleSearchShortcut(event: Event): void {
    event.preventDefault(); // Previene la acción por defecto del navegador de forma segura
    this.openSearch();
  }

  @HostListener('window:keydown.escape')
  closeDropdown(): void {
    this.isUserDropdownOpen.set(false);
  }

  toggleUserDropdown(): void {
    // SOLUCIÓN 1: Ahora 'prev' sabe con certeza que es un valor boolean
    this.isUserDropdownOpen.update((prev: boolean) => !prev);
  }

  openSearch(): void {
    console.log('Abriendo motor o modal de búsqueda global...');
  }

  logout(): void {
    this.isUserDropdownOpen.set(false);
    this.authService.logout();
  }
}
