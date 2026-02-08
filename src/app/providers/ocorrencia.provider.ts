import { AppListener, OnStateListener } from '../utils/listeners';
import { StateProvider } from './state.provider';
import { LocalStorageStateService } from '../services/local.storage.state.service';
import { CategoriaProdutoService } from '../services/categoria-produto.service';
import { CreateCategoriaDto, CreateOcorrenciaDto, EntregaOcorrenciaDto, FiltroOcorrenciaDto, getResponseDtoDefault, ResponseDTO, UpdateCategoriaDto } from '../data/dto';
import { Injectable } from '@angular/core';
import { EntregaFinalModel, OcorrenciaModel } from '../data/models';
import { UsuarioStateProvider } from './usuario.state.provider';
import { OcorrenciaService } from '../services/ocorrencia.service';


@Injectable({
  providedIn: 'root'
})
export class OcorrenciaProvider extends
  StateProvider<ResponseDTO<Array<OcorrenciaModel>>> {
  public readonly key = 'key-ocorrencia-podap';

  constructor(
    public ocorrenciaService: OcorrenciaService,
    public usuarioStateProvider: UsuarioStateProvider,
    localStorageStateService: LocalStorageStateService,
  ) {
    super(localStorageStateService);

    //this.findAll({
    //  idUsuarioCadastro: usuarioStateProvider.state?.idUsuario!
    //}, {});
  }

  public async findAll(filtroOcorrenciaDto: FiltroOcorrenciaDto, appListener: AppListener<ResponseDTO<Array<OcorrenciaModel>>>) {
    this.lastSubKey = filtroOcorrenciaDto;
    const state = this.getSate(JSON.stringify(filtroOcorrenciaDto), getResponseDtoDefault<[]>([]));

    if (state.body.length) appListener.onFinally?.()
    appListener.onSuccess?.(state)

    this.ocorrenciaService.findAll(filtroOcorrenciaDto, {
      ...appListener,
      onSuccess: (data) => {
        this.saveSate(data, JSON.stringify(filtroOcorrenciaDto));
        appListener.onSuccess?.(data)
      },
    })
  }

  public async create(createOcorrenciaDto: CreateOcorrenciaDto, appListener: AppListener<ResponseDTO<OcorrenciaModel>>) {
    this.ocorrenciaService.create(createOcorrenciaDto, {
      ...appListener,
      onSuccess: (data) => {
        this.updateState();
        appListener.onSuccess?.(data)
      },
    });
  }

  public async finalizarEntrega(entregaOcorrenciaDto: EntregaOcorrenciaDto, appListener: AppListener<ResponseDTO<EntregaFinalModel>>) {
    this.ocorrenciaService.finalizarEntrega(entregaOcorrenciaDto, {
      ...appListener,
      onSuccess: (data) => {
        this.updateState();
        appListener.onSuccess?.(data)
      },
    });
  }

  public update(createOcorrenciaDto: CreateOcorrenciaDto, appListener: AppListener<ResponseDTO<OcorrenciaModel>>) {
    this.ocorrenciaService.update(createOcorrenciaDto, {
      ...appListener,
      onSuccess: (data) => {
        this.updateState();
        appListener.onSuccess?.(data)
      },
    });
  }

  public delete(idOcorrencia: number, appListener: AppListener<ResponseDTO<boolean>>) {
    this.ocorrenciaService.delete(idOcorrencia, {
      ...appListener,
      onSuccess: (data) => {
        this.updateState();
        appListener.onSuccess?.(data)
      },
    });
  }

  public recuperado(idOcorrencia: number, appListener: AppListener<ResponseDTO<boolean>>) {
    this.ocorrenciaService.recuperado(idOcorrencia, {
      ...appListener,
      onSuccess: (data) => {
        this.updateState();
        appListener.onSuccess?.(data)
      },
    });
  }


  public ativar(createOcorrenciaDto: CreateOcorrenciaDto, appListener: AppListener<ResponseDTO<boolean>>) {
    this.ocorrenciaService.ativar(createOcorrenciaDto, {
      ...appListener,
      onSuccess: (data) => {
        this.updateState();
        appListener.onSuccess?.(data)
      },
    });
  }

  public async countAll(filtroOcorrenciaDto: FiltroOcorrenciaDto, appListener: AppListener<ResponseDTO<number>>) {
    this.lastSubKey = filtroOcorrenciaDto;
    const state = this.getSate<ResponseDTO<number>>('count-' + JSON.stringify(filtroOcorrenciaDto), getResponseDtoDefault<[]>([])) as ResponseDTO<number>;

    if (state.body) appListener.onFinally?.()
    appListener.onSuccess?.(state)

    this.ocorrenciaService.countAll(filtroOcorrenciaDto, {
      ...appListener,
      onSuccess: (data) => {
        this.saveSate(data, 'count-' + JSON.stringify(filtroOcorrenciaDto));
        appListener.onSuccess?.(data)
      },
    })
  }

}
