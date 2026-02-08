import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from "@angular/router";
import { MessageService } from 'primeng/api';
import { OcorrenciaModel, UsuarioModel } from '../../../data/models';
import { UsuarioStateProvider } from '../../../providers/usuario.state.provider';
import { UsuarioService } from '../../../services/usuario.service';
import { ButtonDirective } from "primeng/button";
import { OcorrenciaService } from '../../../services/ocorrencia.service';
import { getAlertError } from '../../../utils/utils';

@Component({
  selector: 'app-heroi-component',
  imports: [RouterLink, ButtonDirective],
  templateUrl: './heroi-component.html',
  styleUrl: './heroi-component.scss',
})
export class HeroiComponent implements OnInit {
  public usuarioLogado?: UsuarioModel = undefined;

  public ocorrenciasCarregadas: Array<OcorrenciaModel> = [];
  public isLoadOcorrencia: boolean = false;
  public totalEntregues = 0;

  constructor(
    private router: Router,
    private usuarioService: UsuarioService,
    private ocorrenciaProvider: OcorrenciaService,
    private usuarioStateProvider: UsuarioStateProvider,
    private messageService: MessageService
  ) { }

  ngOnInit(): void {
    this.usuarioLogado = this.usuarioStateProvider.state;
    this.carregarOcorrencias();
  }

  public carregarOcorrencias() {
    if (this.isLoadOcorrencia) return;

    this.ocorrenciaProvider.findAll({
      jaDevolvidos: 0,
      ordem: 'recente',
      page: 1,
      limit: 3,
    }, {
      onSuccess: (data) => {
        this.totalEntregues = data.paginacao?.totalItems ?? 0;
        this.ocorrenciasCarregadas.push(...data.body);
      },
      onError: ({ error }) => {
        this.messageService.add(getAlertError({
          subTitulo: error.message
        }))
      },
      onLoad: () => this.isLoadOcorrencia = true,
      onFinally: () => this.isLoadOcorrencia = false,
    })
  }
}
