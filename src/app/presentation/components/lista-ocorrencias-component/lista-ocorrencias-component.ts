import { LowerCasePipe, UpperCasePipe } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { ɵInternalFormsSharedModule, ReactiveFormsModule, FormGroup, FormControl } from '@angular/forms';
import { RouterLink, Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { PaginatorState } from 'primeng/paginator';
import { PaginacaoDTO } from '../../../data/dto';
import { UsuarioModel, OcorrenciaModel, CategoriaModel } from '../../../data/models';
import { IconModule } from '../../../icons-module/icon-module';
import { PrimeNgModule } from '../../../prime-ng-module/prime-ng-module';
import { CategoriaProdutoProvider } from '../../../providers/categoria-produto.provider';
import { OcorrenciaProvider } from '../../../providers/ocorrencia.provider';
import { UsuarioStateProvider } from '../../../providers/usuario.state.provider';
import { UsuarioService } from '../../../services/usuario.service';
import { BtnTerminarSeccaoDirective, HasPermissionDirective } from '../../../utils/directive';
import { CapitalizarPalavraPipe } from '../../../utils/pipes';
import { getAlertError, getAlertSuccess } from '../../../utils/utils';
import { ConfirmarEntregaComponent } from '../confirmar-entrega-component/confirmar-entrega-component';

@Component({
  selector: 'app-lista-ocorrencias-component',
  imports: [PrimeNgModule, IconModule, RouterLink, CapitalizarPalavraPipe,
    ReactiveFormsModule, ConfirmarEntregaComponent],
  templateUrl: './lista-ocorrencias-component.html',
  styleUrl: './lista-ocorrencias-component.scss',
})
export class ListaOcorrenciasComponent implements OnInit {
  @Input({ required: true }) public titulo!: string;
  @Input() public isPolicial = false;
  public usuarioLogado!: UsuarioModel;
  public apenasEsquadra = 0;

  public ocorrenciaSelecionada?: OcorrenciaModel;
  public ocorrenciasCarregadas: Array<OcorrenciaModel> = [];
  public categoriasCarregadas: Array<CategoriaModel> = [];

  public visibleModalEntregarItemLegitmoDono = false;

  public isLoadOcorrencia: boolean = false;
  public isLoadCategorias: boolean = false;
  public isLoadMarcarItemRecuperado: boolean = false;
  public isLoadSupenderOcorrencia: boolean = false;
  public paginacao: PaginacaoDTO = { limit: 24, page: 1, totalItems: 0, totalPages: 0 };

  public totalOcorrenciaCard: number = 0;
  public totalOcorrenciaPerdidoCard: number = 0;
  public totalOcorrenciaAchadoCard: number = 0;
  public totalOcorrenciaDevolvidoLegitmoCard: number = 0;


  public formFiltro = new FormGroup({
    filtroTexto: new FormControl<string>(''),
    ordem: new FormControl<string>('recente'),
    'tipoOcorrenciaIncluds[]': new FormControl<number[]>([]),
    'idCategoriaIncluds[]': new FormControl<number[]>([]),
  })


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
    this.carregarOcorrencias();
    this.carregarCategorias();
    //this.isPolicial = !!this.usuarioLogado.policial;
  }

  public carregarValoresCards() {
    this.ocorrenciaProvider.countAll({ ...(this.isPolicial ? { apenasEsquadra: this.apenasEsquadra } : { idUsuarioCadastro: this.usuarioLogado.idUsuario }) }, {
      onSuccess: (data) => this.totalOcorrenciaCard = data.body,
    })
    this.ocorrenciaProvider.countAll({ ...(this.isPolicial ? { apenasEsquadra: this.apenasEsquadra } : { idUsuarioCadastro: this.usuarioLogado.idUsuario }), tipoOcorrencia: 'PERDIDO', jaDevolvidos: 0 }, {
      onSuccess: (data) => this.totalOcorrenciaPerdidoCard = data.body,
    })
    this.ocorrenciaProvider.countAll({ ...(this.isPolicial ? { apenasEsquadra: this.apenasEsquadra } : { idUsuarioCadastro: this.usuarioLogado.idUsuario }), tipoOcorrencia: 'ACHADO', jaDevolvidos: 0 }, {
      onSuccess: (data) => this.totalOcorrenciaAchadoCard = data.body,
    })
    this.ocorrenciaProvider.countAll({ ...(this.isPolicial ? { apenasEsquadra: this.apenasEsquadra } : { idUsuarioCadastro: this.usuarioLogado.idUsuario }), jaDevolvidos: 1 }, {
      onSuccess: (data) => this.totalOcorrenciaDevolvidoLegitmoCard = data.body,
    })
  }

  public carregarOcorrencias() {
    if (this.isLoadOcorrencia) return;
    this.carregarValoresCards();

    this.ocorrenciaProvider.findAll({
      ...(this.formFiltro.value as any),
      //idCategoriaIncluds: this.formFiltro.value.idCategoriaIncluds,
      ...(this.isPolicial ? { apenasEsquadra: this.apenasEsquadra } : { idUsuarioCadastro: this.usuarioLogado.idUsuario }),
      limit: 10,
      page: this.paginacao.page,
    }, {
      onSuccess: (data) => {
        this.paginacao = data.paginacao!;
        this.ocorrenciasCarregadas = data.body;
      },
      onError: ({ error }) => {
        this.messageService.add(getAlertError({
          subTitulo: error.message
        }))
      },
      onLoad: () => this.isLoadOcorrencia = true,
      onFinally: () => this.isLoadOcorrencia = false,
    })
  }

  public suspenderOcorrencia() {
    if (this.isLoadSupenderOcorrencia) return;

    this.ocorrenciaProvider.delete(this.ocorrenciaSelecionada?.idOcorrencia ?? 0, {
      onSuccess: (data) => {
        this.carregarOcorrencias()
        this.messageService.add(getAlertSuccess({
          subTitulo: data.message
        }))
      },
      onError: ({ error }) => {
        this.messageService.add(getAlertError({
          subTitulo: error.message
        }))
      },
      onLoad: () => this.isLoadSupenderOcorrencia = true,
      onFinally: () => this.isLoadSupenderOcorrencia = false,
    })
  }

  public marcarItemRecuperado() {
    if (this.isLoadMarcarItemRecuperado) return;

    this.ocorrenciaProvider.recuperado(this.ocorrenciaSelecionada?.idOcorrencia ?? 0, {
      onSuccess: (data) => {
        this.carregarOcorrencias()
        this.messageService.add(getAlertSuccess({
          subTitulo: data.message
        }))
      },
      onError: ({ error }) => {
        this.messageService.add(getAlertError({
          subTitulo: error.message
        }))
      },
      onLoad: () => this.isLoadMarcarItemRecuperado = true,
      onFinally: () => this.isLoadMarcarItemRecuperado = false,
    })
  }

  public carregarCategorias() {
    if (this.isLoadCategorias) return;

    this.categoriaProdutoProvider.findAll({
      limit: 100,
    }, {
      onSuccess: (data) => {
        this.categoriasCarregadas = data.body;
      },
      onError: ({ error }) => {
        this.messageService.add(getAlertError({
          subTitulo: error.message
        }))
      },
      onLoad: () => this.isLoadCategorias = true,
      onFinally: () => this.isLoadCategorias = false,
    })
  }

  onPageChange(event: PaginatorState) {
    this.paginacao.page = event.page! + 1;
    this.carregarOcorrencias();
  }
}
