import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { UsuarioStateProvider } from '../providers/usuario.state.provider';

export const authGuard: CanActivateFn = (route, state) => {
  const pathRout = route.routeConfig?.path;
  const router = inject(Router);
  const usuarioStateProvider = inject(UsuarioStateProvider);

  if (!usuarioStateProvider.state) {
    return router.createUrlTree(['/'], {
      queryParams: { returnUrl: state.url },
    });
  }

  return true;
};


export const guestGuard: CanActivateFn = () => {
  const router = inject(Router);
  const usuarioState = inject(UsuarioStateProvider);

  if (usuarioState.state) {
    return router.createUrlTree(['/']);
  }

  return true;
};
