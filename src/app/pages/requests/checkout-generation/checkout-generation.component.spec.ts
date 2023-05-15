import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CheckoutGenerationComponent } from './checkout-generation.component';

describe('CheckoutGenerationComponent', () => {
  let component: CheckoutGenerationComponent;
  let fixture: ComponentFixture<CheckoutGenerationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CheckoutGenerationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CheckoutGenerationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
