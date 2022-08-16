import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PedidoDeVendaPageComponent } from './pedido-de-venda-page.component';

describe('PedidoDeVendaComponent', () => {
  let component: PedidoDeVendaPageComponent;
  let fixture: ComponentFixture<PedidoDeVendaPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PedidoDeVendaPageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PedidoDeVendaPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
