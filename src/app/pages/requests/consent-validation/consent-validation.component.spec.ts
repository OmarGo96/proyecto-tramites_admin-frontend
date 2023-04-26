import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsentValidationComponent } from './consent-validation.component';

describe('ConsentValidationComponent', () => {
  let component: ConsentValidationComponent;
  let fixture: ComponentFixture<ConsentValidationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConsentValidationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConsentValidationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
