import { Component, OnInit } from '@angular/core';
import { MatModule } from '../../../mat-module/mat-module';
import { IconModule } from '../../../icons-module/icon-module';
import { PrimeNgModule } from '../../../prime-ng-module/prime-ng-module';
import { CategoriaModel } from '../../../data/models';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { CategoriaProdutoProvider } from '../../../providers/categoria-produto.provider';
import { OcorrenciaProvider } from '../../../providers/ocorrencia.provider';
import { UsuarioStateProvider } from '../../../providers/usuario.state.provider';
import { BuscaService } from '../../../services/BuscaService.service';
import { UsuarioService } from '../../../services/usuario.service';
import { getAlertError } from '../../../utils/utils';

@Component({
  selector: 'app-side-bar-component',
  imports: [PrimeNgModule, IconModule],
  templateUrl: './side-bar-component.html',
  styleUrl: './side-bar-component.scss',
})
export class SideBarComponent implements OnInit {

  public categoriasCarregadas: Array<CategoriaModel> = [];

  public isLoadCategorias: boolean = false;
  public categoriaSelecionadaId: number = 0;
  public visibleModalCategorias = false;

  // Categorias fixas no menu lateral
  public categoriasPrincipais: CategoriaModel[] = [
    /*   { idCategoria: 0, descricao: 'Todos', icon: 'pi pi-th-large' },
      { idCategoria: 1, descricao: 'Eletrônicos', icon: 'pi pi-desktop' },
      { idCategoria: 2, descricao: 'Pets', icon: 'pi pi-heart' },
      { idCategoria: 3, descricao: 'Documentos', icon: 'pi pi-file' },
      { idCategoria: 4, descricao: 'Vestuário', icon: 'pi pi-tag' } */
  ];

  constructor(
    private router: Router,
    private usuarioService: UsuarioService,
    private ocorrenciaProvider: OcorrenciaProvider,
    private usuarioStateProvider: UsuarioStateProvider,
    private categoriaProdutoProvider: CategoriaProdutoProvider,
    private messageService: MessageService,
    private buscaService: BuscaService,
  ) { }


  ngOnInit(): void {
    this.categoriaSelecionadaId = this.buscaService.currentFiltros.idCategoria ?? 0;
    this.carregarCategorias();
  }

  selecionarCategoria(id: number) {
    this.categoriaSelecionadaId = id;
    // Envia para o serviço de busca global
    if (id <= 0) {
      this.buscaService.removeFiltro('idCategoria');
      return
    }
    this.buscaService.setFiltros({ idCategoria: id });
  }


  public carregarCategorias() {
    if (this.isLoadCategorias) return;

    this.categoriaProdutoProvider.findAll({
      limit: 100,
    }, {
      onSuccess: (data) => {
        this.categoriasCarregadas = data.body;
        this.categoriasPrincipais = data.body.slice(0, 4);
        this.categoriasPrincipais.unshift({ idCategoria: 0, descricao: 'Todos' },)
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
