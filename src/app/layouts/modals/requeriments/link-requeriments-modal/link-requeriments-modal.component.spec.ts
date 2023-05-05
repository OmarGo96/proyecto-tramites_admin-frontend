import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LinkRequerimentsModalComponent } from './link-requeriments-modal.component';

describe('LinkRequerimentsModalComponent', () => {
  let component: LinkRequerimentsModalComponent;
  let fixture: ComponentFixture<LinkRequerimentsModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LinkRequerimentsModalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LinkRequerimentsModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
