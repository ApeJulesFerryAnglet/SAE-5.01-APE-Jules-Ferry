import { Component, Input } from '@angular/core';
import { StatutEvennement } from '../../../enums/StatutEvennement/statut-evennement';
import { RouterLink } from '@angular/router';
@Component({
  selector: 'app-evennement-card',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './evennement-card.component.html',
  styleUrl: './evennement-card.component.css'
})
export class EvennementCardComponent {
  @Input() id_evenement!: number;
  @Input() titre!: string;
  @Input() description!: string;
  @Input() date_evenement!: Date;
  @Input() heure_debut!: string;
  @Input() heure_fin!: string;
  @Input() lieu!: string;
  @Input() image_url!: string;
  @Input() statut!: StatutEvennement;
  public convertDateToString(date: Date| string): string {
    return new Date(date).toLocaleDateString('fr-FR');
  }
}
