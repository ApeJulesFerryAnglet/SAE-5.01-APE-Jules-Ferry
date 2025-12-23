import { Routes } from '@angular/router';
import { AccueilComponent } from './pages/accueil/accueil.component';
import { ActualiteDetailComponent } from './pages/actualite-detail/actualite-detail.component';
import { ActualitePageComponent } from './pages/actualite-page/actualite-page.component';

export const routes: Routes = [
    { path: '', component: AccueilComponent },
    { path:'actualites', component: ActualitePageComponent },
    { path: 'actualites/:id', component: ActualiteDetailComponent }
];