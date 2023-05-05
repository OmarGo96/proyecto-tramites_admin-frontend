import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateRequerimentsModalComponent } from './create-requeriments-modal.component';

describe('CreateRequerimentsModalComponent', () => {
  let component: CreateRequerimentsModalComponent;
  let fixture: ComponentFixture<CreateRequerimentsModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateRequerimentsModalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateRequerimentsModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
