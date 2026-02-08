import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnunciarItemPage } from './anunciar-item-page';

describe('AnunciarItemPage', () => {
  let component: AnunciarItemPage;
  let fixture: ComponentFixture<AnunciarItemPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AnunciarItemPage]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AnunciarItemPage);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
