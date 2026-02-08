import { definePreset } from '@primeuix/themes';
import Material from '@primeuix/themes/material';

export const PNAPreset = definePreset(Material, {
  semantic: {
    primary: {
      50: '#eff2ff',
      100: '#e2e7ff',
      200: '#cbd2ff',
      300: '#a6b1ff',
      400: '#7985ff',
      500: '#140054',   // Azul Oficial (Header/Footer) - Não parece preto
      600: '#2639ed',
      700: '#1d29d6',
      800: '#1a24ad',
      900: '#140054',   // Azul do Logotipo (Mais escuro para contraste)
      950: '#0a002b'
    },
    colorScheme: {
      light: {
        primary: {
          color: '{primary.500}',
          inverseColor: '#ffffff',
          hoverColor: '{primary.600}',
          activeColor: '{primary.700}'
        },
        highlight: {
          background: '{primary.500}',
          focusBackground: '{primary.600}',
          color: '#ffffff',
          focusColor: '#ffffff'
        },
        surface: {
            0: '#ffffff',
            50: '#f8fafc',
            100: '#f1f5f9',
            200: '#e2e8f0',
            300: '#cbd5e1',
            400: '#94a3b8',
            500: '#64748b',
            600: '#475569',
            700: '#334155',
            800: '#1e293b',
            900: '#0f172a',
            950: '#020617'
        }
      }
    },
    // Azul Celeste Oficial da PNA para fundos e banners
    accent: {
        500: '#038FD5'
    }
  },
  css: ({ dt }) => `
    /* Arredondamento Padrão 50px */
    .p-inputtext, .p-card, .p-toolbar, .p-button, .p-chip {
        border-radius: 50px !important;
    }

    /* Estilo para o Hero/Banner usando a cor de fundo secundária #038FD5 */
    .pna-hero-bg {
      background-color: #038fd5 !important;
    }
  `
});
