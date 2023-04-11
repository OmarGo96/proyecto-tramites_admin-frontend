import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ElaborationRequestsComponent } from './elaboration-requests.component';

describe('ElaborationRequestsComponent', () => {
  let component: ElaborationRequestsComponent;
  let fixture: ComponentFixture<ElaborationRequestsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ElaborationRequestsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ElaborationRequestsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
