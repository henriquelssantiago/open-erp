import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';

import {CadastroDeClientesComponent} from "./cadastro-de-clientes/cadastro-de-clientes.component";
import {CadastroDeProdutosComponent} from "./cadastro-de-produtos/cadastro-de-produtos.component";

@NgModule({
  imports: [RouterModule.forChild([
    {path: 'cadastro-de-clientes', component: CadastroDeClientesComponent},
    {path: 'cadastro-de-produtos', component: CadastroDeProdutosComponent},
  ])],
  exports: [RouterModule]
})
export class CadastrosRoutingModule {
}
