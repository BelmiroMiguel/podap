import { Component, Input, OnInit } from '@angular/core';
import { OcorrenciaModel } from '../../../data/models';
import { Router } from '@angular/router';
import { PrimeNgModule } from '../../../prime-ng-module/prime-ng-module';
import { IconModule } from '../../../icons-module/icon-module';
import { MessageService } from 'primeng/api';
import { CategoriaProdutoProvider } from '../../../providers/categoria-produto.provider';
import { UsuarioStateProvider } from '../../../providers/usuario.state.provider';
import { BuscaService } from '../../../services/BuscaService.service';
import { OcorrenciaService } from '../../../services/ocorrencia.service';
import { UsuarioService } from '../../../services/usuario.service';
import { CapitalizarPalavraPipe } from '../../../utils/pipes';
import { LowerCasePipe, UpperCasePipe } from '@angular/common';

@Component({
  selector: 'app-detalhe-item-page',
  imports: [PrimeNgModule, IconModule, CapitalizarPalavraPipe, LowerCasePipe, UpperCasePipe],
  templateUrl: './detalhe-item-page.html',
  styleUrl: './detalhe-item-page.scss',
})
export class DetalheItemPage implements OnInit {
  public ocorrencia!: OcorrenciaModel;

  fotoUrl = '';
  nome = '';
  telefone = '';
  email = '';


  constructor(
    public router: Router,
    private usuarioService: UsuarioService,
    private ocorrenciaProvider: OcorrenciaService,
    private usuarioStateProvider: UsuarioStateProvider,
    private categoriaProdutoProvider: CategoriaProdutoProvider,
    private messageService: MessageService,
    private buscaService: BuscaService,
  ) {

    const navigation = this.router.getCurrentNavigation();
    if (navigation?.extras.state) {
      this.ocorrencia = navigation.extras.state['data'];
    }
  }

  ngOnInit(): void {
    // Redireciona caso o usuário dê refresh e perca o state (opcional)
    if (!this.ocorrencia) {
      this.router.navigate(['/']);
      console.error('Nenhuma ocorrência encontrada no state');
    }
    const isPolicial = !!this.ocorrencia.usuario?.policial
    const usuario = this.ocorrencia.usuario;
    const policial = this.ocorrencia.usuario?.policial;
    const esquadra = this.ocorrencia.usuario?.policial?.esquadra;

    this.fotoUrl = isPolicial ? 'pna-img.png' : usuario?.fotoUrl ?? 'default-img.png';
    this.email = isPolicial ? '---' : usuario?.email ?? '---';
    this.nome = isPolicial ? esquadra?.nome ?? '---' : usuario?.nome ?? '---';
    this.telefone = isPolicial ? esquadra?.telefone ?? '---' : usuario?.telefone ?? '---';
  }

  // Mock para o histórico (como solicitado: estático por enquanto)
  historicoMock = [
    { status: 'Registado', data: '10/02/2024 08:30', local: 'Esquadra Central', icon: 'pi pi-plus', color: '#607D8B' },
    { status: 'Em Trânsito', data: '11/02/2024 14:20', local: 'Viatura 02 -> Depósito B', icon: 'pi pi-truck', color: '#FF9800' },
    { status: 'Custodiado', data: '12/02/2024 09:00', local: 'Armazém Central (Setor A)', icon: 'pi pi-box', color: '#4CAF50' }
  ];


  getSeverity(status: string) {
    switch (status) {
      case 'PENDENTE': return 'warn';
      case 'RESOLVIDO': return 'success';
      case 'CANCELADO': return 'danger';
      default: return 'info';
    }
  }

  voltar() {
    window.history.back();
  }
}
