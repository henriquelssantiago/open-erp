import { TestBed } from '@angular/core/testing';

import { PedidoDeVendaService } from './pedido-de-venda.service';

describe('PedidoDeVendaService', () => {
  let service: PedidoDeVendaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PedidoDeVendaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
