import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminEvenementsComponent } from './admin-evenements.component';

describe('AdminEvenementsComponent', () => {
  let component: AdminEvenementsComponent;
  let fixture: ComponentFixture<AdminEvenementsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminEvenementsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminEvenementsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
