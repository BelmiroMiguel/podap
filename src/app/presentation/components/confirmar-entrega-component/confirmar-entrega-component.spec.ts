import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmarEntregaComponent } from './confirmar-entrega-component';

describe('ConfirmarEntregaComponent', () => {
  let component: ConfirmarEntregaComponent;
  let fixture: ComponentFixture<ConfirmarEntregaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ConfirmarEntregaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConfirmarEntregaComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
