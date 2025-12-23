import { Component, inject, Input, OnInit } from '@angular/core';
import { Actualite } from '../../models/Actualite/actualite';
import { ActualiteService } from '../../services/Actualite/actualite.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-actualite-detail',
  standalone: true,
  imports: [],
  templateUrl: './actualite-detail.component.html',
  styleUrl: './actualite-detail.component.css'
})
export class ActualiteDetailComponent implements OnInit {
  actualite !: Actualite;
  private readonly actualiteService : ActualiteService = inject(ActualiteService);
  private readonly route: ActivatedRoute = inject(ActivatedRoute);
  ngOnInit() : void{
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.actualiteService.getActualiteById(id).subscribe({
      next: (data) => {
        this.actualite = data;
      },
      error: (err) => {
        console.error(err);
      }
    });
  }
}