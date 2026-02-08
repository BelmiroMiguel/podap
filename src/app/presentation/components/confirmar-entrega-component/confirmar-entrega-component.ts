import { getAlertError } from './../../../utils/utils';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { PrimeNgModule } from '../../../prime-ng-module/prime-ng-module';
import { IconModule } from '../../../icons-module/icon-module';
import { EntregaFinalModel, OcorrenciaModel, UsuarioModel } from '../../../data/models';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { LowerCasePipe, UpperCasePipe } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { BtnTerminarSeccaoDirective, HasPermissionDirective } from '../../../utils/directive';
import { CapitalizarPalavraPipe } from '../../../utils/pipes';
import { getAlertSuccess, validarTelefone, ValidatorsTelefone } from '../../../utils/utils';
import { MessageService } from 'primeng/api';
import { CategoriaProdutoProvider } from '../../../providers/categoria-produto.provider';
import { OcorrenciaProvider } from '../../../providers/ocorrencia.provider';
import { UsuarioStateProvider } from '../../../providers/usuario.state.provider';
import { UsuarioService } from '../../../services/usuario.service';
import { TextErrorInputForm } from "../text-error-input-form/text-error-input-form";

@Component({
  selector: 'app-confirmar-entrega-component',
  imports: [PrimeNgModule, IconModule, ReactiveFormsModule, TextErrorInputForm, CapitalizarPalavraPipe],
  templateUrl: './confirmar-entrega-component.html',
  styleUrl: './confirmar-entrega-component.scss',
})
export class ConfirmarEntregaComponent {
  @Input({ required: true }) public ocorrencia!: OcorrenciaModel;
  @Output() public onCancel = new EventEmitter<void>();
  @Output() public onSucesso = new EventEmitter<EntregaFinalModel>();
  public usuarioLegitmoDono?: UsuarioModel;


  public isLoadConfirmarEntrega = false;
  public isLoadUsuarioLegitmo = false;
  public isLoadUsuarioLegitmoUmaVez = false;


  // Comprovante (opcional)
  comprovanteImagem: File | null = null;
  // No seu componente
  comprovantePreview: string | null = null;

  public formEntrega = new FormGroup({
    telefoneLegitmoDono: new FormControl<string>('', { validators: [Validators.required, ValidatorsTelefone.angola] })
  });


  constructor(
    private router: Router,
    private usuarioService: UsuarioService,
    private ocorrenciaProvider: OcorrenciaProvider,
    private usuarioStateProvider: UsuarioStateProvider,
    private categoriaProdutoProvider: CategoriaProdutoProvider,
    private messageService: MessageService
  ) { }


  public carregarLegitmoDono(event: Event) {
    const input = event.target as HTMLInputElement;
    const telefone = input.value;

    this.usuarioService.findByTelefone(telefone, {
      onSuccess: (data) => {
        this.usuarioLegitmoDono = data.body;
      },
      onError: ({ error }) => {
        this.usuarioLegitmoDono = undefined;
      },
      onLoad: () => this.isLoadUsuarioLegitmo = true,
      onFinally: () => {
        this.isLoadUsuarioLegitmoUmaVez = true;
        this.isLoadUsuarioLegitmo = false;
      }
    })
  }


  confirmarEntrega() {
    if (this.formEntrega.invalid) {
      this.formEntrega.markAllAsTouched();
      return;
    }

    this.ocorrenciaProvider.finalizarEntrega({
      idOcorrencia: this.ocorrencia.idOcorrencia,
      idUsuarioRecebedor: this.usuarioLegitmoDono?.idUsuario ?? 0,
      descricaoEntrega: '---'
    }, {
      onSuccess: (data) => {
        this.onSucesso.emit(data.body);
        this.onCancel.emit();
        this.messageService.add(getAlertSuccess({ subTitulo: data.message }))
      },
      onError: ({ error }) => {
        this.messageService.add(getAlertError({ subTitulo: error.message }))
      },
      onLoad: () => this.isLoadConfirmarEntrega = true,
      onFinally: () => this.isLoadConfirmarEntrega = false,
    })
  }


  onSelecionarComprovante(event: any) {
    const file = event.files[0]; // Captura o arquivo selecionado
    if (file) {
      // Cria uma URL segura para visualização
      this.comprovantePreview = URL.createObjectURL(file);
    }
  }

  removerComprovante() {
    this.comprovantePreview = null;
    // Opcional: Se precisar limpar o p-fileUpload manualmente use ViewChild
  }
}
