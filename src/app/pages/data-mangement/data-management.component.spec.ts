import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DataManagementComponent } from './data-management.component';

describe('DataMangementComponent', () => {
  let component: DataManagementComponent;
  let fixture: ComponentFixture<DataManagementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DataManagementComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(DataManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
