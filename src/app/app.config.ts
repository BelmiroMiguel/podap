import { ApplicationConfig, provideZoneChangeDetection, } from '@angular/core';
import { provideRouter } from '@angular/router';

import { providePrimeNG } from 'primeng/config';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';

import { routes } from './app.routes';
import { PNAPreset } from './theme.present';
import { MessageService } from 'primeng/api';
import { provideHttpClient, withFetch } from '@angular/common/http';

export const appConfig: ApplicationConfig = {
  providers: [
    //provideBrowserGlobalErrorListeners(),
    MessageService,
    provideAnimationsAsync(),
    provideHttpClient(withFetch()),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    providePrimeNG({
      theme: {
        preset: PNAPreset,
        options: {
          // Ao definir como 'none', o PrimeNG nunca aplicará o tema Dark
          darkModeSelector: 'none',
        }
      }
    })
  ]
};
