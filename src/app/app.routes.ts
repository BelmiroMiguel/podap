import { Routes } from '@angular/router';
import { InicialPage } from './presentation/page/inicial-page/inicial-page';
import { LoginPage } from './presentation/page/login-page/login-page';
import { CriarContaPage } from './presentation/page/criar-conta-page/criar-conta-page';
import { AnunciarItemPage } from './presentation/page/anunciar-item-page/anunciar-item-page';
import { MainPage } from './presentation/page/main-page/main-page';
import { PerfilPage } from './presentation/page/perfil-page/perfil-page';
import { EsquadraPage } from './presentation/page/esquadra-page/esquadra-page';
import { GestaoAnuncioPage } from './presentation/page/gestao-anuncio-page/gestao-anuncio-page';
import { authGuard, guestGuard } from './guards/auth.guard';
import { DetalheItemPage } from './presentation/page/detalhe-item-page/detalhe-item-page';

export const routes: Routes = [
  {
    path: '',
    title: 'PODAP',
    component: MainPage,
    children: [
      {
        path: '',
        title: 'PODAP',
        component: InicialPage,
      },
      {
        path: 'anunciar',
        title: 'Anunciar Item',
        component: AnunciarItemPage,
        canActivate: [authGuard],
      },
      {
        path: 'perfil',
        title: 'Anunciar Item',
        component: PerfilPage,
        canActivate: [authGuard],
      },
      {
        path: 'esquadra',
        title: 'Gerir Esquadra',
        component: EsquadraPage,
        canActivate: [authGuard],
      },
      {
        path: 'gestao-anuncios',
        title: 'Gerir Anúncios',
        component: GestaoAnuncioPage,
        canActivate: [authGuard],
      },
      {
        path: 'detalhe-ocorrencia',
        title: 'Detalhe da Ocorrência',
        component: DetalheItemPage,
        canActivate: [authGuard],
      },
    ]
  },
  {
    path: 'login',
    title: 'Login',
    component: LoginPage,
    canActivate: [guestGuard],
  },
  {
    path: 'criar-conta',
    title: 'Criar Conta',
    component: CriarContaPage,
    canActivate: [guestGuard],
  },
  {
    path: '**',
    redirectTo: '',
  },
];
