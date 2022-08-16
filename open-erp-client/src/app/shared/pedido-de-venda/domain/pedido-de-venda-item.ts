import {Produto} from "../../produtos/domain/produto";

export interface PedidoDeVendaItem {
  id: number;
  quantidade: number;
  valorUnitario: number;
  valorTotal: number;
  produto: Produto;
}
