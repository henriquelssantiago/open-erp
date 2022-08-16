import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {CadastrosRoutingModule} from "./cadastros-routing.module";

import {CadastroDeClientesModule} from "./cadastro-de-clientes/cadastro-de-clientes.module";
import {CadastroDeProdutosModule} from "./cadastro-de-produtos/cadastro-de-produtos.module";


@NgModule({
  imports: [
    CommonModule,

    CadastrosRoutingModule,

    CadastroDeClientesModule,
    CadastroDeProdutosModule
  ]
})
export class CadastrosModule {
}
