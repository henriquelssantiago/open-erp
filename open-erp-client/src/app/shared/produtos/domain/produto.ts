export interface Produto {
  id?: number;
  descricao: string;
  unidadeDeMedida: string;
  preco: number;
  bloqueado?: boolean;
}
