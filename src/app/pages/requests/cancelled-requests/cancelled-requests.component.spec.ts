import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CancelledRequestsComponent } from './cancelled-requests.component';

describe('CancelledRequestsComponent', () => {
  let component: CancelledRequestsComponent;
  let fixture: ComponentFixture<CancelledRequestsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CancelledRequestsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CancelledRequestsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
