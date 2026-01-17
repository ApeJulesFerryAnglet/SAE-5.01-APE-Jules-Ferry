import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { EvenementService } from '../../services/Evenement/evenement.service';
import { SpinnerComponent } from '../../components/spinner/spinner.component';
// AJOUTS
import { FormulaireService } from '../../services/Formulaire/formulaire.service';
import { Formulaire } from '../../models/Formulaire/formulaire';

@Component({
  selector: 'app-evenement-edit',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, SpinnerComponent, RouterLink],
  templateUrl: './evenement-edit.component.html',
})
export class EvenementEditComponent implements OnInit {
  imageError: string | null = null;
  selectedImageFile: File | null = null;
  formulaires: Formulaire[] = [];
  selectedFormulaire: Formulaire | null = null;

  private readonly fb = inject(FormBuilder);
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly evenementService = inject(EvenementService);
  private readonly formulaireService = inject(FormulaireService);

  evenementForm!: FormGroup;
  loading = true;
  saving = false;
  idEvenement?: number;
  isEditMode = false;

  ngOnInit(): void {
    this.evenementForm = this.fb.group({
      titre: ['', [Validators.required, Validators.maxLength(255)]],
      description: ['', [Validators.required]],
      date_evenement: ['', [Validators.required]],
      heure_debut: ['', [Validators.required]],
      heure_fin: ['', [Validators.required]],
      lieu: ['', [Validators.required, Validators.maxLength(255)]],
      image_url: [''],
      id_formulaire: [null] 
    });

    this.evenementForm.get('id_formulaire')?.valueChanges.subscribe(() => {
        this.onFormulaireChange();
    });

    this.loadData();
  }

  loadData() {
    this.formulaireService.getAllFormulaires().subscribe({
        next: (forms) => {
            this.formulaires = forms;
            
            const id = this.route.snapshot.paramMap.get('id');
            if (id && id !== 'new') {
                this.idEvenement = Number(id);
                this.isEditMode = true;
                this.loadEvenement(this.idEvenement);
            } else {
                this.loading = false;
            }
        },
        error: () => {
            console.error('Erreur chargement formulaires');
            this.loading = false;
        }
    });
  }

  loadEvenement(id: number): void {
    this.evenementService.getEvenementById(id).subscribe({
      next: (evenement) => {
        this.evenementForm.patchValue({
          titre: evenement.titre,
          description: evenement.description,
          date_evenement: evenement.date_evenement,
          heure_debut: evenement.heure_debut,
          heure_fin: evenement.heure_fin,
          lieu: evenement.lieu,
          image_url: evenement.image_url,
          id_formulaire: evenement.id_formulaire || null 
        });
        this.onFormulaireChange();
        this.loading = false;
      },
      error: () => {
        alert('Erreur lors du chargement de l\'événement');
        this.router.navigate(['/evenements']);
      }
    });
  }

  onFormulaireChange(): void {
    const formId = this.evenementForm.get('id_formulaire')?.value;
    if (formId) {
      this.selectedFormulaire = this.formulaires.find(f => f.id_formulaire == formId) || null;
    } else {
      this.selectedFormulaire = null;
    }
  }

  onImageFileChange(event: Event): void {
    this.imageError = null;
    const input = event.target as HTMLInputElement;
    if (!input.files || input.files.length === 0) {
      this.selectedImageFile = null;
      return;
    }
    const file = input.files[0];
    if (!file.type.startsWith('image/')) {
      this.imageError = 'Seuls les fichiers images sont autorisés.';
      this.selectedImageFile = null;
      return;
    }
    this.selectedImageFile = file;
  }

  onSubmit(): void {
    if (this.evenementForm.invalid) return;
    this.saving = true;
    const formData = new FormData();
    
    Object.entries(this.evenementForm.value).forEach(([key, value]) => {
      if (key === 'id_formulaire') {
        return; 
      }
      formData.append(key, value as string);
    });

    if (this.selectedImageFile) {
      formData.append('image', this.selectedImageFile);
    }

    const formId = this.evenementForm.get('id_formulaire')?.value;
    if(formId && formId !== 'null') {
        formData.append('id_formulaire', formId);
    } else {
        formData.append('id_formulaire', '');
    }

    const request$ = (this.isEditMode && this.idEvenement)
      ? this.evenementService.updateEvenement(formData, this.idEvenement)
      : this.evenementService.createEvenement(formData);

    request$.subscribe({
      next: () => {
        this.saving = false;
        this.goBack();
      },
      error: () => {
        this.saving = false;
        alert('Erreur lors de l\'enregistrement');
      }
    });
  }

  goBack(): void {
    this.router.navigate(['/evenements']);
  }
}