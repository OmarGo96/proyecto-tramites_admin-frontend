import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContribuyentesComponent } from './contribuyentes.component';

describe('ContribuyentesComponent', () => {
  let component: ContribuyentesComponent;
  let fixture: ComponentFixture<ContribuyentesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ContribuyentesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ContribuyentesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
