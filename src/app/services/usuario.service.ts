import { AppListener } from '../utils/listeners';
import { Injectable } from '@angular/core';
import { AppService } from './app.service';
import { UsuarioModel } from '../data/models';
import { CreateUsuarioDto, FiltroUsuarioDto, FiltroUsuarioDTO, ResponseDTO, UpdateUsuarioDto } from '../data/dto';
import { toFormData } from '../utils/utils';

@Injectable({
  providedIn: 'root',
})
export class UsuarioService {
  private readonly BASE_URL_CIDADAO = 'cidadao';
  private readonly BASE_UR_POLICIAL = 'policial';

  constructor(private appService: AppService) { }

  public createCidadao(createUsuarioDto: CreateUsuarioDto, appListener: AppListener<ResponseDTO<UsuarioModel>>) {
    this.appService.postData(`${this.BASE_URL_CIDADAO}/criar-conta`, toFormData(createUsuarioDto), {
      listener: appListener
    });
  }

  public createPolicial(createUsuarioDto: CreateUsuarioDto, appListener: AppListener<ResponseDTO<UsuarioModel>>) {
    this.appService.postData(`${this.BASE_UR_POLICIAL}/registrar`, toFormData(createUsuarioDto), {
      listener: appListener
    });
  }

  public updateCidadao(updateUsuarioDto: UpdateUsuarioDto, appListener: AppListener<ResponseDTO<UsuarioModel>>) {
    this.appService.postData(`${this.BASE_URL_CIDADAO}/atualizar-perfil`, toFormData(updateUsuarioDto), {
      listener: appListener
    });
  }

  public updatePolicial(updateUsuarioDto: UpdateUsuarioDto, appListener: AppListener<ResponseDTO<UsuarioModel>>) {
    this.appService.postData(`${this.BASE_UR_POLICIAL}/atualizar-perfil/${updateUsuarioDto.idUsuario}`, toFormData(updateUsuarioDto), {
      listener: appListener
    });
  }

  public delete(updateUsuarioDto: UpdateUsuarioDto, appListener: AppListener<ResponseDTO<boolean>>) {
    this.appService.deleteData(`${this.BASE_URL_CIDADAO}`, updateUsuarioDto, {
      listener: appListener
    });
  }

  public ativar(updateUsuarioDto: UpdateUsuarioDto, appListener: AppListener<ResponseDTO<boolean>>) {
    this.appService.putData(`${this.BASE_URL_CIDADAO}/ativar`, updateUsuarioDto, {
      listener: appListener
    });
  }

  public findAll(filtroUsuarioDto: FiltroUsuarioDto,
    appListener: AppListener<ResponseDTO<Array<UsuarioModel>>>) {
    this.appService.getData(`${this.BASE_URL_CIDADAO}`, {
      queryParams: filtroUsuarioDto,
      listener: appListener
    });
  }

  public findByTelefone(telefone: string,
    appListener: AppListener<ResponseDTO<UsuarioModel>>) {
    this.appService.getData(`${this.BASE_URL_CIDADAO}/telefone/${telefone}`, {
      queryParams: {},
      listener: appListener
    });
  }

  public countAll(filtroUsuarioDto: FiltroUsuarioDto,
    appListener: AppListener<ResponseDTO<number>>) {
    this.appService.getData(`${this.BASE_URL_CIDADAO}/count`, {
      queryParams: filtroUsuarioDto,
      listener: appListener
    });
  }

  loginUsuario(
    login: string,
    senha: string,
    apiListener: AppListener<ResponseDTO<UsuarioModel>>
  ) {
    this.appService.postData(
      `auth/login`,
      { login, senha },
      {
        listener: {
          ...apiListener,
          onSuccess: (data) => {
            apiListener.onSuccess!(data);
          },
        },
      }
    );
  }

  logoutUsuario(apiListener: AppListener<ResponseDTO<boolean>>) {
    this.appService.postData(
      `auth/logout`,
      {},
      {
        listener: {
          ...apiListener,
          onSuccess: (data) => {
            apiListener.onSuccess!(data);
          },
        },
      }
    );
  }
}
