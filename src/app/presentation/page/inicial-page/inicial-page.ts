import { IconModule } from './../../../icons-module/icon-module';
import { AfterViewInit, Component, ElementRef, HostListener, OnInit, ViewChild } from '@angular/core';
import { HeaderComponent } from "../../components/header-component/header-component";
import { HeroiComponent } from "../../components/heroi-component/heroi-component";
import { FilterBarComponent } from "../../components/filter-bar-component/filter-bar-component";
import { ItemCardComponent } from "../../components/item-card-component/item-card-component";
import { SideBarComponent } from "../../components/side-bar-component/side-bar-component";
import { MatModule } from '../../../mat-module/mat-module';
import { PrimeNgModule } from '../../../prime-ng-module/prime-ng-module';
import { ItemCardSkeleton } from "../../components/item-card-skeleton/item-card-skeleton";
import { FormGroup, FormControl, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { MessageService } from 'primeng/api';
import { FiltroOcorrenciaDto, FiltroUsuarioDTO, PaginacaoDTO } from '../../../data/dto';
import { UsuarioModel, OcorrenciaModel, CategoriaModel } from '../../../data/models';
import { CategoriaProdutoProvider } from '../../../providers/categoria-produto.provider';
import { OcorrenciaProvider } from '../../../providers/ocorrencia.provider';
import { UsuarioStateProvider } from '../../../providers/usuario.state.provider';
import { UsuarioService } from '../../../services/usuario.service';
import { getAlertError } from '../../../utils/utils';
import { BuscaService } from '../../../services/BuscaService.service';
import { debounceTime, distinctUntilChanged } from 'rxjs';
import { OcorrenciaService } from '../../../services/ocorrencia.service';

@Component({
  selector: 'app-inicial-page',
  imports: [PrimeNgModule, IconModule, HeroiComponent, FilterBarComponent, ItemCardComponent,
    SideBarComponent, ItemCardSkeleton, ReactiveFormsModule, RouterLink],
  templateUrl: './inicial-page.html',
  styleUrl: './inicial-page.scss',
})
export class InicialPage implements OnInit {
  public usuarioLogado?: UsuarioModel;
  public apenasEsquadra = 0;

  public ocorrenciaSelecionada?: OcorrenciaModel;
  public ocorrenciasCarregadas: Array<OcorrenciaModel> = [];
  public categoriasCarregadas: Array<CategoriaModel> = [];

  public visibleModalEntregarItemLegitmoDono = false;

  public limitOcorrenciasPagina = 75;

  public isLoadOcorrencia: boolean = false;
  public isLoadCategorias: boolean = false;
  public isLoadMarcarItemRecuperado: boolean = false;
  public isLoadSupenderOcorrencia: boolean = false;
  public paginacao: PaginacaoDTO = { limit: 10, page: 0, totalItems: 0, totalPages: 0 };

  public filtroUsuario: FiltroOcorrenciaDto = {};

  constructor(
    private router: Router,
    private usuarioService: UsuarioService,
    private ocorrenciaProvider: OcorrenciaService,
    private usuarioStateProvider: UsuarioStateProvider,
    private categoriaProdutoProvider: CategoriaProdutoProvider,
    private messageService: MessageService,
    private buscaService: BuscaService,
  ) { }


  ngOnInit(): void {
    this.usuarioLogado = this.usuarioStateProvider.state;
    this.filtroUsuario = this.buscaService.currentFiltros;
    this.ocorrenciasCarregadas = [];

    this.buscaService.filtros$
      .pipe(
        debounceTime(500),      // Aguarda 500ms após o utilizador parar de digitar
        distinctUntilChanged()  // Só dispara se o texto for diferente do anterior
      )
      .subscribe(filtro => {
        this.filtroUsuario = filtro;
        this.ocorrenciasCarregadas = [];
        this.paginacao = { ...this.paginacao, page: 0, totalItems: 0, totalPages: 0 };
        this.carregarOcorrencias();
      });

    //this.carregarOcorrencias();
    //this.carregarCategorias();
  }

  @HostListener('window:scroll', [])
  onWindowScroll() {
    // 1. Altura total que pode ser scrollada
    const heightOfWindow = window.innerHeight;
    const contentScrolled = window.pageYOffset;
    const bodyHeight = document.body.offsetHeight;

    // 2. Distância do fundo (ex: 300px antes de chegar ao fim)
    const threshold = 300;

    if ((heightOfWindow + contentScrolled) >= (bodyHeight - threshold)) {
      // 3. Só dispara se não estiver a carregar e se houver mais páginas
      if (!this.isLoadOcorrencia && this.paginacao.page < this.paginacao.totalPages && this.ocorrenciasCarregadas.length < this.limitOcorrenciasPagina) {
        this.carregarOcorrencias();
      }
    }
  }



  public carregarOcorrencias() {
    if (this.isLoadOcorrencia) return;

    const proximaPagina = this.paginacao.page + 1;

    // Verifica se já carregamos todas as páginas
    if (this.paginacao.totalPages > 0 && proximaPagina > this.paginacao.totalPages && this.ocorrenciasCarregadas.length < this.limitOcorrenciasPagina) return;

    this.ocorrenciaProvider.findAll({
      ...(this.filtroUsuario as any),
      jaDevolvidos: 0,
      ordem: 'recente',
      page: proximaPagina,
      limit: this.paginacao.limit,
    }, {
      onSuccess: (data) => {
        this.paginacao = data.paginacao!;
        this.ocorrenciasCarregadas.push(...data.body);
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

}
