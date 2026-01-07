import { Component, inject } from '@angular/core';
import { Utilisateur } from '../../models/Utilisateur/utilisateur';
import { AuthService } from '../../services/Auth/auth.service';
import { UtilisateurService } from '../../services/Utilisateur/utilisateur.service';

@Component({
  selector: 'app-compte-utilisateur',
  standalone: true,
  imports: [],
  templateUrl: './compte-utilisateur.component.html',
  styleUrl: './compte-utilisateur.component.css'
})
export class CompteUtilisateurComponent {
  currentUser: Utilisateur | null = null;
  isAuthenticated: boolean = false;
  utilisateurInfo!: Utilisateur;
  private readonly utilisateurService = inject(UtilisateurService);
  private readonly authService = inject(AuthService);
  ngOnInit(): void {
    this.authService.currentUser$.subscribe({
      next: (user) => {
        this.currentUser = user;
        this.isAuthenticated = user !== null;
        this.utilisateurService.getUtilisateurById(user!.id_utilisateur).subscribe({
          next: (utilisateur) => {
            this.utilisateurInfo = utilisateur;
          },
          error: (error) => {
            console.error('Erreur lors de la récupération des détails de l\'utilisateur', error);
          }
        });
      },
      error: (error) => {
        console.error('Erreur lors de la récupération de l\'utilisateur courant', error);
      }
    });
  }
}
