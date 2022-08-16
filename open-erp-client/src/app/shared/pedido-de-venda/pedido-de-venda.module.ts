import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {PedidoDeVendaService} from "./services/pedido-de-venda.service";

@NgModule({
  imports: [CommonModule],
  providers: [PedidoDeVendaService]
})
export class PedidoDeVendaModule {
}
