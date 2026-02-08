import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CadastroUsuarioFormComponent } from './cadastro-usuario-form-component';

describe('CadastroUsuarioFormComponent', () => {
  let component: CadastroUsuarioFormComponent;
  let fixture: ComponentFixture<CadastroUsuarioFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CadastroUsuarioFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CadastroUsuarioFormComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
