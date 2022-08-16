import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ClientesService} from "./services/clientes.service";

@NgModule({
  imports: [CommonModule],
  providers: [ClientesService]
})
export class ClientesModule {
}
