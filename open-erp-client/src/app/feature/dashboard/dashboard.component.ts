import {Component} from '@angular/core';
import {LayoutService} from "../../core/theme/service/app.layout.service";
import {PedidoDeVendaService} from "../../shared/pedido-de-venda/services/pedido-de-venda.service";
import {ClientesService} from "../../shared/clientes/services/clientes.service";
import {PedidoDeVenda} from "../../shared/pedido-de-venda/domain/pedido-de-venda";

@Component({templateUrl: './dashboard.component.html'})
export class DashboardComponent {
  pedidosQuantidade: number | undefined;
  pedidosReceita: number | undefined;
  pedidos: PedidoDeVenda[] = [];

  clientesQuantidade: number | undefined;

  constructor(private pedidosService: PedidoDeVendaService,
              private clientesService: ClientesService,
              public layoutService: LayoutService) {

    pedidosService.getByPageRequest({page: 0, size: 10})
      .subscribe(response => {
        this.pedidos = response.itens;
        this.pedidosQuantidade = response.totalElements;
        this.pedidosReceita = this.pedidos.map(p => p.valorTotal).reduce((pv, cv) => pv + cv, 0);
      });

    clientesService.getByPageRequest({page: 0, size: 10})
      .subscribe(response => {
        this.clientesQuantidade = response.totalElements;
      });
  }
}
