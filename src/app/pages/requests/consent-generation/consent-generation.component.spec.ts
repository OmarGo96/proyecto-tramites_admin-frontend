import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsentGenerationComponent } from './consent-generation.component';

describe('ConsentGenerationComponent', () => {
  let component: ConsentGenerationComponent;
  let fixture: ComponentFixture<ConsentGenerationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConsentGenerationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConsentGenerationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
