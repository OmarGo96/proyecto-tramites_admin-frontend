import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InspectionRequestsComponent } from './inspection-requests.component';

describe('InspectionRequestsComponent', () => {
  let component: InspectionRequestsComponent;
  let fixture: ComponentFixture<InspectionRequestsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InspectionRequestsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InspectionRequestsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
