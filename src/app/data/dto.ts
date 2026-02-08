import { AppListener } from '../utils/listeners';
import { Estado, EstadoAnulamentoDocumento, EstadoUsuario, StatusProcesso, TipoDocumentoFaturacao, TipoDocumentoFaturacaoType, TipoMovimentacaoTurno, TipoOcorrencia, TipoProduto, TipoUsuario } from './enums';
import { getParams } from '../utils/utils';
import { ProdutoDocumentoFaturacaoModel, ProdutoModel, UsuarioModel } from './models';

export interface PaginacaoDTO {
  page: number;
  totalPages: number;
  limit: number;
  totalItems: number;
}

export interface ResponseDTO<T> {
  message?: string;
  body: T;
  paginacao?: PaginacaoDTO,
  token?: string;
}

export class RequestParams {
  queryParams?: any;
  listener?: AppListener<any>;

  constructor({ queryParams, listener }: any) {
    this.queryParams = getParams(queryParams);
    this.listener = listener;
  }
}


export interface CreateOcorrenciaDto {
  // Dados do Item
  idCategoria: number;
  titulo: string;
  descricao: string;

  /**
   * Detalhes técnicos/estéticos do item
   * Ex: { "cor": "preto", "marca": "apple" }
   */
  detalhe?: Record<string, any>;

  /**
   * No Frontend, as fotos são enviadas como arquivos antes do upload
   */
  fotos?: File[];

  // Dados da Ocorrência
  tipoOcorrencia: TipoOcorrencia;

  /** Data no formato ISO (YYYY-MM-DD ou YYYY-MM-DDTHH:mm:ss) */
  dataEvento: string | Date;

  localEvento: string;

  // Dados de Custódia
  /** ID do armazém (obrigatório se o policial estiver registrando um item ACHADO) */
  idArmazem?: number | null;
}

export interface FiltroOcorrenciaDto {
  /** Busca por título ou descrição do item */
  search?: string;
  filtroTexto?: string;

  /** ID da categoria para filtrar */
  idCategoria?: number;

  idCategoriaIncluds?: number[];

  /** Tipo da ocorrência */
  tipoOcorrencia?: TipoOcorrencia;
  tipoOcorrenciaIncluds?: TipoOcorrencia[];

  /** Status atual do processo */
  statusProcesso?: StatusProcesso;

  /** Data inicial para o filtro de período (formato YYYY-MM-DD) */
  dataInicio?: string;

  /** Data final para o filtro de período (formato YYYY-MM-DD) */
  dataFim?: string;

  /** Quantidade de itens por página */
  limit?: number;

  /** Número da página atual */
  page?: number;

  /** ID do usuário que cadastrou a ocorrência */
  idUsuarioCadastro?: number;

  /** Se verdadeiro, filtra apenas itens sob custódia da polícia */
  apenasEsquadra?: boolean | number;

  /** Se verdadeiro, filtra apenas itens que já foram entregues ao dono */
  jaDevolvidos?: boolean | number;

  /** Critério de ordenação dos resultados */
  ordem?: 'recente' | 'antigo' | 'az' | 'za';
}

export interface CreateCategoriaDto {
  descricao: string;
}

export interface UpdateCategoriaDto {
  descricao: string;
}

export interface FiltroCategoriaDto {
  filtroTexto?: string;
  page?: number;
  limit?: number;
  eliminado?: boolean;
}


export interface EntregaOcorrenciaDto {
  idOcorrencia: number;
  idUsuarioRecebedor: number;
  descricaoEntrega: string;
  tokenConfirmacao?: string | null;
  fotos?: File[]; // Ou string[] se forem URLs/Base64
}

export interface CreateUsuarioDto {
  nome: string;
  email: string;
  senha: string;
  confirmed: string;
  telefone: string;
  tipoIdentificacao: string;
  identificacao: string;
  nip?: string;
}


export interface UpdateUsuarioDto extends Partial<CreateUsuarioDto> {
  idUsuario: number;
  estado?: Estado;
  tipoUsuario?: TipoUsuario;
  foto?: File,
}

export interface FiltroUsuarioDto {
  filtroTexto?: string;
  tipoUsuario?: 'CIDADAO' | 'POLICIAL' | 'ADMIN';
  tipoUsuarioIncluds?: ('CIDADAO' | 'POLICIAL' | 'ADMIN')[];
  statusConta?: 'ATIVO' | 'INATIVO' | 'BLOQUEADO';
  dataCriacaoInicio?: string | Date;
  dataCriacaoFim?: string | Date;
  idUsuario: number;
  idEsquadra?: number;
  apenasEsquadra?: boolean;
  nip?: string;
  page?: number;
  limit?: number;
  ordem?: 'recente' | 'antigo' | 'nome_az' | 'nome_za';
  idUsuarioLogado?: number;
}


/* *
**********************************************************************
**********************************************************************
**********************************************************************
**********************************************************************
**********************************************************************
 */




