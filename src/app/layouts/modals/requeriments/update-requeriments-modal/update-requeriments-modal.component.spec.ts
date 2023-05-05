import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateRequerimentsModalComponent } from './update-requeriments-modal.component';

describe('UpdateRequerimentsModalComponent', () => {
  let component: UpdateRequerimentsModalComponent;
  let fixture: ComponentFixture<UpdateRequerimentsModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdateRequerimentsModalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpdateRequerimentsModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
