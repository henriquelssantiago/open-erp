import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ReactiveFormsModule} from '@angular/forms';

import {TableModule} from 'primeng/table';
import {ToolbarModule} from 'primeng/toolbar';
import {ButtonModule} from 'primeng/button';
import {RippleModule} from 'primeng/ripple';
import {TabViewModule} from 'primeng/tabview';
import {InputTextModule} from 'primeng/inputtext';
import {RadioButtonModule} from 'primeng/radiobutton';
import {InputMaskModule} from 'primeng/inputmask';

import {CadastroDeClientesComponent} from './cadastro-de-clientes.component';
import {ClientesService} from '../../../shared/clientes/services/clientes.service';
import {ClientesModule} from "../../../shared/clientes/clientes.module";

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
    RadioButtonModule,
    InputMaskModule,

    ClientesModule,
  ],
  declarations: [CadastroDeClientesComponent]
})
export class CadastroDeClientesModule {
}
