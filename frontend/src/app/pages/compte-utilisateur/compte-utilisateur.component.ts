import { Component, inject } from '@angular/core';
import { Utilisateur } from '../../models/Utilisateur/utilisateur';
import { AuthService } from '../../services/Auth/auth.service';

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
  private readonly authService = inject(AuthService);
  ngOnInit(): void {
    this.authService.currentUser$.subscribe({
      next: (user) => {
        this.currentUser = user;
        this.isAuthenticated = user !== null;
      },
      error: (error) => {
        console.error('Erreur lors de la récupération de l\'utilisateur courant', error);
      }
    });
  }
}
