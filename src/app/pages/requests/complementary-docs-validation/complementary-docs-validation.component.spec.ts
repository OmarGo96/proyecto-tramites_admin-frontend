import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ComplementaryDocsValidationComponent } from './complementary-docs-validation.component';

describe('ComplementaryDocsValidationComponent', () => {
  let component: ComplementaryDocsValidationComponent;
  let fixture: ComponentFixture<ComplementaryDocsValidationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ComplementaryDocsValidationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ComplementaryDocsValidationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
