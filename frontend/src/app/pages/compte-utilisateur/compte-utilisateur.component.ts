import { Component, inject } from '@angular/core';
import { Utilisateur } from '../../models/Utilisateur/utilisateur';
import { AuthService } from '../../services/Auth/auth.service';
import { UtilisateurService } from '../../services/Utilisateur/utilisateur.service';
import { FormModifierPasswordComponent } from "../../components/forms/form-modifier-password/form-modifier-password.component";


@Component({
  selector: 'app-compte-utilisateur',
  standalone: true,
  imports: [FormModifierPasswordComponent],
  templateUrl: './compte-utilisateur.component.html',
  styleUrl: './compte-utilisateur.component.css'
})
export class CompteUtilisateurComponent {
  currentUser: Utilisateur | null = null;
  isAuthenticated: boolean = false;
  loadingUser: boolean = true;
  utilisateurMdp!: Utilisateur;
  erreurLoadingUser: boolean = false;
  
  
  // État UI
  modifierMdp: boolean = false;
  resetKey = 0;
  private readonly utilisateurService = inject(UtilisateurService);
  private readonly authService = inject(AuthService);
  ngOnInit(): void {
    this.authService.currentUser$.subscribe({
      next: (user) => {
        this.currentUser = user;
        this.isAuthenticated = user !== null;
        this.loadingUser = false;
      },
      error: (error) => {
        this.erreurLoadingUser = true;
        this.loadingUser = false;
        console.error('Erreur lors de la récupération de l\'utilisateur courant', error);
      }
    });
    
  }
  public logout(): void {
    this.authService.logout().subscribe({
      next: () => {
        console.log('Déconnexion réussie');
      },
      error: (error) => {
        console.error('Erreur lors de la déconnexion', error);
      }
    });
  }
  public modifierMotDePasse(): void {
    this.modifierMdp = true;
    this.resetKey++;
  }
  onMdpSubmitted(payload: { motDePasse: string }): void {
    //Faire la transimission au service => backend
  }
  onMdpCancelled(): void {
    this.modifierMdp = false;
    this.resetKey++;
  }
}
