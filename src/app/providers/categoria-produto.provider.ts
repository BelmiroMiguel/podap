import { AppListener, OnStateListener } from '../utils/listeners';
import { StateProvider } from './state.provider';
import { LocalStorageStateService } from '../services/local.storage.state.service';
import { CategoriaProdutoService } from '../services/categoria-produto.service';
import { CreateCategoriaDto, FiltroCategoriaDto, getResponseDtoDefault, ResponseDTO, UpdateCategoriaDto } from '../data/dto';
import { Injectable } from '@angular/core';
import { CategoriaModel } from '../data/models';
import { UsuarioStateProvider } from './usuario.state.provider';


@Injectable({
  providedIn: 'root'
})
export class CategoriaProdutoProvider extends
  StateProvider<ResponseDTO<Array<CategoriaModel>>> {
  public readonly key = 'key-categoria-produto';

  constructor(
    public categoriaService: CategoriaProdutoService,
    public usuarioStateProvider: UsuarioStateProvider,
    localStorageStateService: LocalStorageStateService,
  ) {
    super(localStorageStateService);

    this.findAll({}, {});
  }

  public async findAll(filtroCategoriaDto: FiltroCategoriaDto, appListener: AppListener<ResponseDTO<Array<CategoriaModel>>>) {
    this.lastSubKey = filtroCategoriaDto;
    const state = this.getSate(JSON.stringify(filtroCategoriaDto), getResponseDtoDefault<[]>([]));

    if (state.body.length) appListener.onFinally?.()
    appListener.onSuccess?.(state)

    this.categoriaService.findAll(filtroCategoriaDto, {
      ...appListener,
      onSuccess: (data) => {
        this.saveSate(data, JSON.stringify(filtroCategoriaDto));
        appListener.onSuccess?.(data)
      },
    })
  }

  public async create(createCategoriaDto: CreateCategoriaDto, appListener: AppListener<ResponseDTO<CategoriaModel>>) {
    this.categoriaService.create(createCategoriaDto, {
      ...appListener,
      onSuccess: (data) => {
        this.updateState();
        appListener.onSuccess?.(data)
      },
    });
  }

  public update(updateCategoriaDto: UpdateCategoriaDto, appListener: AppListener<ResponseDTO<CategoriaModel>>) {
    this.categoriaService.update(updateCategoriaDto, {
      ...appListener,
      onSuccess: (data) => {
        this.updateState();
        appListener.onSuccess?.(data)
      },
    });
  }

  public delete(updateCategoriaDto: UpdateCategoriaDto, appListener: AppListener<ResponseDTO<boolean>>) {
    this.categoriaService.delete(updateCategoriaDto, {
      ...appListener,
      onSuccess: (data) => {
        this.updateState();
        appListener.onSuccess?.(data)
      },
    });
  }


  public ativar(updateCategoriaDto: UpdateCategoriaDto, appListener: AppListener<ResponseDTO<boolean>>) {
    this.categoriaService.ativar(updateCategoriaDto, {
      ...appListener,
      onSuccess: (data) => {
        this.updateState();
        appListener.onSuccess?.(data)
      },
    });
  }

  public async countAll(filtroCategoriaDto: FiltroCategoriaDto, appListener: AppListener<ResponseDTO<number>>) {
    this.lastSubKey = filtroCategoriaDto;
    const state = this.getSate<ResponseDTO<number>>('count-' + JSON.stringify(filtroCategoriaDto), getResponseDtoDefault<[]>([])) as ResponseDTO<number>;

    if (state.body) appListener.onFinally?.()
    appListener.onSuccess?.(state)

    this.categoriaService.countAll(filtroCategoriaDto, {
      ...appListener,
      onSuccess: (data) => {
        this.saveSate(data, 'count-' + JSON.stringify(filtroCategoriaDto));
        appListener.onSuccess?.(data)
      },
    })
  }

}
