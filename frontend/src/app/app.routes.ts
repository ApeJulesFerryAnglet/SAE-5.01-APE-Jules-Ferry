import { Routes } from '@angular/router';
import { AccueilComponent } from './pages/accueil/accueil.component';
import { ActualiteDetailComponent } from './pages/actualite-detail/actualite-detail.component';
import { ActualitePageComponent } from './pages/actualite-page/actualite-page.component';
import { EvenementDetailComponent } from './pages/evenement-detail/evenement-detail.component';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { guestGuard } from './guards/guest.guard';
import { EvenementPageComponent } from './pages/evenement-page/evenement-page.component';

export const routes: Routes = [
    { path: '', component: AccueilComponent },
    { 
        path: 'login', 
        component: LoginComponent,
        canActivate: [guestGuard]
    },
    { 
        path: 'register', 
        component: RegisterComponent,
        canActivate: [guestGuard]
    },
    
    { path: '**', redirectTo: '' },
    { path:'actualites', component: ActualitePageComponent },
    { path: 'actualites/:id', component: ActualiteDetailComponent },
    { path: 'evenements', component: EvenementPageComponent },
    { path: 'evenements/:id', component: EvenementDetailComponent }
];