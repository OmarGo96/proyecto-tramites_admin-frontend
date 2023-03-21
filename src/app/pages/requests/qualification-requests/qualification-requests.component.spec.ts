import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QualificationRequestsComponent } from './qualification-requests.component';

describe('QualificationRequestsComponent', () => {
  let component: QualificationRequestsComponent;
  let fixture: ComponentFixture<QualificationRequestsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ QualificationRequestsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(QualificationRequestsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
