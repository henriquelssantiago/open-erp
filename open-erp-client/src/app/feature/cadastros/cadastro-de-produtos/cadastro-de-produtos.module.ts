import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ReactiveFormsModule} from '@angular/forms';

import {TabViewModule} from 'primeng/tabview';
import {TableModule} from 'primeng/table';
import {ButtonModule} from 'primeng/button';
import {RippleModule} from 'primeng/ripple';
import {ToolbarModule} from 'primeng/toolbar';
import {InputTextModule} from 'primeng/inputtext';

import {CadastroDeProdutosComponent} from './cadastro-de-produtos.component';
import {ProdutosModule} from "../../../shared/produtos/produtos.module";
import {CurrencyMaskModule} from "ng2-currency-mask";

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,

    TabViewModule,
    TableModule,
    ButtonModule,
    RippleModule,
    ToolbarModule,
    InputTextModule,

    ProdutosModule,
    CurrencyMaskModule
  ],
  declarations: [CadastroDeProdutosComponent]
})
export class CadastroDeProdutosModule {
}
