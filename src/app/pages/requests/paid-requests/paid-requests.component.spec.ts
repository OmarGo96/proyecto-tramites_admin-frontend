import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaidRequestsComponent } from './paid-requests.component';

describe('PaidRequestsComponent', () => {
  let component: PaidRequestsComponent;
  let fixture: ComponentFixture<PaidRequestsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PaidRequestsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PaidRequestsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
