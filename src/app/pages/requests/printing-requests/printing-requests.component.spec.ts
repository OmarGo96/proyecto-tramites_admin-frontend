import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrintingRequestsComponent } from './printing-requests.component';

describe('PrintingRequestsComponent', () => {
  let component: PrintingRequestsComponent;
  let fixture: ComponentFixture<PrintingRequestsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PrintingRequestsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PrintingRequestsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
