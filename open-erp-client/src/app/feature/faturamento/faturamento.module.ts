import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {FaturamentoRoutingModule} from "./faturamento-routing.module";

import {PedidoDeVendaPageModule} from "./pedido-de-venda/pedido-de-venda-page.module";

@NgModule({
  imports: [
    CommonModule,

    FaturamentoRoutingModule,

    PedidoDeVendaPageModule
  ]
})
export class FaturamentoModule {
}
