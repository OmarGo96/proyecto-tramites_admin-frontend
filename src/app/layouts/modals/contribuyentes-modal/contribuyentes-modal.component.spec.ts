import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContribuyentesModalComponent } from './contribuyentes-modal.component';

describe('ContribuyentesModalComponent', () => {
  let component: ContribuyentesModalComponent;
  let fixture: ComponentFixture<ContribuyentesModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ContribuyentesModalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ContribuyentesModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
