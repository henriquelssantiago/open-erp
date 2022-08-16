import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ProdutosService} from "./services/produtos.service";

@NgModule({
  imports: [CommonModule],
  providers: [ProdutosService]
})
export class ProdutosModule {
}
