import {Component} from '@angular/core';
import {PedidoDeVendaService} from "../../shared/pedido-de-venda/services/pedido-de-venda.service";
import {ClientesService} from "../../shared/clientes/services/clientes.service";
import {PedidoDeVenda} from "../../shared/pedido-de-venda/domain/pedido-de-venda";
import {PedidoDeVendaStatus} from "../../shared/pedido-de-venda/domain/pedido-de-venda-status";

@Component({templateUrl: './dashboard.component.html'})
export class DashboardComponent {
  pedidosQuantidade: number | undefined;
  pedidosFaturadosReceita: number | undefined;
  pedidosFaturados: PedidoDeVenda[] = [];

  clientesQuantidade: number | undefined;

  constructor(private pedidosService: PedidoDeVendaService,
              private clientesService: ClientesService) {

    pedidosService.getByPageRequest({page: 0, size: 1000})
      .subscribe(response => {
        this.pedidosFaturados = response.itens.filter(p => p.status === PedidoDeVendaStatus.FATURADO);
        this.pedidosQuantidade = response.totalElements;
        this.pedidosFaturadosReceita = this.pedidosFaturados.map(p => p.valorTotal).reduce((pv, cv) => pv + cv, 0);
      });

    clientesService.getByPageRequest({page: 0, size: 1000})
      .subscribe(response => {
        this.clientesQuantidade = response.totalElements;
      });
  }
}
