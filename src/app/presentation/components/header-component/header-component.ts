import { AfterContentChecked, AfterContentInit, AfterViewChecked, Component, OnChanges, OnInit } from '@angular/core';
import { MatModule } from '../../../mat-module/mat-module';
import { IconModule } from '../../../icons-module/icon-module';
import { FormControl } from '@angular/forms';
import { PrimeNgModule } from '../../../prime-ng-module/prime-ng-module';
import { Router, RouterLink, RouterLinkActive } from "@angular/router";
import { MessageService } from 'primeng/api';
import { UsuarioModel } from '../../../data/models';
import { UsuarioStateProvider } from '../../../providers/usuario.state.provider';
import { UsuarioService } from '../../../services/usuario.service';
import { CapitalizarPalavraPipe } from '../../../utils/pipes';
import { BuscaService } from '../../../services/BuscaService.service';

@Component({
  selector: 'app-header-component',
  imports: [PrimeNgModule, IconModule, RouterLink, RouterLinkActive, CapitalizarPalavraPipe],
  templateUrl: './header-component.html',
  styleUrl: './header-component.scss',
})
export class HeaderComponent implements AfterContentChecked {
  public usuarioLogado?: UsuarioModel;
  search = new FormControl()

  constructor(
    private router: Router,
    private usuarioService: UsuarioService,
    private usuarioStateProvider: UsuarioStateProvider,
    private messageService: MessageService,
    private buscaService: BuscaService,
  ) { }

  ngAfterContentChecked(): void {
    this.usuarioLogado = this.usuarioStateProvider.state;
  }

  onSearch(event: any) {
    const valor = event.target.value;
    this.buscaService.setFiltros({ filtroTexto: valor });
  }
}
