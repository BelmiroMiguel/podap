import { Component, Input, OnInit } from '@angular/core';
import { IconModule } from '../../../icons-module/icon-module';
import { MatModule } from '../../../mat-module/mat-module';
import { PrimeNgModule } from '../../../prime-ng-module/prime-ng-module';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { CategoriaProdutoProvider } from '../../../providers/categoria-produto.provider';
import { OcorrenciaProvider } from '../../../providers/ocorrencia.provider';
import { UsuarioStateProvider } from '../../../providers/usuario.state.provider';
import { BuscaService } from '../../../services/BuscaService.service';
import { UsuarioService } from '../../../services/usuario.service';

@Component({
  selector: 'app-filter-bar-component',
  imports: [PrimeNgModule, IconModule],
  templateUrl: './filter-bar-component.html',
  styleUrl: './filter-bar-component.scss',
})
export class FilterBarComponent implements OnInit {
  @Input() public qtdResultado = 0;
  // Define o tipo para os botões
  public filtroTipo: 'TODOS' | 'PERDIDO' | 'ACHADO' = 'TODOS';


  constructor(
    private buscaService: BuscaService,
  ) { }

  ngOnInit(): void {
    this.buscaService.removeFiltro('tipoOcorrenciaIncluds[]' as any)
  }

  // Função para atualizar e disparar a busca no Service
  selecionarFiltro(tipo: 'TODOS' | 'PERDIDO' | 'ACHADO') {
    this.filtroTipo = tipo;

    const tipoOcorrencia = tipo == 'TODOS' ? ['PERDIDO', 'ACHADO'] : [tipo]

    // Envia para o serviço de busca (comunicação entre componentes)
    this.buscaService.setFiltros({
      'tipoOcorrenciaIncluds[]': tipoOcorrencia as any
    } as any);
  }

}
