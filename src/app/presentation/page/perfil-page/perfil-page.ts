import { Component, OnInit } from '@angular/core';
import { PrimeNgModule } from '../../../prime-ng-module/prime-ng-module';
import { IconModule } from '../../../icons-module/icon-module';
import { Router, RouterLink } from "@angular/router";
import { BtnTerminarSeccaoDirective, HasPermissionDirective } from "../../../utils/directive";
import { MessageService } from 'primeng/api';
import { UsuarioStateProvider } from '../../../providers/usuario.state.provider';
import { UsuarioService } from '../../../services/usuario.service';
import { CategoriaModel, OcorrenciaModel, UsuarioModel } from '../../../data/models';
import { CapitalizarPalavraPipe } from '../../../utils/pipes';
import { LowerCasePipe, UpperCasePipe } from '@angular/common';
import { PaginacaoDTO } from '../../../data/dto';
import { OcorrenciaProvider } from '../../../providers/ocorrencia.provider';
import { FormControl, FormGroup, ɵInternalFormsSharedModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { getAlertError, getAlertSuccess, validarTelefone, ValidatorsTelefone } from '../../../utils/utils';
import { PaginatorState } from 'primeng/paginator';
import { CategoriaProdutoProvider } from '../../../providers/categoria-produto.provider';
import { ConfirmarEntregaComponent } from "../../components/confirmar-entrega-component/confirmar-entrega-component";
import { ListaOcorrenciasComponent } from "../../components/lista-ocorrencias-component/lista-ocorrencias-component";
import { CadastroUsuarioFormComponent } from "../../components/forms/cadastro-usuario-form-component/cadastro-usuario-form-component";

@Component({
  selector: 'app-perfil-page',
  imports: [PrimeNgModule, IconModule, BtnTerminarSeccaoDirective, CapitalizarPalavraPipe,
    LowerCasePipe, UpperCasePipe, HasPermissionDirective, ɵInternalFormsSharedModule, ReactiveFormsModule, ListaOcorrenciasComponent, CadastroUsuarioFormComponent],
  templateUrl: './perfil-page.html',
  styleUrl: './perfil-page.scss',
})
export class PerfilPage implements OnInit {
  public usuarioLogado!: UsuarioModel;
  public isLoadAlterarImagem = false;
  public isLoadEditarPerfil = false;

  public visibleModalEditarPerfil = false;

  constructor(
    private router: Router,
    private usuarioService: UsuarioService,
    private ocorrenciaProvider: OcorrenciaProvider,
    private usuarioStateProvider: UsuarioStateProvider,
    private categoriaProdutoProvider: CategoriaProdutoProvider,
    private messageService: MessageService
  ) { }

  ngOnInit(): void {
    this.usuarioLogado = this.usuarioStateProvider.state!;
  }

  onImagemSelected(event: any) {
    if (this.isLoadAlterarImagem) return;
    const file: File = event.target.files[0];
    const maxSize = 3 * 1024 * 1024; // 3MB em bytes

    if (file.size > maxSize) {
      event.target.value = ''; // Limpa o input
      this.messageService.add(getAlertError({
        subTitulo: 'A imagem é demasiado grande! O limite é de 3MB.'
      }))
      return;
    }

    this.usuarioService.updateCidadao({
      idUsuario: this.usuarioLogado.idUsuario,
      foto: file
    }, {
      onSuccess: (data) => {
        this.usuarioLogado.fotoUrl = data.body.fotoUrl
        this.usuarioStateProvider.setState = this.usuarioLogado
        this.messageService.add(getAlertSuccess({
          subTitulo: data.message
        }))
      },
      onError: ({ error }) => {
        this.messageService.add(getAlertError({
          subTitulo: error.message
        }))
      },
      onLoad: () => this.isLoadAlterarImagem = true,
      onFinally: () => this.isLoadAlterarImagem = false,
    });
  }
}
