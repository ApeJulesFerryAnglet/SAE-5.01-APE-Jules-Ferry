import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormulaireEditComponent } from './formulaire-edit.component';

describe('FormulaireEditComponent', () => {
  let component: FormulaireEditComponent;
  let fixture: ComponentFixture<FormulaireEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormulaireEditComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormulaireEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
