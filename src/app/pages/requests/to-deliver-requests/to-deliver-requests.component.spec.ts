import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ToDeliverRequestsComponent } from './to-deliver-requests.component';

describe('ToDeliverRequestsComponent', () => {
  let component: ToDeliverRequestsComponent;
  let fixture: ComponentFixture<ToDeliverRequestsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ToDeliverRequestsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ToDeliverRequestsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
