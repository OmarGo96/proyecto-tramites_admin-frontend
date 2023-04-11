import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PendingPaymentDocRequestsComponent } from './pending-payment-doc-requests.component';

describe('PendingPaymentDocRequestsComponent', () => {
  let component: PendingPaymentDocRequestsComponent;
  let fixture: ComponentFixture<PendingPaymentDocRequestsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PendingPaymentDocRequestsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PendingPaymentDocRequestsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
