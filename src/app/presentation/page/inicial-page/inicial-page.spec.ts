import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InicialPage } from './inicial-page';

describe('InicialPage', () => {
  let component: InicialPage;
  let fixture: ComponentFixture<InicialPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InicialPage]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InicialPage);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
