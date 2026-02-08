import { HttpParams } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { AbstractControl, ValidationErrors, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { TipoDocumentoFaturacaoDescricao, TipoDocumentoFaturacao, TipoDocumentoFaturacaoType } from '../data/enums';
import { PermissaoModel, PolicialModel, PolicialPermissaoModel } from '../data/models';

export const ValidatorsTelefonex = {
  angola: Validators.pattern(/^\+244 9\d{2} \d{3} \d{3}$/)
}

export const ValidatorsTelefone = {
  angola: Validators.pattern(/^(?:\+244)?\s?9\d{2}\s?\d{3}\s?\d{3}$/)
};

export const validarTelefone = {
  angola: (telefone: string): boolean => {
    const regex = /^(?:\+244)?\s?9\d{2}\s?\d{3}\s?\d{3}$/;
    return regex.test(telefone);
  }
}

export const ValidatorsDocumentos = {
  // BI Angolano: 9 números + 2 letras + 3 números
  biAngola: Validators.pattern(/^\d{9}[A-Za-z]{2}\d{3}$/),

  // Passaporte Angolano: 2 letras + 7 números
  passaporteAngola: Validators.pattern(/^[A-Za-z]{2}\d{7}$/),
};

export const validarIdentificacaoPorTipo = (control: AbstractControl): ValidationErrors | null => {
  const tipo = control.get('tipoIdentificacao')?.value;
  const identificacao = control.get('identificacao')?.value;

  if (!tipo || !identificacao) {
    return null;
  }

  const biRegex = /^\d{9}[A-Za-z]{2}\d{3}$/;
  const passaporteRegex = /^[A-Za-z]{2}\d{7}$/;

  let valido = true;

  if (tipo == 'BI') {
    valido = biRegex.test(identificacao);
  }

  if (tipo == 'PASSAPORTE') {
    valido = passaporteRegex.test(identificacao);
  }

  return valido ? null : { identificacaoInvalida: true };
}

export const ValidatorsPolicial = {
  nipPolicial: Validators.pattern(/^\d{9}$/),
};


export const SenhasIguaisValidator = (group: AbstractControl): ValidationErrors | null => {
  const senha = group.get('senha')?.value;
  const confirmar = group.get('senha_confirmation')?.value;

  if (!senha || !confirmar) {
    return null;
  }

  return senha === confirmar ? null : { senhasDiferentes: true };
};

export const toFormData = (data: Object): FormData => {
  const formData = new FormData();

  Object.entries(data).forEach(([key, value]) => {
    if (value !== null && value !== undefined) {

      // Verifica se o valor é uma instância de Date
      if (value instanceof Date) {
        // Converte para YYYY-MM-DD
        const dataFormatada = value.toISOString().split('T')[0];
        formData.append(key, dataFormatada);
      }
      // Verifica se é um Array
      else if (Array.isArray(value)) {
        value.forEach(item => formData.append(`${key}[]`, item));
      }
      // Outros valores (string, number, etc)
      else {
        formData.append(key, value);
      }

    }
  });

  return formData;
}


export const getParams = (queryParams?: any) => {
  let params = new HttpParams();
  if (queryParams) {
    for (let key in queryParams) {
      if (queryParams.hasOwnProperty(key)) {
        params = params.set(key, queryParams[key]);
      }
    }
  }
  return params;
};


export const getUrlParams = (router: Router) => {
  const urlArray = router.url.split('?');
  if (urlArray.length > 1) {
    const params = urlArray[1].split('&');

    const paramObj: Map<string, any> = new Map();
    params.forEach(param => {
      const key = param.split('=')[0];
      const value = (param.split('=')[1]).replaceAll('%2F', '/');
      paramObj.set(key, value);
    })
    return paramObj;
  }

  return new Map<string, any>();
}

export interface MesModelType {
  code: number,
  label: string,
  descMin: string,
}

export const getMeses = (): Array<MesModelType> => {
  return [
    {
      code: 0,
      label: "Janeiro",
      descMin: 'Jan.'
    },
    {
      code: 1,
      label: "Fevereiro",
      descMin: 'Fev.'
    }, {
      code: 2,
      label: "Março",
      descMin: 'Mar.'
    }, {
      code: 3,
      label: "Abril",
      descMin: 'Abr.'
    }, {
      code: 4,
      label: "Maio",
      descMin: 'Mai.'
    }, {
      code: 5,
      label: "Junho",
      descMin: 'Jun.'
    }, {
      code: 6,
      label: "Julho",
      descMin: 'Jul.'
    }, {
      code: 7,
      label: "Agosto",
      descMin: 'Ago.'
    }, {
      code: 8,
      label: "Setembro",
      descMin: 'Set.'
    }, {
      code: 9,
      label: "Outubro",
      descMin: 'Out.'
    }, {
      code: 10,
      label: "Novembro",
      descMin: 'Nov.'
    }, {
      code: 11,
      label: "Dezembro",
      descMin: 'Dez.'
    }
  ]
}


export const getAnos = (anoInicio: number = 0, countFinal = 10) => {
  const data = new Date();
  const ano = anoInicio || data.getFullYear();
  countFinal = countFinal || 10;
  const anos = [];
  for (let i = 0; i <= countFinal; i++) {
    anos.push(ano + i);
  }
  return anos;
}


export const GenerosSelect = [
  { label: 'Masculino', value: 'masculino' },
  { label: 'Feminino', value: 'feminino' },
]


export const formatMoney = (value: number, locale: string = 'pt-PT', currency: string = 'AOA'): string => {
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency,
    minimumFractionDigits: 2
  }).format(value)
}
// utils/format-date.util.ts (Opcional, pode ser inline no Pipe)

