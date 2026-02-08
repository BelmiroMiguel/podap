import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GestaoAnuncioPage } from './gestao-anuncio-page';

describe('GestaoAnuncioPage', () => {
  let component: GestaoAnuncioPage;
  let fixture: ComponentFixture<GestaoAnuncioPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GestaoAnuncioPage]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GestaoAnuncioPage);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
