import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DigitizationRequestsComponent } from './digitization-requests.component';

describe('DigitizationRequestsComponent', () => {
  let component: DigitizationRequestsComponent;
  let fixture: ComponentFixture<DigitizationRequestsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DigitizationRequestsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DigitizationRequestsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