export interface CreateProdutoDto {
  idUsuario: number;
  idCategoriaProduto: number;
  idImposto: number;
  idMotivoIsencao?: number;
  nome: string;
  descricao: string;
  quantidade: number;
  imagem?: File;
  imagens?: Array<string>;
  preco: number;
  precoCompra: number;
  tipoProduto?: TipoProduto;
  dataValidade?: string;
}

export interface UpdateProdutoDto extends Partial<CreateProdutoDto> {
  idProduto: number;
  estado?: Estado;
}

export interface CreateDocumentoFaturacaoDto {
  idUsuario: number;
  idProduto: number;
  idCliente?: number;
  idFornecedor?: number;
  quantidade: number;
  desconto?: number;
  idDocumentoFaturacaoReferencia?: number;
  tipoDocumentoFaturacao: TipoDocumentoFaturacaoType;
}

export interface ProdutoSelecionadoAdicionarCarrinhoDto {
  produto: ProdutoModel;
  quantidade: number;
  desconto?: number;
}

export interface UpdateDocumentoFaturacaoDto extends Partial<CreateDocumentoFaturacaoDto> {
  idUSuario: number;
  idProdutoDocumentoFaturacao?: number;
}



export interface FiltroDocumentoFaturacaoDto extends Partial<UpdateDocumentoFaturacaoDto> {
  idUsuario: number;
  idUsuarioCadastro?: number;
  idDocumentoFaturacao?: number;
  idCliente?: number;
  idDocumentoFaturacaoReferencia?: number;
  idTurno?: number;
  /**
   * @deprecated Um documento não pode ser eliminado, apenas modificado
   * @Sse('ativo, anuladoTotal, anuladoParcial') Nova forma de verificar o estado do documento
   */
  estado?: Estado;
  aberto?: boolean | any;
  processsarRelacionamentos?: boolean | any;
  pago?: boolean | any;
  estadoAnulamentoIncluds?: EstadoAnulamentoDocumento[];
  estadoAnulamento?: EstadoAnulamentoDocumento;
  ativo?: boolean | any;
  anuladoTotal?: boolean | any;
  semDocReferencia?: boolean | any; // que nao tem referencia
  anuladoParcial?: boolean | any;
  tipoDocumentoFaturacaoIncluds?: TipoDocumentoFaturacao[];
  page?: number;
  limit?: number;
}


export interface FiltroAnalyticsDto {
  idTurno: number;
  idUsuario: number;
  tipoDocumentoFaturacaoIncluds?: TipoDocumentoFaturacao[];
}

export interface GerarNotaCreditoDocumentoFaturacaoDto {
  idUsuario: number;
  idDocumentoFaturacaoReferencia: number;
  descricao?: string;
  produtoRetornaEstoqueNotaCredito?: boolean | any;
  produtosDocumentoFaturacao: Array<ProdutoDocumentoFaturacaoModel>;
  pagamentos: Array<PagamentoDocumentoFaturacaoDto>;
}


export interface GerarNotaDebitoDocumentoFaturacaoDto {
  idUsuario: number;
  idDocumentoFaturacaoReferencia: number;
  descricao?: string;
  produtosDocumentoFaturacao: Array<ProdutoDocumentoFaturacaoModel>;
}


export interface GerarReciboDocumentoFaturacaoDto {
  idUsuario: number;
  idDocumentoFaturacao: number;
  descricao?: string;
  pagamentos: Array<PagamentoDocumentoFaturacaoDto>;
}



export interface UpdateProdutoDocumentoFaturacaoDto {
  idUsuario: number;
  idDocumentoFaturacao: number;
  idProduto: number;
  quantidade: number;
  desconto?: number;
  idProdutoDocumentoFaturacao?: number;
}


export interface PagamentoDocumentoFaturacaoDto {
  idFormaPagamento: number;
  valor: number;
}

export interface FinalizarDocumentoFaturacaoDto {
  idUsuario: number;
  idDocumentoFaturacao: number;
  pagamentos?: Array<PagamentoDocumentoFaturacaoDto>;
}


export interface ClonarDocumentoFaturacaoDto {
  idUsuario: number;
  idEntidade: number; // cliente, fornecedor, prestadores de servico
  idDocumentoFaturacao: number;
  manterDocumentoAberto: boolean;
  usarPrecoOriginal: boolean;
  tipoDocumentoFaturacao: TipoDocumentoFaturacao;
  pagamentos?: Array<PagamentoDocumentoFaturacaoDto>;
}

export interface CreateClienteDto {
  idUsuario: number;
  nome: string;
  telefone: string;
  nif?: string;
  email?: string;
  genero: string;
  descricaoEndereco?: string;
}


export interface UpdateClienteDto extends Partial<CreateClienteDto> {
  idCliente: number;
  estado?: Estado;
}

