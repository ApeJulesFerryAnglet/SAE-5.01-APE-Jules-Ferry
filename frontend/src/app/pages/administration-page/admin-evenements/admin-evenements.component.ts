import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { forkJoin } from 'rxjs';

import { EvenementService } from '../../../services/Evenement/evenement.service';
import { TacheService } from '../../../services/Tache/tache.service';
import { CreneauService } from '../../../services/Creneau/creneau.service';
import { InscriptionService } from '../../../services/Inscription/inscription.service';
import { UtilisateurService } from '../../../services/Utilisateur/utilisateur.service';
import { ToastService } from '../../../services/Toast/toast.service';
import { TypeErreurToast } from '../../../enums/TypeErreurToast/type-erreur-toast';

import { Evenement } from '../../../models/Evenement/evenement';
import { Tache } from '../../../models/Tache/tache';
import { Creneau } from '../../../models/Creneau/creneau';
import { Inscription } from '../../../models/Inscription/inscription';
import { Utilisateur } from '../../../models/Utilisateur/utilisateur';

interface ExtendedCreneau extends Creneau {
  filledInscriptions?: ExtendedInscription[];
}

interface ExtendedTache extends Tache {
  extendedCreneaux?: ExtendedCreneau[];
}

interface ExtendedEvenement extends Evenement {
  extendedTaches?: ExtendedTache[];
  totalInscrits?: number;
  isExpanded?: boolean;
}

interface ExtendedInscription extends Inscription {
  userNomComplet?: string;
  userEmail?: string;
}

@Component({
  selector: 'app-admin-evenements',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './admin-evenements.component.html',
  styleUrl: './admin-evenements.component.css'
})
export class AdminEvenementsComponent implements OnInit {
  private readonly evenementService = inject(EvenementService);
  private readonly tacheService = inject(TacheService);
  private readonly creneauService = inject(CreneauService);
  private readonly inscriptionService = inject(InscriptionService);
  private readonly utilisateurService = inject(UtilisateurService);
  private readonly toastService = inject(ToastService);

  events: Evenement[] = [];
  taches: Tache[] = [];
  creneaux: Creneau[] = [];
  inscriptions: Inscription[] = [];
  users: Map<number, Utilisateur> = new Map<number, Utilisateur>();

  processedEvents: ExtendedEvenement[] = [];

  loading = true;
  searchText = '';

  ngOnInit(): void {
    this.loadAllData();
  }

  loadAllData(): void {
    this.loading = true;
    forkJoin({
      events: this.evenementService.getAllEvenements('tous'),
      taches: this.tacheService.getAllTaches(),
      creneaux: this.creneauService.getAllCreneaux(),
      inscriptions: this.inscriptionService.getAllInscriptions(),
      users: this.utilisateurService.getAllUtilisateurs()
    }).subscribe({
      next: (data) => {
        this.events = data.events;
        this.taches = data.taches;
        this.creneaux = data.creneaux;
        this.inscriptions = data.inscriptions;

        this.users = new Map<number, Utilisateur>(data.users.map(u => [u.id_utilisateur, u]));

        this.processData();
        this.loading = false;
      },
      error: (err) => {
        console.error('Erreur chargement données', err);
        this.toastService.show('Erreur lors du chargement des données', TypeErreurToast.ERROR);
        this.loading = false;
      }
    });
  }

  processData(): void {
    const extendedInscriptions: ExtendedInscription[] = this.inscriptions.map(i => {
      const user = this.users.get(i.id_utilisateur);
      return {
        ...i,
        userNomComplet: user ? `${user.prenom} ${user.nom.toUpperCase()}` : 'Inconnu',
        userEmail: user ? user.email : ''
      };
    });

    const inscriptionsByCreneau = new Map<number, ExtendedInscription[]>();
    extendedInscriptions.forEach(i => {
      const existing = inscriptionsByCreneau.get(i.id_creneau) || [];
      existing.push(i);
      inscriptionsByCreneau.set(i.id_creneau, existing);
    });

    const extendedCreneaux: ExtendedCreneau[] = this.creneaux.map(c => ({
      ...c,
      filledInscriptions: inscriptionsByCreneau.get(c.id_creneau) || []
    }));

    const creneauxByTache = new Map<number, ExtendedCreneau[]>();
    extendedCreneaux.forEach(c => {
      const existing = creneauxByTache.get(c.id_tache) || [];
      existing.push(c);
      creneauxByTache.set(c.id_tache, existing);
    });

    const tachesByFormulaire = new Map<number, ExtendedTache[]>();
    this.taches.forEach(t => {
      const extTache: ExtendedTache = {
        ...t,
        extendedCreneaux: creneauxByTache.get(t.id_tache) || []
      };

      const formId = t.id_formulaire;
      const existing = tachesByFormulaire.get(formId) || [];
      existing.push(extTache);
      tachesByFormulaire.set(formId, existing);
    });

    this.processedEvents = this.events.map(e => {
      const taches = e.id_formulaire ? (tachesByFormulaire.get(e.id_formulaire) || []) : [];

      let total = 0;
      taches.forEach(t => {
        t.extendedCreneaux?.forEach(c => {
          total += c.filledInscriptions?.length || 0;
        });
      });

      return {
        ...e,
        extendedTaches: taches,
        totalInscrits: total
      };
    });
  }

  get filteredEvents(): ExtendedEvenement[] {
    if (!this.searchText) return this.processedEvents;

    const lowerSearch = this.searchText.toLowerCase();

    return this.processedEvents.filter(e => {
      if (e.titre.toLowerCase().includes(lowerSearch)) return true;

      let hasUserMatch = false;
      e.extendedTaches?.forEach(t => {
        t.extendedCreneaux?.forEach(c => {
          c.filledInscriptions?.forEach(i => {
            if (i.userNomComplet?.toLowerCase().includes(lowerSearch) || i.userEmail?.toLowerCase().includes(lowerSearch)) {
              hasUserMatch = true;
            }
          });
        });
      });
      return hasUserMatch;
    });
  }

  desinscrire(inscription: ExtendedInscription): void {
    if (!confirm(`Voulez-vous vraiment désinscrire ${inscription.userNomComplet} ?`)) return;

    if (!inscription.id_inscription) {
      this.toastService.show('Erreur: ID inscription manquant', TypeErreurToast.ERROR);
      return;
    }

    this.inscriptionService.deleteInscription(inscription.id_inscription).subscribe({
      next: () => {
        this.toastService.show('Désinscription réussie', TypeErreurToast.SUCCESS);
        // Refresh data
        this.loadAllData();
      },
      error: () => {
        this.toastService.show('Erreur lors de la désinscription', TypeErreurToast.ERROR);
      }
    });
  }
}
