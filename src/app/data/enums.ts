export type TipoOcorrencia = 'PERDIDO' | 'ACHADO';

export type StatusProcesso =
  | 'PROCURANDO'
  | 'COM_CIDADAO'
  | 'NA_POLICIA'
  | 'ENTREGUE'
  | 'CANCELADO';


export type TipoDentetorCustodia = 'CIDADAO' | 'ESQUADRA';
















export enum RegimeEmpresa {
  EXCLUSAO = 'exclusao',
  SIMPLIFICADO = 'simplificado',
  GERAL = 'geral',
  ESPECIAL = 'especial',
}
export type RegimeEmpresaType = `${RegimeEmpresa}`

export enum TipoAGT {
  INDIVIDUAL = 'Individual',
  COLETIVA = 'Coletiva',
}

export enum TipoUsuario {
  ADMINISTRADOR = 'administrador',
  FUNCAIONARIO = 'funcionario',
  USUARIO = 'usuario',
  COLABORADOR = 'colaborador',
}

export enum EstadoUsuario {
  ATIVO = 'ativo',
  ELIMINADO = 'eliminado',
  SUSPENSO = 'suspenso',
}

export enum GeneroUsuario {
  MASCULINO = 'masculino',
  FEMININO = 'feminino',
}

export enum Estado {
  ATIVO = 'ativo',
  ELIMINADO = 'eliminado',
  SUSPENSO = 'suspenso',
}


export enum EstadoAnulamentoDocumento {
  ATIVO = 'ativo',
  ANULADO_TOTAL = 'anulado_total',
  ANULADO_PARCIAL = 'anulado_parcial',
  MODIFICADO = 'modificado',
}


export enum TipoProduto {
  PRODUTO = 'produto',
  SERVICO = 'servico'
}
export type TipoProdutoType = `${TipoProduto}`


export enum TipoMovimentacaoTurno {
  ENTRADA = 'entrada_dinheiro',
  SAIDA = 'saida_dinheiro',
}
export type TipoMovimentacaoTurnoType = `${TipoMovimentacaoTurno}`


export enum TipoDocumentoFaturacao {
  ENTRADA_ESTOQUE = 'entrada_estoque',
  NOTA_CREDITO = 'nota_credito',
  NOTA_DEBITO = 'nota_debito',
  BAIXA_ESTOQUE = 'baixa_estoque',
  FATURA = 'fatura',
  FATURA_RECIBO = 'fatura_recibo',
  FATURA_PROFORMA = 'fatura_proforma',
  RECIBO = 'recibo',
  RECIBO_ESTORNO = 'recibo_estorno',
  ORCAMENTO = 'orcamento',
  GUIA_TRANSPORTE = 'guia_transporte',
  CLONAR = 'clonar', // não é um doc, apenas para clonar um documento existente no menú converter.
}
export type TipoDocumentoFaturacaoType = `${TipoDocumentoFaturacao}`

export const TipoDocumentoFaturacaoDescricao = {
  entrada_estoque: {
    descricao: 'Entrada de Estoque',
    descricaoMin: 'EE',
    color: {
      text: 'text-blue-900!',
      bg: 'bg-green-600',
    },
  },
  nota_credito: {
    descricao: 'Nota de Crédito',
    descricaoMin: 'NC',
    color: {
      text: 'text-red-900!',
      bg: 'bg-blue-600',
    },
  },
  nota_debito: {
    descricao: 'Nota de Débito',
    descricaoMin: 'NB',
    color: {
      text: 'text-orange-900!',
      bg: 'bg-red-600',
    },
  },
  baixa_estoque: {
    descricao: 'Baixa de Estoque',
    descricaoMin: 'BE',
    color: {
      text: 'text-pink-900!',
      bg: 'bg-yellow-600',
    },
  },
  fatura: {
    descricao: 'Fatura',
    descricaoMin: 'F',
    color: {
      text: 'text-purple-900!',
      bg: 'bg-purple-600',
    },
  },
  fatura_recibo: {
    descricao: 'Fatura Recibo',
    descricaoMin: 'FR',
    color: {
      text: 'text-green-900!',
      bg: 'bg-indigo-600',
    },
  },
  fatura_proforma: {
    descricao: 'Fatura Proforma',
    descricaoMin: 'FP',
    color: {
      text: 'text-pink-900!',
      bg: 'bg-pink-600',
    },
  },
  recibo: {
    descricao: 'Recibo',
    descricaoMin: 'R',
    color: {
      text: 'text-gray-900!',
      bg: 'bg-gray-600',
    },
  },
  recibo_estorno: {
    descricao: 'Recibo Estorno',
    descricaoMin: 'RE',
    color: {
      text: 'text-lime-900!',
      bg: 'bg-gray-600',
    },
  },
  guia_transporte: {
    descricao: 'GUIA_TRANSPORTE',
    descricaoMin: 'GUIA_TRANSPORTE',
    color: {
      text: 'text-cyan-900!',
      bg: 'bg-gray-600',
    },
  },
  clonar: {
    descricao: 'CLONAR',
    descricaoMin: 'CLONAR',
    color: {
      text: 'text-cyan-900',
      bg: 'bg-gray-600',
    },
  },
  orcamento: {
    descricao: 'ORCAMENTO',
    descricaoMin: 'ORCAMENTO',
    color: {
      text: 'text-cyan-900',
      bg: 'bg-gray-600',
    },
  },
}


export const TiposDocumentoFaturacaoReduzEstoque_Selecionado = [
  TipoDocumentoFaturacao.FATURA,
  TipoDocumentoFaturacao.FATURA_RECIBO,
];

export const TiposDocumentoFaturacaoAumentaEstoque_RemoveSelecao = [
  TipoDocumentoFaturacao.FATURA,
  TipoDocumentoFaturacao.FATURA_RECIBO,
];

export const TiposDocumentoFaturacaoReduzEstoqueFinalizado = [
  TipoDocumentoFaturacao.BAIXA_ESTOQUE,
];

export const TiposDocumentoFaturacaoAumentaEstoqueFinalizado = [
  TipoDocumentoFaturacao.NOTA_CREDITO,
  TipoDocumentoFaturacao.ENTRADA_ESTOQUE,
];

export const TiposDocumentoFaturacao_RequerPagamentoFinalizar = [
  TipoDocumentoFaturacao.FATURA_RECIBO,
  TipoDocumentoFaturacao.RECIBO,
];
