import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GeneralRequestsComponent } from './general-requests.component';

describe('GeneralRequestsComponent', () => {
  let component: GeneralRequestsComponent;
  let fixture: ComponentFixture<GeneralRequestsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GeneralRequestsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GeneralRequestsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
