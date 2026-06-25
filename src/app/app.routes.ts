import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth-guard';

export const routes: Routes = [
    {
    path: '',
    loadComponent: () => import('./layouts/main-layout/main-layout').then((m) => m.MainLayout),
    canActivate: [authGuard],
    children: [
        { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
        {
            path: 'dashboard',
            loadComponent: () => import('./taskFeatures/dashboard/pages/dashboard').then((m) => m.Dashboard),
        },
    ],
},
    {
    path: '**',
    redirectTo: '',
        },
];