import { Routes } from '@angular/router';

export const routes: Routes = [
    { path: '', loadComponent: () => import('./pages/accueil/accueil.component').then(m => m.AccueilComponent) },
    { path: 'actualites', loadComponent: () => import('./pages/actualite-page/actualite-page.component').then(m => m.ActualitePageComponent) },
    { path: 'actualites/:id', loadComponent: () => import('./pages/actualite-detail/actualite-detail.component').then(m => m.ActualiteDetailComponent) },
    { path: 'evenements', loadComponent: () => import('./pages/evennement-page/evennement-page.component').then(m => m.EvennementPageComponent) },
    { path: 'evenements/:id', loadComponent: () => import('./pages/evennement-detail/evennement-detail.component').then(m => m.EvennementDetailComponent) }
];