import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ReactiveFormsModule} from '@angular/forms';

import {TabViewModule} from 'primeng/tabview';
import {ButtonModule} from 'primeng/button';
import {RippleModule} from 'primeng/ripple';
import {TableModule} from 'primeng/table';
import {ToolbarModule} from 'primeng/toolbar';
import {InputTextModule} from 'primeng/inputtext';
import {CalendarModule} from 'primeng/calendar';
import {RadioButtonModule} from 'primeng/radiobutton';
import {AutoCompleteModule} from 'primeng/autocomplete';
import {DialogModule} from 'primeng/dialog';

import {PedidoDeVendaPageComponent} from './pedido-de-venda-page.component';

import {ClientesModule} from '../../../shared/clientes/clientes.module';
import {ProdutosModule} from '../../../shared/produtos/produtos.module';
import {PedidoDeVendaModule} from '../../../shared/pedido-de-venda/pedido-de-venda.module';
import {BlockUIModule} from "primeng/blockui";
import {TooltipModule} from "primeng/tooltip";

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,

    TabViewModule,
    TableModule,
    ToolbarModule,
    ButtonModule,
    RippleModule,
    InputTextModule,
    CalendarModule,
    RadioButtonModule,
    AutoCompleteModule,
    DialogModule,
    BlockUIModule,

    PedidoDeVendaModule,
    ClientesModule,
    ProdutosModule,
    TooltipModule
  ],
  declarations: [PedidoDeVendaPageComponent]
})
export class PedidoDeVendaPageModule {
}
