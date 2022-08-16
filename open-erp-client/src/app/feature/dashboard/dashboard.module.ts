import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';

import {ChartModule} from 'primeng/chart';
import {MenuModule} from 'primeng/menu';
import {TableModule} from 'primeng/table';
import {ButtonModule} from 'primeng/button';
import {StyleClassModule} from 'primeng/styleclass';
import {PanelMenuModule} from 'primeng/panelmenu';

import {DashboardComponent} from './dashboard.component';
import {DashboardsRoutingModule} from './dashboard-routing.module';
import {ClientesModule} from "../../shared/clientes/clientes.module";
import {PedidoDeVendaModule} from "../../shared/pedido-de-venda/pedido-de-venda.module";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,

    DashboardsRoutingModule,

    ChartModule,
    TableModule,
    StyleClassModule,
    PanelMenuModule,
    ButtonModule,
    MenuModule,

    ClientesModule,
    PedidoDeVendaModule
  ],
  declarations: [DashboardComponent]
})
export class DashboardModule {
}
