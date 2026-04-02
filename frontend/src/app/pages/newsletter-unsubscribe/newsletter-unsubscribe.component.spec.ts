import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewsletterUnsubscribeComponent } from './newsletter-unsubscribe.component';

describe('NewsletterUnsubscribeComponent', () => {
  let component: NewsletterUnsubscribeComponent;
  let fixture: ComponentFixture<NewsletterUnsubscribeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NewsletterUnsubscribeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NewsletterUnsubscribeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
