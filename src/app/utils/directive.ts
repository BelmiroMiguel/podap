import { Directive, ElementRef, HostListener, inject, Input, OnChanges, OnInit, Renderer2 } from '@angular/core';
import { TipoDocumentoFaturacao, TipoDocumentoFaturacaoDescricao } from '../data/enums';
import { formatMoney, getAlertError, getAlertSuccess, temPermissao } from './utils';
import { UsuarioStateProvider } from '../providers/usuario.state.provider';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { UsuarioService } from '../services/usuario.service';
import { PolicialModel } from '../data/models';
import { Tooltip } from 'primeng/tooltip';


@Directive({
  selector: '[appScrollTo]'
})
export class ScrollToDirective {
  @Input('appScrollTo') scrollArea!: any;
  @Input('dir') dir!: number;
  @Input('step') step: number = 200;
  @Input('axis') axis: 'x' | 'y' = 'y';

  @HostListener('click')
  onClick() {
    if (!this.scrollArea) return;
    this.scrollArea.scrollBy({
      left: this.axis === 'x' ? this.dir * this.step : 0,
      top: this.axis === 'y' ? this.dir * this.step : 0,
      behavior: 'smooth'
    });
  }
}

@Directive({
  selector: '[colorTintTipoDocumentoFaturacao]',
})
export class ColorTintTipoDocumentoFaturacaoDirective {
  private el = inject(ElementRef);
  @Input('tipoDocumentoFaturacao') tipoDocumentoFaturacao!: TipoDocumentoFaturacao;

  ngOnChanges() {
    if (!this.tipoDocumentoFaturacao) return;

    const nativeElement = this.el.nativeElement;

    const tipoDocumento = TipoDocumentoFaturacaoDescricao[this.tipoDocumentoFaturacao];
    if (tipoDocumento && tipoDocumento.color) {
      nativeElement.classList.add(tipoDocumento.color.bg);
      nativeElement.classList.add(tipoDocumento.color.text);
    }
  }
}

@Directive({
  selector: '[formatMoney]',
})
export class FormatMoneyDirective {
  private el = inject(ElementRef);
  @Input('value') value: any;

  ngOnInit() {
    const nativeElement = this.el.nativeElement as HTMLInputElement;
    if (this.value) {
      nativeElement.value = formatMoney(this.value)
    }
  }
}


@Directive({
  selector: '[btnTerminarSeccao]'
})
export class BtnTerminarSeccaoDirective {
  private el = inject(ElementRef);


  constructor(
    private router: Router,
    private usuarioService: UsuarioService,
    private usuarioStateProvider: UsuarioStateProvider,
    private messageService: MessageService
  ) { }

  @HostListener('click')
  onClick() {
    // Busca o elemento de ícone dentro do botão
    const icon = this.el.nativeElement.querySelector('.pi');

    this.usuarioService.logoutUsuario({
      onSuccess: (data) => {
        // Muda para um círculo de check ou outro ícone de sucesso
        if (icon) icon.className = 'pi pi-check-circle text-lg';
        this.messageService.add(getAlertSuccess({ subTitulo: data.message }));
      },
      onError: ({ error }) => {
        this.messageService.add(getAlertError({ subTitulo: error.message }));
      },
      onFinally: () => {
        // Se quiser mostrar um "spinner" de carregamento durante o processo
        if (icon) icon.className = 'pi pi-spin pi-spinner text-lg';

        setTimeout(() => {
          this.usuarioStateProvider.clearState();
          this.router.navigate(['/']);
        }, 1800);
      }
    });
  }
}

@Directive({
  selector: '[hasPermission]',
  standalone: true
})
export class HasPermissionDirective implements OnInit, OnChanges {
  @Input('hasPermission') permissions: string[] = [];
  @Input() policial: PolicialModel | undefined;
  @Input() requirePolicial: boolean = false;

  constructor(private el: ElementRef, private renderer: Renderer2) { }

  ngOnInit() {
    this.checkPermission();
  }

  ngOnChanges() {
    this.checkPermission();
  }

  private checkPermission() {
    // Usamos o Promise.resolve().then() para jogar a execução para o próximo "micro-ciclo".
    // Isso resolve o erro ExpressionChangedAfterItHasBeenCheckedError (NG0100)
    Promise.resolve().then(() => {
      if (!this.policial && this.requirePolicial) {
        this.disableElement();
        return;
      } else if (!this.policial) {
        // Se não é obrigatório ser policial, mas não veio policial, habilitamos por padrão
        this.enableElement();
        return;
      }

      // Verifica se tem TODAS as permissões exigidas
      const hasAll = this.permissions.every(p => temPermissao(this.policial, p));

      if (hasAll) {
        this.enableElement();
      } else {
        this.disableElement();
      }
    });
  }

  private disableElement() {
    this.renderer.setProperty(this.el.nativeElement, 'disabled', true);
    this.renderer.setStyle(this.el.nativeElement, 'opacity', '0.5');
    this.renderer.setStyle(this.el.nativeElement, 'cursor', 'not-allowed');
    this.renderer.setStyle(this.el.nativeElement, 'pointer-events', 'none');
  }

  private enableElement() {
    this.renderer.setProperty(this.el.nativeElement, 'disabled', false);
    this.renderer.removeStyle(this.el.nativeElement, 'opacity');
    this.renderer.removeStyle(this.el.nativeElement, 'cursor');
    this.renderer.removeStyle(this.el.nativeElement, 'pointer-events');
  }
}


@Directive({
  selector: 'pTooltip', // Intercepta a diretiva original
  standalone: true
})
export class TooltipDefaultDirective implements OnInit {
  constructor(private tooltip: Tooltip) { }

  ngOnInit() {
    console.log(this.tooltip.tooltipPosition);

    // Se você não definiu uma posição manualmente, ele coloca 'bottom'
    if (!this.tooltip.tooltipPosition) {
      this.tooltip.tooltipPosition = 'bottom';
    }
  }
}
