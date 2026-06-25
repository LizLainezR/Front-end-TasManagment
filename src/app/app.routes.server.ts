import { RenderMode, ServerRoute } from '@angular/ssr';

export const serverRoutes: ServerRoute[] = [
  {
    path: 'dashboard',
    renderMode: RenderMode.Client, // <--- Esto evita que el servidor toque el dashboard
  },
  {
    path: '**',
    renderMode: RenderMode.Prerender,
  },
];
