import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DependenciesModalComponent } from './dependencies-modal.component';

describe('DependenciesModalComponent', () => {
  let component: DependenciesModalComponent;
  let fixture: ComponentFixture<DependenciesModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DependenciesModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DependenciesModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
