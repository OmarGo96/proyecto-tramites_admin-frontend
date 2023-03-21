import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RequestsValidationComponent } from './requests-validation.component';

describe('RequestsValidationComponent', () => {
  let component: RequestsValidationComponent;
  let fixture: ComponentFixture<RequestsValidationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RequestsValidationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RequestsValidationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
