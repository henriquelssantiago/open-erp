import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';

import {PedidoDeVendaPageComponent} from "./pedido-de-venda/pedido-de-venda-page.component";

@NgModule({
  imports: [RouterModule.forChild([
    {path: 'pedido-de-venda', component: PedidoDeVendaPageComponent},
  ])],
  exports: [RouterModule]
})
export class FaturamentoRoutingModule {
}
