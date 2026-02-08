import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaOcorrenciasComponent } from './lista-ocorrencias-component';

describe('ListaOcorrenciasComponent', () => {
  let component: ListaOcorrenciasComponent;
  let fixture: ComponentFixture<ListaOcorrenciasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListaOcorrenciasComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListaOcorrenciasComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
