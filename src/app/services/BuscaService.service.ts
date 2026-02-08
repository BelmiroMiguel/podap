import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { FiltroOcorrenciaDto, FiltroUsuarioDTO } from '../data/dto';

@Injectable({ providedIn: 'root' })
export class BuscaService {
  // O BehaviorSubject guarda o último valor emitido
  private buscaSource = new BehaviorSubject<FiltroOcorrenciaDto>({});
  filtros$ = this.buscaSource.asObservable();

  // Atualiza apenas os campos enviados, mantendo os outros (Merge)
  setFiltros(novosFiltros: Partial<FiltroOcorrenciaDto>) {
    const estadoAtual = this.buscaSource.value;
    this.buscaSource.next({ ...estadoAtual, ...novosFiltros });
  }

  removeFiltro(atributo: keyof FiltroOcorrenciaDto) {
    // 1. Obtém o estado atual (cópia para não mutar diretamente)
    const estadoAtual = { ...this.buscaSource.value };

    // 2. Remove fisicamente a chave do objeto
    delete estadoAtual[atributo];

    // 3. Emite o novo estado sem essa propriedade
    this.buscaSource.next(estadoAtual);
  }

  removeFiltros(atributos: (keyof FiltroOcorrenciaDto)[]) {
    const estadoAtual = { ...this.buscaSource.value };

    atributos.forEach(attr => delete estadoAtual[attr]);

    this.buscaSource.next(estadoAtual);
  }


  get currentFiltros() {
    return this.buscaSource.value;
  }
}
