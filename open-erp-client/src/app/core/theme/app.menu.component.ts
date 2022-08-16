import {Component, OnInit} from '@angular/core';
import {LayoutService} from "./service/app.layout.service";

@Component({
  selector: 'app-menu',
  templateUrl: './app.menu.component.html'
})
export class AppMenuComponent implements OnInit {

  model: any[] = [];

  constructor(public layoutService: LayoutService) {
  }

  ngOnInit() {
    this.model = [
      {label: 'Home', items: [{label: 'Dashboard', icon: 'pi pi-fw pi-home', routerLink: ['/']}]},
      {
        label: 'Cadastros',
        items: [
          {label: 'Clientes', icon:'pi pi-users',routerLink: ['/cadastros/cadastro-de-clientes']},
          {label: 'Produtos', icon:'pi pi-box', routerLink: ['/cadastros/cadastro-de-produtos']}
        ]
      },
      {
        label: 'Faturamento',
        items: [
          {label: 'Pedido de venda', icon: 'pi pi-shopping-cart' , routerLink: ['/faturamento/pedido-de-venda']}
        ]
      }
    ];
  }
}
