import { TipoUsuario } from './../../../../data/enums';
import { Component, EventEmitter, Input, input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { IconModule } from '../../../../icons-module/icon-module';
import { PrimeNgModule } from '../../../../prime-ng-module/prime-ng-module';
import { getAlertError, getAlertSuccess, SenhasIguaisValidator, validarIdentificacaoPorTipo, ValidatorsPolicial, ValidatorsTelefone } from '../../../../utils/utils';
import { TextErrorInputForm } from "../../text-error-input-form/text-error-input-form";
import { UsuarioModel } from '../../../../data/models';
import { MessageService } from 'primeng/api';
import { CategoriaProdutoProvider } from '../../../../providers/categoria-produto.provider';
import { OcorrenciaProvider } from '../../../../providers/ocorrencia.provider';
import { UsuarioStateProvider } from '../../../../providers/usuario.state.provider';
import { UsuarioService } from '../../../../services/usuario.service';

@Component({
  selector: 'app-cadastro-usuario-form-component',
  imports: [PrimeNgModule, IconModule, ReactiveFormsModule, TextErrorInputForm],
  templateUrl: './cadastro-usuario-form-component.html',
  styleUrl: './cadastro-usuario-form-component.scss',
})
export class CadastroUsuarioFormComponent implements OnInit {
  @Input() public tipoUsuario: 'CIDADAO' | 'POLICIAL' = 'CIDADAO';
  @Input() public edicao: boolean = false;
  @Input() public updateState: boolean = false;
  @Input() public mostrarBtnCancelar: boolean = false;
  @Input() public usuario?: UsuarioModel;

  @Output() public onCancel = new EventEmitter<void>();
  @Output() public onCadastro = new EventEmitter<UsuarioModel>();

  public usuarioLogado?: UsuarioModel;

  public maskIdentificacao = '999999999aa999'; // BI (default)
  public placeholderIdentificacao = '_________AA___';

  public isLoadCadastroUsuario = false;

  public formUsuario = new FormGroup({
    nome: new FormControl<string>('', { validators: [Validators.required, Validators.minLength(5), Validators.maxLength(90)] }),
    nip: new FormControl<string>('', { validators: [Validators.required, ValidatorsPolicial.nipPolicial] }),
    identificacao: new FormControl<string>('', { validators: [Validators.required] }),
    tipoIdentificacao: new FormControl<'BI' | 'PASSAPORTE'>('BI', { validators: [Validators.required] }),
    telefone: new FormControl<string>('', { validators: [Validators.required, ValidatorsTelefone.angola] }),
    email: new FormControl<string>('', { validators: [Validators.required, Validators.email,] }),
    senha: new FormControl<string>('', {
      validators: [Validators.required, Validators.minLength(8), Validators.maxLength(18)]
    }),
    senha_confirmation: new FormControl<string>('', {
      validators: [Validators.required]
    }),
  }, { validators: [SenhasIguaisValidator, validarIdentificacaoPorTipo] })


  constructor(
    private router: Router,
    private usuarioService: UsuarioService,
    private ocorrenciaProvider: OcorrenciaProvider,
    private usuarioStateProvider: UsuarioStateProvider,
    private categoriaProdutoProvider: CategoriaProdutoProvider,
    private messageService: MessageService
  ) { }

  ngOnInit(): void {
    if (this.tipoUsuario == 'CIDADAO') {
      this.formUsuario.get('nip')?.removeValidators([Validators.required]);
    }

    this.formUsuario.get('tipoIdentificacao')?.valueChanges.subscribe((tipo) => {
      if (tipo === 'BI') {
        this.maskIdentificacao = '999999999aa999';
        this.placeholderIdentificacao = '_________AA___';
      } else {
        this.maskIdentificacao = 'aa9999999';
        this.placeholderIdentificacao = 'AA_______';
      }

      this.formUsuario.get('identificacao')?.updateValueAndValidity();
    });

    if (this.edicao) {
      this.formUsuario.get('senha')?.clearValidators();
      this.formUsuario.get('senha_confirmation')?.clearValidators();

      if (!this.usuario) return;
      this.formUsuario.get('tipoIdentificacao')?.setValue(this.usuario.tipoIdentificacao)
      this.formUsuario.get('nome')?.setValue(this.usuario.nome)
      this.formUsuario.get('nip')?.setValue(this.usuario.policial?.nip ?? '')
      this.formUsuario.get('identificacao')?.setValue(this.usuario.identificacao)
      this.formUsuario.get('tipoIdentificacao')?.setValue(this.usuario.tipoIdentificacao)
      this.formUsuario.get('telefone')?.setValue(this.usuario.telefone)
      this.formUsuario.get('email')?.setValue(this.usuario.email)
      this.formUsuario.markAllAsTouched();
    }
  }


  public cadastrarUsuario() {
    if (this.isLoadCadastroUsuario) return;

    if (this.formUsuario.invalid) {
      this.formUsuario.markAllAsTouched();
      return;
    }

    if (this.edicao) {
      this.atualizarUsuario();
      return;
    }

    const telefoneCtrl = this.formUsuario.get('telefone')?.value || '';
    const telefoneFormatado = telefoneCtrl.replaceAll(/\D/g, '').replace('244', ''); // remove tudo que não é número

    if (this.tipoUsuario == 'CIDADAO') {
      this.usuarioService.createCidadao({
        ...this.formUsuario.value as any,
        telefone: telefoneFormatado,
      }, {
        onSuccess: (data) => {
          this.messageService.add(getAlertSuccess({
            subTitulo: data.message
          }))

          setTimeout(() => {
            this.usuarioStateProvider.setState = data.body;
            this.usuarioStateProvider.setToken(data.token!);
            this.router.navigate(['/']);
          }, 500);
        },
        onError: ({ error }) => {
          this.messageService.add(getAlertError({
            subTitulo: error.message
          }))
        },
        onLoad: () => this.isLoadCadastroUsuario = true,
        onFinally: () => this.isLoadCadastroUsuario = false,
      })
    } else {
      this.usuarioService.createPolicial({
        ...this.formUsuario.value as any,
        telefone: telefoneFormatado,
      }, {
        onSuccess: (data) => {
          this.messageService.add(getAlertSuccess({
            subTitulo: data.message
          }))

          this.onCadastro.emit(data.body)
          this.onCancel.emit()
        },
        onError: ({ error }) => {
          this.messageService.add(getAlertError({
            subTitulo: error.message
          }))
        },
        onLoad: () => this.isLoadCadastroUsuario = true,
        onFinally: () => this.isLoadCadastroUsuario = false,
      })
    }
  }


  atualizarUsuario() {
    const telefoneCtrl = this.formUsuario.get('telefone')?.value || '';
    const telefoneFormatado = telefoneCtrl.replaceAll(/\D/g, '').replace('244', ''); // remove tudo que não é número

    if (this.usuario?.tipoUsuario == 'CIDADAO') {
      this.usuarioService.updateCidadao({
        ...this.formUsuario.value as any,
        telefone: telefoneFormatado,
      }, {
        onSuccess: (data) => {
          this.messageService.add(getAlertSuccess({
            subTitulo: data.message
          }))
          if (this.updateState) this.usuarioStateProvider.setState = data.body;
          this.onCadastro.emit(data.body)
          this.onCancel.emit()
        },
        onError: ({ error }) => {
          this.messageService.add(getAlertError({
            subTitulo: error.message
          }))
        },
        onLoad: () => this.isLoadCadastroUsuario = true,
        onFinally: () => this.isLoadCadastroUsuario = false,
      })
    } else {
      this.usuarioService.updatePolicial({
        ...this.formUsuario.value as any,
        idUsuario: this.usuario?.idUsuario ?? 0,
        telefone: telefoneFormatado,
      }, {
        onSuccess: (data) => {
          this.messageService.add(getAlertSuccess({
            subTitulo: data.message
          }))
          if (this.updateState) this.usuarioStateProvider.setState = data.body;
          this.onCadastro.emit(data.body)
          this.onCancel.emit()
        },
        onError: ({ error }) => {
          this.messageService.add(getAlertError({
            subTitulo: error.message
          }))
        },
        onLoad: () => this.isLoadCadastroUsuario = true,
        onFinally: () => this.isLoadCadastroUsuario = false,
      })
    }
  }
}
