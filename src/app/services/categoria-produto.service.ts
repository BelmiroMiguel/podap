import { Injectable } from '@angular/core';
import { CreateCategoriaDto, CreateProdutoDto, FiltroCategoriaDto, ResponseDTO, UpdateCategoriaDto } from '../data/dto';
import { ProdutoModel, CategoriaModel } from '../data/models';
import { AppListener } from '../utils/listeners';
import { toFormData } from '../utils/utils';
import { AppService } from './app.service';

@Injectable({
  providedIn: 'root'
})
export class CategoriaProdutoService {
  private readonly BASE_URL = 'categorias';

  constructor(private appService: AppService) { }

  public create(createCategoriaDto: CreateCategoriaDto, appListener: AppListener<ResponseDTO<CategoriaModel>>) {
    this.appService.postData(`${this.BASE_URL}`, createCategoriaDto, {
      listener: appListener
    });
  }

  public update(updateCategoriaDto: UpdateCategoriaDto, appListener: AppListener<ResponseDTO<CategoriaModel>>) {
    this.appService.putData(`${this.BASE_URL}`, updateCategoriaDto, {
      listener: appListener
    });
  }

  public findAll(filtroCategorias: FiltroCategoriaDto,
    appListener: AppListener<ResponseDTO<Array<CategoriaModel>>>) {
    this.appService.getData(`${this.BASE_URL}`, {
      queryParams: filtroCategorias,
      listener: appListener
    });
  }

  public countAll(filtroCategoriaDto: FiltroCategoriaDto,
    appListener: AppListener<ResponseDTO<number>>) {
    this.appService.getData(`${this.BASE_URL}/count`, {
      queryParams: filtroCategoriaDto,
      listener: appListener
    });
  }

  public delete(updateCategoriaDto: UpdateCategoriaDto, appListener: AppListener<ResponseDTO<boolean>>) {
    this.appService.deleteData(`${this.BASE_URL}`, updateCategoriaDto, {
      listener: appListener
    });
  }

  public ativar(updateCategoriaDto: UpdateCategoriaDto, appListener: AppListener<ResponseDTO<boolean>>) {
    this.appService.putData(`${this.BASE_URL}/ativar`, updateCategoriaDto, {
      listener: appListener
    });
  }

}
