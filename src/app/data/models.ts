import { Estado, EstadoAnulamentoDocumento, EstadoUsuario, RegimeEmpresa, RegimeEmpresaType, StatusProcesso, TipoDentetorCustodia, TipoDocumentoFaturacao, TipoDocumentoFaturacaoType, TipoMovimentacaoTurno, TipoOcorrencia, TipoProduto, TipoProdutoType, TipoUsuario } from "./enums";

export interface ArmazemModel {
  idArmazem: number;
  idEsquadra: number;
  descricaoSetor: string;
  dataCadastro: string;
  // Relacionamentos
  esquadra?: EsquadraModel;
}

export interface CategoriaModel {
  idCategoria: number;
  descricao: string;
}

export interface CustodiaAtualModel {
  idCustodiaAtual: number;
  idOcorrencia: number;
  tipoDetentor: TipoDentetorCustodia;
  idDetentor: number;
  idArmazem?: number;
  dataCadastro: string;
  // Relacionamentos
  ocorrencia?: OcorrenciaModel;
  armazem?: ArmazemModel;
  detentor?: UsuarioModel | EsquadraModel;
}

export interface EntregaFinalModel {
  idEntregaFinal: number;
  idOcorrencia: number;
  idUsuarioEntregador: number;
  idUsuarioRecebedor: number;
  tokenConfirmacao: string;
  descricaoEntrega?: string;
  fotosEntrega: string[]; // Cast array
  dataEntrega: string;
  fotosEntregaUrl?: string[]; // Append
  // Relacionamentos
  ocorrencia?: OcorrenciaModel;
  entregador?: UsuarioModel;
  recebedor?: UsuarioModel;
}

export interface EsquadraModel {
  idEsquadra: number;
  nome: string;
  provincia: string;
  municipio: string;
  endereco: string;
  telefone?: string;
  // Relacionamentos
  policiais?: PolicialModel[];
  armazens?: ArmazemModel[];
}

export interface HistoricoMovimentacaoModel {
  idHistoricoMovimentacao: number;
  idOcorrencia: number;
  origemDescricao: string;
  destinoDescricao: string;
  idPolicialIntermediario: number;
  dataMovimentacao: string;
  // Relacionamentos
  ocorrencia?: OcorrenciaModel;
  policial?: PolicialModel;
}

export interface ItemModel {
  idItem: number;
  idCategoria: number;
  titulo: string;
  descricao: string;
  detalhe?: any; // Cast array/json
  fotosItem: string[]; // Cast array
  dataCadastro: string;
  fotosItemUrl?: string[]; // Append
  // Relacionamentos
  categoria?: CategoriaModel;
  ocorrencia?: OcorrenciaModel;
}

export interface OcorrenciaModel {
  idOcorrencia: number;
  idItem: number;
  idUsuario: number;
  tipoOcorrencia: TipoOcorrencia;
  statusProcesso: StatusProcesso;
  dataEvento: string;
  localEvento: string;
  dataCadastro: string;
  // Relacionamentos
  item?: ItemModel;
  usuario?: UsuarioModel;
  custodia?: CustodiaAtualModel;
  historicos?: HistoricoMovimentacaoModel[];
}

export interface PermissaoModel {
  idPermissao: number;
  value: string;
  descricao: string;
  dataCadastro: string;
  // Relacionamentos
  roles?: RoleModel[];
  policiais?: PolicialModel[];
}

export interface PolicialModel {
  idPolicial: number;
  idUsuario: number;
  idRole: number;
  idEsquadra: number;
  nip: string;
  patente: string;
  dataCadastro: string;
  // Relacionamentos
  usuario?: UsuarioModel;
  role?: RoleModel;
  esquadra?: EsquadraModel;
  permissoesCustomizadas?: PolicialPermissaoModel[];
}

export interface PolicialPermissaoModel {
  idPolicialPermissao: number;
  permissao?: PermissaoModel;
  idPolicial: number;
  idPermissao: number;
  permitido: boolean;
}

export interface RoleModel {
  idRole: number;
  nome: string;
  descricao?: string;
  idEsquadra?: number;
  dataCadastro: string;
  // Relacionamentos
  esquadra?: EsquadraModel;
  permissoes?: PermissaoModel[];
  policiais?: PolicialModel[];
}

export interface RolePermissaoModel {
  idRolePermissao: number;
  idRole: number;
  idPermissao: number;
}

export interface UsuarioModel {
  idUsuario: number;
  nome: string;
  identificacao: string;
  tipoIdentificacao: 'BI' | 'PASSAPORTE';
  telefone: string;
  email: string;
  tipoUsuario: 'CIDADAO' | 'POLICIAL';
  descEndereco?: string;
  foto?: string;
  fotoUrl?: string; // Append
  // Relacionamentos
  policial?: PolicialModel;
}
/*
******************************************************************
******************************************************************
******************************************************************
******************************************************************
******************************************************************
*/


