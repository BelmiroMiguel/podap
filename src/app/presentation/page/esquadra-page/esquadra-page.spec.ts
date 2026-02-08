import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EsquadraPage } from './esquadra-page';

describe('EsquadraPage', () => {
  let component: EsquadraPage;
  let fixture: ComponentFixture<EsquadraPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EsquadraPage]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EsquadraPage);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
