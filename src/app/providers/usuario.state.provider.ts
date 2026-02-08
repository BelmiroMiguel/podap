import { LocalStorageStateService } from '../services/local.storage.state.service';
import { UsuarioService } from '../services/usuario.service';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { UsuarioModel } from '../data/models';
import { StateProvider } from './state.provider';
import { CreateUsuarioDto, FiltroUsuarioDto, getResponseDtoDefault, ResponseDTO, UpdateUsuarioDto } from '../data/dto';
import { AppListener } from '../utils/listeners';

@Injectable({
  providedIn: 'root',
})
export abstract class UsuarioStateProvider extends
  StateProvider<ResponseDTO<UsuarioModel>> {
  public readonly key = 'key-usuario-state-podap';
  private ususarioSubject: BehaviorSubject<UsuarioModel | null> = new BehaviorSubject<UsuarioModel | null>(null);
  readonly oservable = this.ususarioSubject.asObservable();

  constructor(localStorageStateService: LocalStorageStateService) {
    super(localStorageStateService);
  }

  public setToken(token: string) {
    this.saveSate(token, "token")
  }

  public get getToken(): string | null {
    return this.getSate<string | null>('token', '') as any
  }

  public set setState(usuario: UsuarioModel) {
    this.saveSate(usuario, this.key)
    this.ususarioSubject.next(usuario);
  }

  public get state(): UsuarioModel | UsuarioModel {
    return this.getSate<UsuarioModel | null>(this.key, null) as any;
  }

  public clearState() {
    this.localStorageStateService.clearAll();
    this.ususarioSubject.next(null);
  }
}