export interface FornecedorModel {
  idFornecedor: number;
  usuario: UsuarioModel;
  empresa: EmpresaModel;
  turno: TurnoUsuarioModel;
  endereco: EnderecoModel;
  nome: string;
  nif: string;
  email: string;
  genero: string;
  telefone: string;
  dataCadastro: string;
  estado: Estado;
}

export interface FormaPagamentoModel {
  idFormaPagamento: number;
  usuario: UsuarioModel;
  empresa: EmpresaModel;
  turno: TurnoUsuarioModel;
  descricao: string;
  dataCadastro: string;
  estado: Estado;
  quantia?: number;
}



export interface EmpresaModel {
  nome: string;
  regime: string;
  tipoAGT: string;
  nif: string;
  numeroRegitroComercial: string;
  indicativoFactura: string;
  email: string;
  telefone: string;
  site?: string;
  objetoSocial?: string;
  razaoSocial?: string;
  pais: string;
  descricaoEndereco: string;
  logoEmpresa?: File | null;
}


export interface EmpresaModel {
  idEmpresa: number;
  nome: string;
  eliminado: boolean;
}

export interface CarrinhoItemModel {
  nome: string;
  quantidade: number;
  preco: number;
  imposto: number;
  desconto: number;
  total: number;
}

export interface EnderecoModel {
  idEndereco: number;
  provincia: ProvinciaModel;
  descricao: string;
}
export interface ProvinciaModel {
  idProvincia: number;
  descricao: string;
  pais: PaisModel;
}

export interface PaisModel {
  idPais: number;
  descricao: string;
}

export interface TurnoUsuarioModel {
  idTurnoUsuario: number;
  usuario: UsuarioModel;
  usuarioConfirmacao: UsuarioModel;
  saldoInicial: number;
  saldoInformado: number;
  saldoFinal: number;
  aberto: boolean;
  confirmado: boolean;
  dataAbertura: Date;
  dataFeichamento: Date;
  dataConfirmacao: Date;

  totalEntrada: number;
  totalSaida: number;
  saldo: number;

  totalEntradaCaixaFisico: number;
  totalSaidaCaixaFisico: number;
  saldoCaixaFisico: number;

  totalEntradaDocumentos: number;
  totalSaidaDocumentos: number;
  saldoDocumentos: number;
}

export interface TipoDocumentoFaturacaoAnalyticsModel {
  idTipoDocumentoFaturacaoAnalytics: number;
  analyticsFaturacao: AnalyticsFaturacaoModel;
  tipoDocumento: string;
  ordem: number;
  eliminado: boolean;
}

export interface MovimentoDocumentoDto {
  valor: number;
  quantidade?: number;
  descricao: string;
}



export interface AnalyticsMovimentoDocumentoDto {
  valor: number;
  quantidade?: number;
  descricao: string;
}


export interface MovimentoDocumentoDto {
  valor: number;
  quantidade?: number;
  descricao: string;
}

export interface AnalyticsFaturacaoModel {
  idAnalyticsFaturacao: number;
  tipoDocumentoFaturacaoAnalytics: TipoDocumentoFaturacaoAnalyticsModel;
  quatidade: number;
  total: number;
}

export interface MovimentacaoTurnoModel {
  idMovimentacaoTurno: number;
  usuario: UsuarioModel;
  turno: TurnoUsuarioModel;
  valor: number;
  tipoMovimentacao: TipoMovimentacaoTurno;
  descricao: string;
  dataCadastro: Date;
}


export interface ClienteModel {
  idCliente: number;
  usuario: UsuarioModel;
  empresa: EmpresaModel;
  turno: TurnoUsuarioModel;
  endereco: EnderecoModel;
  nif: string;
  nome: string;
  telefone: string;
  email: string;
  genero: string;
  dataCadastro: string;
  estado: Estado;
}


export interface CategoriaProdutoModel {
  idCategoriaProduto: number;
  usuario: UsuarioModel;
  empresa: EmpresaModel;
  turno: TurnoUsuarioModel;
  nome: string;
  dataCadastro: string;
}


export interface ImpostoModel {
  idImposto: number;
  usuario: UsuarioModel;
  empresa: EmpresaModel;
  turno: TurnoUsuarioModel;
  taxa: number;
  descricao: string;
  label: string;
  estado: Estado;
}

export interface MotivoIsencaoModel {
  idMotivoIsencao: number;
  codigo: string;
  mencaoDocumento: string;
  normaAplicavel: string;
  descricao: string;
}

