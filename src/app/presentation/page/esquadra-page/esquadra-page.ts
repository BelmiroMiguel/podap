import { Component, OnInit } from '@angular/core';
import { PrimeNgModule } from '../../../prime-ng-module/prime-ng-module';
import { IconModule } from '../../../icons-module/icon-module';
import { UsuarioModel } from '../../../data/models';
import { CapitalizarPalavraPipe } from '../../../utils/pipes';
import { PaginatorState } from 'primeng/paginator';
import { PaginacaoDTO } from '../../../data/dto';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { CategoriaProdutoProvider } from '../../../providers/categoria-produto.provider';
import { OcorrenciaProvider } from '../../../providers/ocorrencia.provider';
import { UsuarioStateProvider } from '../../../providers/usuario.state.provider';
import { UsuarioService } from '../../../services/usuario.service';
import { getAlertError, getAlertSuccess } from '../../../utils/utils';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CadastroUsuarioFormComponent } from "../../components/forms/cadastro-usuario-form-component/cadastro-usuario-form-component";

@Component({
  selector: 'app-esquadra-page',
  imports: [PrimeNgModule, IconModule, CapitalizarPalavraPipe, ReactiveFormsModule, CadastroUsuarioFormComponent],
  templateUrl: './esquadra-page.html',
  styleUrl: './esquadra-page.scss',
})
export class EsquadraPage implements OnInit {
  public usuarioLogado!: UsuarioModel;


  public novoPolicial = true;
  public usuarioSelecionado?: UsuarioModel;
  public usuariosCarregados: UsuarioModel[] = [];
  public paginacao: PaginacaoDTO = { limit: 10, page: 1, totalItems: 0, totalPages: 0 };

  public isLoadPoliciais: boolean = false;
  public visibleModalCadastrarPolicial: boolean = false;
  public isLoadMarcarItemRecuperado: boolean = false;

  public isLoadAlterarImagem: boolean = false;

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
    this.carregarUsuarios();
    //this.isPolicial = !!this.usuarioLogado.policial;
  }

  carregarUsuarios(event?: any) {
    if (this.isLoadPoliciais) return;
    // Calcula a página atual baseada no evento do PrimeNG
    const page = event ? (event.first / event.rows) + 1 : 1;

    this.usuarioService.findAll({
      ...this.formFiltro.value as any,
      idUsuario: this.usuarioLogado.idUsuario,
      apenasEsquadra: true,
      idEsquadra: this.usuarioLogado.policial?.esquadra?.idEsquadra ?? 0,
      limit: this.paginacao.limit,
      page,
    }, {
      onSuccess: (data) => {
        this.paginacao = data.paginacao!;
        this.usuariosCarregados = data.body;
      },
      onError: ({ error }) => {
        this.messageService.add(getAlertError({
          subTitulo: error.message
        }))
      },
      onLoad: () => this.isLoadPoliciais = true,
      onFinally: () => this.isLoadPoliciais = false,

    })
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

    this.usuarioService.updatePolicial({
      idUsuario: this.usuarioSelecionado?.idUsuario ?? 0,
      foto: file
    }, {
      onSuccess: (data) => {
        this.usuariosCarregados = this.usuariosCarregados.map(us => {
          if (data.body.idUsuario == us.idUsuario) {
            us = data.body;
          }
          return us;
        })
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
