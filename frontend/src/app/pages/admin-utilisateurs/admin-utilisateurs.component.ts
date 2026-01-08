import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HeaderComponent } from '../../components/header/header.component';
import { FooterComponent } from '../../components/footer/footer.component';
import { SpinnerComponent } from '../../components/spinner/spinner.component';
import { UtilisateurService } from '../../services/Utilisateur/utilisateur.service';
import { Utilisateur } from '../../models/Utilisateur/utilisateur';
import { ToastService } from '../../services/Toast/toast.service';
import { TypeErreurToast } from '../../enums/TypeErreurToast/type-erreur-toast';
import { RoleUtilisateur } from '../../enums/RoleUtilisateur/role-utilisateur';
import { StatutCompte } from '../../enums/StatutCompte/statut-compte';

@Component({
  selector: 'app-admin-utilisateurs',
  standalone: true,
  imports: [CommonModule, SpinnerComponent, FormsModule],
  templateUrl: './admin-utilisateurs.component.html',
  styleUrls: ['./admin-utilisateurs.component.css']
})
export class AdminUtilisateursComponent implements OnInit {
  utilisateurs: Utilisateur[] = [];
  isLoading = true;

  searchText: string = '';

  showCreationForm: boolean = false;
  newUser: any = { // Objet temporaire pour le formulaire
    nom: '',
    prenom: '',
    email: '',
    mot_de_passe: '', // Obligatoire pour la création
    role: RoleUtilisateur.parent,
    statut_compte: StatutCompte.actif
  };
  
  // Pour utiliser l'enum dans le HTML
  RoleUtilisateur = RoleUtilisateur;
  StatutCompte = StatutCompte;

  constructor(
    private utilisateurService: UtilisateurService,
    private toastService: ToastService
  ) {}

  ngOnInit(): void {
    this.chargerUtilisateurs();
  }

  chargerUtilisateurs(): void {
    this.isLoading = true;
    this.utilisateurService.getAllUtilisateurs().subscribe({
      next: (data) => {
        this.utilisateurs = data;
        this.isLoading = false;
      },
      error: (err) => {
        this.toastService.show('Erreur lors du chargement des utilisateurs', TypeErreurToast.ERROR);
        this.isLoading = false;
      }
    });
  }

  get filteredUtilisateurs(): Utilisateur[] {
    if (!this.searchText) {
      return this.utilisateurs;
    }
    const search = this.searchText.toLowerCase();
    return this.utilisateurs.filter(u => 
      u.nom.toLowerCase().includes(search) || 
      u.prenom.toLowerCase().includes(search) || 
      u.email.toLowerCase().includes(search)
    );
  }

  toggleCreationForm(): void {
    this.showCreationForm = !this.showCreationForm;
  }

  creerUtilisateur(): void {
    if (!this.newUser.nom || !this.newUser.prenom || !this.newUser.email || !this.newUser.mot_de_passe) {
      this.toastService.show('Veuillez remplir tous les champs obligatoires.', TypeErreurToast.ERROR);
      return;
    }

    // Appel au service (cast en Utilisateur car l'ID est généré par le back)
    this.utilisateurService.createUtilisateur(this.newUser as Utilisateur).subscribe({
      next: (userCree) => {
        this.toastService.show('Utilisateur créé avec succès !', TypeErreurToast.SUCCESS);
        this.utilisateurs.push(userCree); // Ajout direct à la liste
        this.showCreationForm = false; // Fermer le formulaire
        this.resetNewUser();
      },
      error: (err) => {
        console.error(err);
        this.toastService.show('Erreur lors de la création (Email déjà pris ?)', TypeErreurToast.ERROR);
      }
    });
  }

  resetNewUser(): void {
    this.newUser = {
      nom: '',
      prenom: '',
      email: '',
      mot_de_passe: '',
      role: RoleUtilisateur.parent,
      statut_compte: StatutCompte.actif
    };
  }

  modifierUtilisateur(id: number): void {
    // CORRECTION : Utilisation de WARNING ou ERROR selon ce que tu as
    this.toastService.show('Fonctionnalité de modification à venir', TypeErreurToast.ERROR);
  }

  supprimerUtilisateur(id: number): void {
    if(confirm('Êtes-vous sûr de vouloir supprimer cet utilisateur ?')) {
      this.utilisateurService.deleteUtilisateur(id).subscribe({
        next: () => {
          this.toastService.show('Utilisateur supprimé avec succès', TypeErreurToast.SUCCESS);
          this.chargerUtilisateurs();
        },
        error: () => {
          this.toastService.show('Impossible de supprimer l\'utilisateur', TypeErreurToast.ERROR);
        }
      });
    }
  }
}