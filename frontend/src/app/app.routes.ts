import { Routes } from '@angular/router';
import { AccueilComponent } from './pages/accueil/accueil.component';
import { ActualiteDetailComponent } from './pages/actualite-detail/actualite-detail.component';
import { ActualitePageComponent } from './pages/actualite-page/actualite-page.component';
import { EvenementDetailComponent } from './pages/evenement-detail/evenement-detail.component';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { EvenementPageComponent } from './pages/evenement-page/evenement-page.component';

export const routes: Routes = [
    { path: '', component: AccueilComponent },
    { 
        path: 'login', 
        component: LoginComponent,
    },
    { 
        path: 'register', 
        component: RegisterComponent,
        canActivate: []
    },
    
    { path: '', loadComponent: () => import('./pages/accueil/accueil.component').then(m => m.AccueilComponent) },
    { path: 'actualites', loadComponent: () => import('./pages/actualite-page/actualite-page.component').then(m => m.ActualitePageComponent) },
    { path: 'actualites/:id', loadComponent: () => import('./pages/actualite-detail/actualite-detail.component').then(m => m.ActualiteDetailComponent) },
    { path: 'evenements', loadComponent: () => import('./pages/evenement-page/evenement-page.component').then(m => m.EvenementPageComponent) },
    { path: 'evenements/:id', loadComponent: () => import('./pages/evenement-detail/evenement-detail.component').then(m => m.EvenementDetailComponent) },
    { path: 'admin', loadComponent: () => import('./pages/admin/admin.component').then(m => m.AdminComponent),}
];