export interface ProdutoDocumentoFaturacaoModel {
  idProdutoDocumentoFaturacao: number;
  uuid: string;
  usuario: UsuarioModel;
  empresa: EmpresaModel;
  produto: ProdutoModel;
  imposto: ImpostoModel;
  uuidProduto: string;
  documentoFaturacao: DocumentoFaturacaoModel;
  uuidDocumentoFaturacao: string;
  nome: string;
  quantidadeMovimento: number;
  quantidadeCreditado: number;// calculado para visalisacao em creditos
  desconto: number;
  preco: number;
  precoVenda: number;
  precoCompra: number;
  precoTotal: number;
  precoTotalIliquido: number;
  dataValidade: string;
  tipoProduto: TipoProdutoType;
  estado: Estado;
}

export interface DocumentoFaturacaoModel {
  idDocumentoFaturacao: number;
  uuid: string;
  produtosDocumentoFaturacao: Array<ProdutoDocumentoFaturacaoModel>;
  usuario: UsuarioModel;
  empresa: EmpresaModel;
  turno: TurnoUsuarioModel;
  cliente?: ClienteModel;
  fornecedor?: FornecedorModel;
  pagamentos: PagamentoDocumentoFaturacaoModel[];
  documentoFaturacaoReferencia?: DocumentoFaturacaoModel;
  documentoFaturacaoReciboPagamento?: DocumentoFaturacaoModel;
  documentosNotaCreditoFaturacao?: DocumentoFaturacaoModel[];
  documentosNotaDebitoFaturacao?: DocumentoFaturacaoModel[];
  documentosReferenciadosFaturacao: DocumentoFaturacaoModel[];
  documentosReciboFaturacao?: DocumentoFaturacaoModel[];
  documentosReciboEstornoFaturacao?: DocumentoFaturacaoModel[];

  uuidDocumentoFaturacaoReferencia: string;
  tipoDocumentoFaturacao: TipoDocumentoFaturacao;
  aberto: boolean;
  dataAbertura: string;
  dataFeichamento: string;
  dataValidade: string;
  serie: string;
  estado: Estado;
  pago: boolean;
  estadoAnulamento: EstadoAnulamentoDocumento;
  expirado: boolean;

  linkDocumentoDefault: string;

  linkDocumentoFaturaReciboA4: string;
  linkDocumentoFaturaReciboTICKET: string;

  linkDocumentoFaturaReciboA4Original: string;
  linkDocumentoFaturaReciboTICKETOriginal: string;
  numeroViaImpressao: number;

  //###############
  // dados para cliente estaticos
  nomeCliente: string;
  enderecoCliente: string;
  telefoneCliente: string;
  nifCliente: string;

  //###############
  // dados funcionario estaticos
  nomeUSuario: string;
  telefoneUSuario: string;


  // dados para fornecedor estaticos
  nomeFornecedor: string;
  nifFornecedor: string;
  emailFornecedor: string;
  telefoneFornecedor: string;

  //###############
  // dados empresa estaticos
  nomeEmpresa: string;
  regimeEmpresa: RegimeEmpresaType;
  nifEmpresa: string;
  tipoAGTEmpresa: string;
  numeroRegistroComercialEmpresa: string;
  logoEmpresa: string;
  indicativoFaturaEmpresa: string;
  telefoneEmpresa: string;
  emailEmpresa: string;
  siteEmpresa: string;

  precoTotalIliquido: number;
  precoTotal: number;
  troco: number;
  totalImposto: number;
  totalDesconto: number;
}

export interface ProdutoModel {
  idProduto: number;
  uuid: string;
  usuario: UsuarioModel;
  turno: TurnoUsuarioModel;
  empresa: EmpresaModel;
  categoria: CategoriaProdutoModel;
  imposto: ImpostoModel;
  motivoIsencao: MotivoIsencaoModel;
  nome: string;
  descricao: string;
  quantidade: number;
  imagem: string;
  imagens: Array<string>;
  preco: number;
  precoVenda: number;
  precoCompra: number;
  dataValidade: string;
  dataCadastro: string;
  estado: Estado;
  tipoProduto: TipoProdutoType;
  estoqueMinimo: number;
  estoqueMaximo: number;
}

export interface PagamentoDocumentoFaturacaoModel {
  idPagamentoDocumentoFaturacao: string;
  uuid: string;
  documentoFaturacao: DocumentoFaturacaoModel;
  uuidDocumentoFaturacao: string;
  formaPagamento: FormaPagamentoModel;
  usuario: UsuarioModel;
  empresa: EmpresaModel;
  turno: TurnoUsuarioModel;
  cliente: ClienteModel;
  valor: number;
  dataPagamento: string;
}
