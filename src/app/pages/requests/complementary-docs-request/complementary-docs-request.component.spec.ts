import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ComplementaryDocsRequestComponent } from './complementary-docs-request.component';

describe('ComplementaryDocsRequestComponent', () => {
  let component: ComplementaryDocsRequestComponent;
  let fixture: ComponentFixture<ComplementaryDocsRequestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ComplementaryDocsRequestComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ComplementaryDocsRequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
