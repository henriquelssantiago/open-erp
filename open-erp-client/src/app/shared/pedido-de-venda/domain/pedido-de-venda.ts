import {Cliente} from "../../clientes/domain/cliente";
import {Produto} from "../../produtos/domain/produto";
import {PedidoDeVendaItem} from "./pedido-de-venda-item";
import {PedidoDeVendaStatus} from "./pedido-de-venda-status";

export interface PedidoDeVenda {
  id: number;
  dataDeEmissao: Date;
  status: PedidoDeVendaStatus;
  valorTotal: number;
  createdAt: Date;
  updatedAt: Date;
  cliente: Cliente;
  itens: PedidoDeVendaItem[];
}
