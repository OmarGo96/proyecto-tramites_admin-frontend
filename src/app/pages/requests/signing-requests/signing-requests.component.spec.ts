import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SigningRequestsComponent } from './signing-requests.component';

describe('SigningRequestsComponent', () => {
  let component: SigningRequestsComponent;
  let fixture: ComponentFixture<SigningRequestsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SigningRequestsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SigningRequestsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
