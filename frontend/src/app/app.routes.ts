import { Routes } from '@angular/router';
import { AccueilComponent } from './pages/accueil/accueil.component';
import { authGuard } from './guard/Auth/auth.guard';
import { RoleUtilisateur } from './enums/RoleUtilisateur/role-utilisateur';
import { roleGuard } from './guard/Role/role.guard';

export const routes: Routes = [
    { path: '', component: AccueilComponent },
];
//Exemple de route avec guard pour empêcher l'accès sans authentification
// { path:'admin', canActivate : [authGuard, roleGuard], data: { role: RoleUtilisateur.administrateur}, loadComponent: () => import('./pages/admin/admin.component').then(m => m.AdminComponent) },