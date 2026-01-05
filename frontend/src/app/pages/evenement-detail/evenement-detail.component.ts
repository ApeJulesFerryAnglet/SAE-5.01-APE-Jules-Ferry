import { Component, inject, OnInit } from '@angular/core';
import { Evenement } from '../../models/Evenement/evenement';
import { EvenementService } from '../../services/Evenement/evenement.service';
import { ActivatedRoute } from '@angular/router';
import { SpinnerComponent } from '../../components/spinner/spinner.component';
import { ErreurModaleComponent } from '../../components/erreur-modale/erreur-modale.component';
import { DatePipe, Location } from '@angular/common';
import { Utilisateur } from '../../models/Utilisateur/utilisateur';
import { UtilisateurService } from '../../services/Utilisateur/utilisateur.service';

@Component({
  selector: 'app-evenement-detail',
  standalone: true,
  imports: [SpinnerComponent, ErreurModaleComponent, DatePipe],
  templateUrl: './evenement-detail.component.html',
  styleUrl: './evenement-detail.component.css'
})
export class EvenementDetailComponent implements OnInit {
  Date: Date = new Date();
  evenement !: Evenement;
  auteur !: Utilisateur;
  loadingEvenement: boolean = true;
  errorEvenement: boolean = false;
  errorAuteur: boolean = false;
  private readonly utilisateurService: UtilisateurService = inject(UtilisateurService);
  private readonly evenementService: EvenementService = inject(EvenementService);
  private readonly route: ActivatedRoute = inject(ActivatedRoute);
  private location: Location = inject(Location);
  ngOnInit() {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.evenementService.getEvenementById(id).subscribe({
      next: (data) => {
        this.evenement = data;
        this.loadingEvenement = false;
        this.utilisateurService.getUtilisateurById(this.evenement.id_auteur).subscribe({
          next : (data) =>{
            this.auteur = data;
          },
          error: (err) => {
            console.error(err);
            this.errorAuteur = true;
          }
        });
      },
      error: (err) => {
        console.error(err);
        this.loadingEvenement = false;
        this.errorEvenement = true;
      }
    });
    
  }
  public convertDateToString(date: Date | string): string {
    return new Date(date).toLocaleDateString('fr-FR');
  }
  goBack(): void {
    this.location.back();
  }
}
