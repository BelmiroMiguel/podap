import { EntregaFinalModel, UsuarioModel } from './../data/models';
import { Injectable } from '@angular/core';
import { CreateCategoriaDto, CreateOcorrenciaDto, CreateProdutoDto, EntregaOcorrenciaDto, FiltroCategoriaDto, FiltroOcorrenciaDto, ResponseDTO, UpdateCategoriaDto } from '../data/dto';
import { ProdutoModel, CategoriaProdutoModel, OcorrenciaModel } from '../data/models';
import { AppListener } from '../utils/listeners';
import { toFormData } from '../utils/utils';
import { AppService } from './app.service';

@Injectable({
  providedIn: 'root'
})
export class OcorrenciaService {
  private readonly BASE_URL = 'ocorrencia';

  constructor(private appService: AppService) { }

  public create(dto: CreateOcorrenciaDto, appListener: AppListener<ResponseDTO<OcorrenciaModel>>) {
    this.appService.postData(`${this.BASE_URL}`, toFormData(dto), {
      listener: appListener
    });
  }

  public finalizarEntrega(dto: EntregaOcorrenciaDto, appListener: AppListener<ResponseDTO<EntregaFinalModel>>) {
    this.appService.postData(`entrega-ocorrencia`, toFormData(dto), {
      listener: appListener
    });
  }

  public update(dto: CreateOcorrenciaDto, appListener: AppListener<ResponseDTO<OcorrenciaModel>>) {
    this.appService.putData(`${this.BASE_URL}`, dto, {
      listener: appListener
    });
  }

  public findAll(dto: FiltroOcorrenciaDto,
    appListener: AppListener<ResponseDTO<Array<OcorrenciaModel>>>) {
    this.appService.getData(`${this.BASE_URL}`, {
      queryParams: dto,
      listener: appListener
    });
  }

  public countAll(dto: FiltroOcorrenciaDto,
    appListener: AppListener<ResponseDTO<number>>) {
    this.appService.getData(`${this.BASE_URL}/count`, {
      queryParams: dto,
      listener: appListener
    });
  }

  public delete(idOcorrencia: number, appListener: AppListener<ResponseDTO<boolean>>) {
    this.appService.deleteData(`${this.BASE_URL}/${idOcorrencia}`, {}, {
      listener: appListener
    });
  }

  public recuperado(idOcorrencia: number, appListener: AppListener<ResponseDTO<boolean>>) {
    this.appService.putData(`${this.BASE_URL}/recuperado/${idOcorrencia}`, {}, {
      listener: appListener
    });
  }

  public ativar(dto: CreateOcorrenciaDto, appListener: AppListener<ResponseDTO<boolean>>) {
    this.appService.putData(`${this.BASE_URL}/ativar`, dto, {
      listener: appListener
    });
  }

}
