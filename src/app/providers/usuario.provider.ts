import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { UsuarioModel } from '../data/models';
import { LocalStorageStateService } from '../services/local.storage.state.service';
import { StateProvider } from './state.provider';
import { ResponseDTO, FiltroUsuarioDto, getResponseDtoDefault, CreateUsuarioDto, UpdateUsuarioDto } from '../data/dto';
import { UsuarioService } from '../services/usuario.service';
import { AppListener } from '../utils/listeners';
import { UsuarioStateProvider } from './usuario.state.provider';

@Injectable({
  providedIn: 'root',
})
export class UsuarioProvider extends
  StateProvider<ResponseDTO<Array<UsuarioModel>>> {
  public readonly key = 'key-usuarios-podap';

  private ususarioSubject: BehaviorSubject<UsuarioModel | null> = new BehaviorSubject<UsuarioModel | null>(null);
  readonly oservable = this.ususarioSubject.asObservable();

  constructor(
    private usuarioService: UsuarioService,
    public usuarioStateProvider: UsuarioStateProvider,
    localStorageStateService: LocalStorageStateService,
  ) {
    super(localStorageStateService);

    this.findAll({
      idUsuario: this.usuarioStateProvider.state?.idUsuario!
    }, {});
  }

  public async findAll(filtroUsuarioDto: FiltroUsuarioDto, appListener: AppListener<ResponseDTO<Array<UsuarioModel>>>) {
    this.lastSubKey = filtroUsuarioDto;
    const state = this.getSate(JSON.stringify(filtroUsuarioDto), getResponseDtoDefault<[]>([]));

    if (state.body.length) appListener.onFinally?.()
    appListener.onSuccess?.(state)

    this.usuarioService.findAll(filtroUsuarioDto, {
      ...appListener,
      onSuccess: (data) => {
        this.saveSate(data, JSON.stringify(filtroUsuarioDto));
        appListener.onSuccess?.(data)
      },
    })
  }

  public async countAll(filtroUsuarioDto: FiltroUsuarioDto, appListener: AppListener<ResponseDTO<number>>) {
    this.lastSubKey = filtroUsuarioDto;
    const state = this.getSate<ResponseDTO<number>>('count-' + JSON.stringify(filtroUsuarioDto), getResponseDtoDefault<[]>([])) as ResponseDTO<number>;

    if (state.body) appListener.onFinally?.()
    appListener.onSuccess?.(state)

    this.usuarioService.countAll(filtroUsuarioDto, {
      ...appListener,
      onSuccess: (data) => {
        this.saveSate(data, 'count-' + JSON.stringify(filtroUsuarioDto));
        appListener.onSuccess?.(data)
      },
    })
  }

  public async create(createUsuarioDto: CreateUsuarioDto, appListener: AppListener<ResponseDTO<UsuarioModel>>) {
    this.usuarioService.createCidadao(createUsuarioDto, {
      ...appListener,
      onSuccess: (data) => {
        this.updateState();
        appListener.onSuccess?.(data)
      },
    });
  }

  public update(updateUsuarioDto: UpdateUsuarioDto, appListener: AppListener<ResponseDTO<UsuarioModel>>) {
    this.usuarioService.updateCidadao(updateUsuarioDto, {
      ...appListener,
      onSuccess: (data) => {
        this.updateState();
        appListener.onSuccess?.(data)
      },
    });
  }


  public delete(updateUsuarioDto: UpdateUsuarioDto, appListener: AppListener<ResponseDTO<boolean>>) {
    this.usuarioService.delete(updateUsuarioDto, {
      ...appListener,
      onSuccess: (data) => {
        this.updateState();
        appListener.onSuccess?.(data)
      },
    });
  }


  public ativar(updateUsuarioDto: UpdateUsuarioDto, appListener: AppListener<ResponseDTO<boolean>>) {
    this.usuarioService.ativar(updateUsuarioDto, {
      ...appListener,
      onSuccess: (data) => {
        this.updateState();
        appListener.onSuccess?.(data)
      },
    });
  }

  public findByTelefone(telefone: string, appListener: AppListener<ResponseDTO<UsuarioModel>>) {
    this.usuarioService.findByTelefone(telefone, {
      ...appListener,
      onSuccess: (data) => {
        this.updateState();
        appListener.onSuccess?.(data)
      },
    });
  }
}
