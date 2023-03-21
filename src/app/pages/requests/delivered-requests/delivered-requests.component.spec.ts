import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeliveredRequestsComponent } from './delivered-requests.component';

describe('DeliveredRequestsComponent', () => {
  let component: DeliveredRequestsComponent;
  let fixture: ComponentFixture<DeliveredRequestsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeliveredRequestsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DeliveredRequestsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
