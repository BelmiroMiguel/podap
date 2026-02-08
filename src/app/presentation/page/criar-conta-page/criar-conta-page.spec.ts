import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CriarContaPage } from './criar-conta-page';

describe('CriarContaPage', () => {
  let component: CriarContaPage;
  let fixture: ComponentFixture<CriarContaPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CriarContaPage]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CriarContaPage);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
