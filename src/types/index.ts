// Tipos baseados no diagrama de modelo de dados

export interface Marca {
  id_marca: number;
  nome: string;
  pais_origem?: string;
  logo_url?: string;
}

export interface Veiculo {
  id_veiculo: number;
  marca: Marca;
  modelo: string;
  ano: number;
  preco: number;
  combustivel: string;
  quilometragem: string;
  descricao?: string;
  cambio: string; // Manual ou Automática
  cor?: string;
  localizacao?: string;
  categoria: string; // sedan, suv, hatchback, pickup, esportivo, eletrico
  condicao: 'novo' | 'usado';
  imagens: ImagemVeiculo[];
}

export interface ImagemVeiculo {
  id_imagem: number;
  id_veiculo: number;
  url: string;
  ordem?: number;
}

export interface Utilizador {
  id_utilizador: number;
  nome: string;
  email: string;
  password?: string;
  fotografia?: string;
  tipo: 'vendedor' | 'comprador' | 'administrador';
  data_registro?: Date;
}

export interface Vendedor extends Utilizador {
  tipo: 'vendedor';
  NIF: string;
  dados_bancarios?: string;
  morada: string;
  telefone?: string;
}

export interface Comprador extends Utilizador {
  tipo: 'comprador';
  marcas_favoritas?: number[]; // IDs das marcas
  preferencias?: string;
}

export interface Administrador extends Utilizador {
  tipo: 'administrador';
}

export interface Anuncio {
  id_anuncio: number;
  id_vendedor: number;
  id_veiculo: number;
  titulo: string;
  status: 'ativo' | 'vendido' | 'reservado' | 'inativo';
  data_publicacao: Date;
  data_atualizacao?: Date;
  visualizacoes?: number;
}

export interface Reserva {
  id_reserva: number;
  id_comprador: number;
  id_anuncio: number;
  data_reserva: Date;
  estado_reserva: 'pendente' | 'confirmada' | 'cancelada' | 'expirada';
  data_expiracao?: Date;
}

export interface Venda {
  id_venda: number;
  id_comprador: number;
  id_vendedor: number;
  id_veiculo: number;
  data_venda: Date;
  valor_final: number;
  forma_pagamento?: string;
}

export interface Compra {
  id_compra: number;
  id_comprador: number;
  estado_compra: 'processando' | 'concluida' | 'cancelada';
  data_compra: Date;
}

export interface Denuncia {
  id_denuncia: number;
  id_utilizador: number; // quem denunciou
  id_anuncio?: number;
  tipo: 'anuncio_fraudulento' | 'conteudo_inapropriado' | 'preco_suspeito' | 'outro';
  descricao: string;
  status: 'pendente' | 'em_analise' | 'resolvida' | 'rejeitada';
  data_denuncia: Date;
}

export interface AcaoAdmin {
  id_acao: number;
  id_admin: number;
  tipo_acao: 'aprovar' | 'rejeitar' | 'remover' | 'suspender';
  descricao?: string;
  data_acao: Date;
}
