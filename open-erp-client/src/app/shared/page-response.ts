export interface PageResponse<E> {
  totalPages: number;
  size: number;
  totalElements: number;
  itens: E[];
}
