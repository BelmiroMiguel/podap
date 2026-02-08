import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetalheItemPage } from './detalhe-item-page';

describe('DetalheItemPage', () => {
  let component: DetalheItemPage;
  let fixture: ComponentFixture<DetalheItemPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DetalheItemPage]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DetalheItemPage);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
