import { Pipe, PipeTransform } from '@angular/core';
import { capitalizarPalavra, formatDate as formatData, formatMoney, formatTipoDocumentoFaturacao } from './utils';
import { DocumentoFaturacaoModel } from '../data/models';
import extenso from 'extenso';

@Pipe({ name: 'format_money_pipe' })
export class FormatMoneyPipe implements PipeTransform {
  transform(value: any, locale?: string, currency?: string) {
    return formatMoney(value, locale, currency)
  }
}

@Pipe({ name: 'capitalizar_palavra_pipe' })
export class CapitalizarPalavraPipe implements PipeTransform {
  transform(value: any) {
    return capitalizarPalavra(value)
  }
}

@Pipe({ name: 'format_percentagem_pipe' })
export class FormatPercentagePipe implements PipeTransform {
  transform(value: any) {
    return value + " %"
  }
}

@Pipe({ name: 'format_quantidade_pipe' })
export class FormatQuantidadePipe implements PipeTransform {
  transform(value: any) {
    return parseInt(value) < value ? value : parseInt(value);
  }
}


@Pipe({
  name: 'scrollTo_pipe',
  pure: false // precisa ser impuro se vamos manipular elementos
})
export class ScrollToPipe implements PipeTransform {
  transform(el: HTMLElement | null, direction: number, step: number = 220): void {
    if (!el) return;
    el.scrollBy({ left: direction * step, behavior: 'smooth' });
  }
}


@Pipe({ name: 'format_tipo_documento_min_pipe' })
export class FormatTipoDocumentoFaturacaoPipe implements PipeTransform {
  transform(value: any, min: boolean = false) {
    return formatTipoDocumentoFaturacao(value, min)
  }
}

@Pipe({ name: 'soma_total_documentos_pipe' })
export class SomaTotalDocumentosPipe implements PipeTransform {
  transform(documentos: DocumentoFaturacaoModel[]) {
    let soma = 0;
    documentos.forEach(d => soma += d.precoTotal)
    return soma;
  }
}



@Pipe({
  name: 'format_date_pipe', // Use este nome no template: {{ minhaData | formatDatePipe }}
})
export class FormatDatePipe implements PipeTransform {
  /**
   * Transforma um valor de data num formato de string amigável.
   * @param value A data (string ISO, Date object ou timestamp).
   * @param locale Opcional: A localização (padrão: 'pt-PT').
   * @param formatOptions Opcional: Opções de Intl.DateTimeFormatOptions para personalizar a saída.
   */
  transform(
    value: any,
    locale?: string,
    formatOptions?: Intl.DateTimeFormatOptions
  ): string {
    // Chama a função utilitária para fazer o trabalho
    return formatData(value, locale, formatOptions);
  }
}


@Pipe({ name: 'formt_numero_por_extenso' })
export class FormatNumeroPorExtensoPipe implements PipeTransform {

  transform(valor: number): string {
    if (valor === null || valor === undefined) return '';

    const inteiro = Math.floor(valor);
    const centimos = Math.round((valor - inteiro) * 100);

    const inteiroTxt = extenso(inteiro, { locale: 'pt' });
    const centimosTxt = extenso(centimos, { locale: 'pt' });

    // kwanzas ou kwanza
    let texto = `${inteiroTxt} ${inteiro === 1 ? 'kwanza' : 'kwanzas'}`;

    if (centimos > 0) {
      texto += ` e ${centimosTxt} ${centimos === 1 ? 'cêntimo' : 'cêntimos'}`;
    }

    return texto;
  }
}