/**
 * Formata uma data para uma string localizada.
 * @param value A data a ser formatada (Date object, string ISO ou timestamp).
 * @param locale Opcional: a localização (ex: 'pt-PT', 'en-US').
 * @param options Opcional: opções de formatação para toLocaleString.
 */
export function formatDate(
  value: any,
  locale: string = 'pt-PT', // Define o padrão para Português de Portugal
  options?: Intl.DateTimeFormatOptions
): string {
  if (value === null || typeof value === 'undefined') {
    return '';
  }

  const date = new Date(value);

  if (isNaN(date.getTime())) {
    return 'Data Inválida';
  }

  // Define opções padrão se nenhuma for fornecida
  const defaultOptions: Intl.DateTimeFormatOptions = options || {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
  };

  return date.toLocaleString(locale, defaultOptions);
}


export const capitalizarPalavra = (value: string): string => {
  if (!value) return '';

  return value
    .toLowerCase()
    .split(' ')
    .map(word => word
      .split('-')
      .map(sword => sword.charAt(0).toUpperCase() + sword.slice(1)).join('-')
    ).join(' ')
}



export const checkPathRout = (router: Router, path: string): boolean => {
  return router.url.split('?')[0].split('#')[0].includes(path);
}


export const getPathRout = (router: Router): string => {
  const pathComposto = router.url.split('?')[0].split('#')[0];
  const paths = pathComposto.split('/')
  return paths[paths.length - 1]
}


export interface AlertParam {
  titulo?: string;
  subTitulo?: string;
  duration?: number;
}

export const getAlertSuccess = ({ titulo = 'Sucesso', subTitulo, duration = 3000 }: AlertParam) => {
  return {
    key: 'mainToast',
    summary: titulo,
    detail: subTitulo,
    life: duration,
    severity: 'success',
  }
}
export const getAlertError = ({ titulo = 'Falha na operação', subTitulo, duration = 3000 }: AlertParam) => {
  return {
    key: 'mainToast',
    summary: titulo,
    detail: subTitulo,
    life: duration,
    severity: 'error',
  }
}
export const getAlertWarn = ({ titulo = 'Atenção', subTitulo, duration = 3000 }: AlertParam) => {
  return {
    key: 'mainToast',
    summary: titulo,
    detail: subTitulo,
    life: duration,
    severity: 'warn',
  }
}


/**
 * Verifica se o policial tem uma permissão específica.
 * Lógica: Sobrescrita Individual > Permissão da Role > False
 */
export function temPermissao(policial: PolicialModel | undefined, permicaoValue: string): boolean {
  if (!policial) return false;
  console.log(policial);
  console.log(permicaoValue);



  // 1. Verificar sobrescrita individual (tb_policial_permissao)
  // No TS, verificamos se a permissão existe no array 'permissoesCustomizadas'
  const custom = policial.permissoesCustomizadas?.find(
    (p: PolicialPermissaoModel) => p.permissao?.value == permicaoValue
  );

  console.log(custom);

  if (custom) {
    // Retorna o valor da sobrescrita (1/true ou 0/false)
    return Boolean(custom.permitido);
  }

  // 2. Se não tem sobrescrita, checa a Role (tb_role_permissao)
  if (!policial.role || !policial.role.permissoes) {
    return false;
  }

  console.log(policial.role);


  // Verifica se a permissão existe dentro do array de permissões da Role
  return policial.role.permissoes.some(
    (p: PermissaoModel) => p.value == permicaoValue
  );
}





export const formatTipoDocumentoFaturacao = (tipoDocumento: TipoDocumentoFaturacaoType, min: boolean = false): string => {
  if (!tipoDocumento) return '';
  return min ? TipoDocumentoFaturacaoDescricao[tipoDocumento].descricaoMin : TipoDocumentoFaturacaoDescricao[tipoDocumento].descricao;
}

