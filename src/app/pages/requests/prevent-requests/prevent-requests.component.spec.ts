import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PreventRequestsComponent } from './prevent-requests.component';

describe('PreventRequestsComponent', () => {
  let component: PreventRequestsComponent;
  let fixture: ComponentFixture<PreventRequestsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PreventRequestsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PreventRequestsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
