import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReviewOrdersComponent } from './review-orders.component';

describe('ReviewOrdersComponent', () => {
  let component: ReviewOrdersComponent;
  let fixture: ComponentFixture<ReviewOrdersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReviewOrdersComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReviewOrdersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