export interface FiltroClienteDto {
  idUsuario: number;
  filtroTexto?: string;
  dataCadastro?: string;
  estado?: string;
  page?: number;
  limit?: number;
}


export interface CreateFornecedorDto {
  idUsuario: number;
  nome: string;
  telefone?: string;
  email?: string;
  genero?: string;
  nif?: string;
  descricaoEndereco?: string;
}
export interface UpdateFornecedorDto extends Partial<CreateFornecedorDto> {
  idFornecedor: number;
  estado?: Estado;
}
export interface FiltroFornecedorDto {
  idUsuario: number;
  filtroTexto?: string;
  dataCadastro?: string;
  estado?: string;
  page?: number;
  limit?: number;
}


export interface CreateFormaPagamentoDto {
  idUsuario: number;
  descricao: string;
}

export interface UpdateFormaPagamentoDto extends Partial<CreateFormaPagamentoDto> {
  idFormaPagamento: number;
  estado?: Estado
}

export interface FiltroFormaPagamentoDto extends Partial<UpdateFormaPagamentoDto> {
  filtroTexto?: string,
  page?: number,
  limit?: number
}

export interface CreateImpostoDto {
  idUsuario: number;
  descricao: string;
  taxa: number;
}

export interface UpdateImpostoDto extends Partial<CreateImpostoDto> {
  idImposto: number;
}


export type FiltroUsuarioDTO = {
  nome?: string;
  identificacao?: string;
  endereco?: string;
  filtroTexto?: string;
  email?: string;
  telefone?: string;
  tipoUsuario?: TipoUsuario;
  estadoUsuario?: EstadoUsuario;
  emailVerificado?: boolean;
  identificacaoVerificado?: boolean;
  telefoneVerificado?: boolean;
  dataCadastroInicio?: Date;
  dataCadastroFim?: Date;
  page?: number;
  limit?: number;
}



export interface FiltroImpostoDto {
  idImposto?: number;
  idUsuario: number;
  descricao?: string;
  taxa?: number;
  estado?: Estado
  filtroTexto?: string,
  page?: number,
  limit?: number
}

export interface FiltroProdutoDto {
  idProduto?: number;
  idUsuario: number;
  idEmpresa?: number;
  idUsuarioCadastro?: number;
  idUsuarioLogado?: number;
  idCategoriaProduto?: number;
  tipoProduto?: TipoProduto;
  filtroTexto?: string;
  dataValidade?: string;
  validos?: boolean;
  espirados?: boolean;
  comEstoque?: boolean;
  semEstoque?: boolean;
  estoqueMaior?: number;
  estoqueMenor?: number;
  page?: number;
  limit?: number;
  estado?: string;
}



export interface CreateTurnoUsuarioDto {
  idUsuario: number;
  saldoInicial: number;
  descricao?: string;
}

export interface ConfirmarTurnoUsuarioDto {
  idUsuario: number;
  idTurno: number;
  descricao?: string;
}

export interface FeicharTurnoUsuarioDto {
  idUsuario: number;
  idTurno: number;
  saldoFinal: number;
  descricao?: string;
}


export interface FeixarTurnoUsuarioDto {
  idTurno: number;
  saldoFinal: number;
  descricao?: string;
}

export interface MovimentarTurnoUsuarioDto {
  idTurno: number;
  saldo: number;
  tipoMovimentacaoTurno: TipoMovimentacaoTurno;
  descricao?: string;
}

export interface FiltroTurnoUsuarioDto {
  idUsuarioLogado: number;
  idUsuarioCadastro?: number;
  idUsuario?: number;
  idTurno?: number;
  descricao?: string;
  filtroTexto?: string;
  estadoAberto?: boolean;
  estadoConfirmado?: boolean;
  page?: number;
  limit?: number;
}

export interface FiltroMovimentoTurnoUsuarioDto {
  idUsuarioLogado: number;
  idUsuarioCadastro?: number;
  idTurno?: number;
  descricao?: string;
  filtroTexto?: string;
  tipoMovimentacaoTurno?: TipoMovimentacaoTurno;
  page?: number;
  limit?: number;
}

export const getPaginacaoDefault = (page: number = 1, limit: number = 15): PaginacaoDTO => {
  return {
    page: page,
    limit: limit,
    totalItems: 0,
    totalPages: 0,
  }
}


export const getResponseDtoDefault = <T>(body: T): ResponseDTO<T> => {
  return {
    body: body,
    paginacao: getPaginacaoDefault()
  }
}

export interface ObjConvercaoDocumentOption {
  usarOutraEntidade: boolean,
  manterDocumentoAberto: boolean,
  usarPrecoOriginal: boolean,
  icon?: string,
}

export const ObjConvercaoDocumentOptions: Map<TipoDocumentoFaturacaoType, ObjConvercaoDocumentOption> = new Map();
export const ObjConvercaoDocumentType: Map<TipoDocumentoFaturacaoType, typeof ObjConvercaoDocumentOptions> = new Map();


