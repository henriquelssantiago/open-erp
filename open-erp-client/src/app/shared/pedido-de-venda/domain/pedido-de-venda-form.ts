import {PedidoDeVendaItemForm} from "./pedido-de-venda-item-form";

export interface PedidoDeVendaForm {
  dataDeEmissao: string;
  clienteId: number;
  itens: PedidoDeVendaItemForm[];
}
