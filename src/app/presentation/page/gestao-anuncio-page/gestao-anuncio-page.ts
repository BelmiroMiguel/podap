import { Component } from '@angular/core';
import { PrimeNgModule } from '../../../prime-ng-module/prime-ng-module';
import { IconModule } from '../../../icons-module/icon-module';
import { RouterLink } from "@angular/router";
import { ListaOcorrenciasComponent } from "../../components/lista-ocorrencias-component/lista-ocorrencias-component";

@Component({
  selector: 'app-gestao-anuncio-page',
  imports: [PrimeNgModule, IconModule, ListaOcorrenciasComponent],
  templateUrl: './gestao-anuncio-page.html',
  styleUrl: './gestao-anuncio-page.scss',
})
export class GestaoAnuncioPage {
  products = [
    {
      code: '1',
      name: 'Produto',
      image: 'pna-img.png',
      category: 'Categoria',
      quantity: 'Quantidade',
    },
    {
      code: '1',
      image: 'pna-img.png',
      name: 'Produto',
      category: 'Categoria',
      quantity: 'Quantidade',
    },
  ];
  filtro = '';

  perdidos = [
    { nome: 'Carteira', descricao: 'Couro preto', local: 'Terminal' },
    { nome: 'Telemóvel', descricao: 'Samsung azul', local: 'Ônibus' },
  ];

  encontrados = [
    { nome: 'Chaves', descricao: 'Com porta-chaves vermelho', local: 'Shopping' },
  ];

  get perdidosFiltrados() {
    return this.perdidos.filter(item =>
      JSON.stringify(item).toLowerCase().includes(this.filtro.toLowerCase())
    );
  }

  get encontradosFiltrados() {
    return this.encontrados.filter(item =>
      JSON.stringify(item).toLowerCase().includes(this.filtro.toLowerCase())
    );
  }
}
