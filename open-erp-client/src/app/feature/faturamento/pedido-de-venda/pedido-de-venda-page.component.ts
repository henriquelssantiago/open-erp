import {Component, OnInit} from '@angular/core';
import {FormArray, FormBuilder, FormGroup, Validators} from '@angular/forms';

import {finalize, forkJoin} from 'rxjs';

import {LazyLoadEvent, MessageService} from 'primeng/api';

import {PedidoDeVenda} from '../../../shared/pedido-de-venda/domain/pedido-de-venda';
import {PedidoDeVendaService} from '../../../shared/pedido-de-venda/services/pedido-de-venda.service';
import {ClientesService} from '../../../shared/clientes/services/clientes.service';
import {Cliente} from '../../../shared/clientes/domain/cliente';
import {ProdutosService} from '../../../shared/produtos/services/produtos.service';
import {Produto} from '../../../shared/produtos/domain/produto';

import {ClienteTipoBusca} from './cliente-tipo-busca';
import {PedidoDeVendaForm} from "../../../shared/pedido-de-venda/domain/pedido-de-venda-form";
import {DateUtils} from "../../../shared/utils/date-utils";
import {PedidoDeVendaStatus} from "../../../shared/pedido-de-venda/domain/pedido-de-venda-status";
import {PageRequest} from "../../../shared/page-request";

@Component({
  templateUrl: './pedido-de-venda-page.component.html',
  styleUrls: ['./pedido-de-venda-page.component.scss']
})
export class PedidoDeVendaPageComponent implements OnInit {
  ClienteTipoBusca = ClienteTipoBusca;
  PedidoDeVendaStatus = PedidoDeVendaStatus;
  tabViewIndex = 0;
  isLoading = false;
  isLoadingPedidos = false;

  pedidos: PedidoDeVenda[] = [];
  pedidoSelecionado?: PedidoDeVenda;

  totalRecords = 0;
  rows = 10;

  form: FormGroup;
  clientes: Cliente[] = [];
  clientesFiltrados: Cliente[] = [];
  produtos: Produto[] = [];
  produtosFiltrados: Produto[] = [];

  showNovoItemDialog = false;
  novoItemForm?: FormGroup;

  constructor(private service: PedidoDeVendaService,
              private clientesService: ClientesService,
              private produtosService: ProdutosService,
              private messageService: MessageService,
              private fb: FormBuilder) {
    this.form = this.fb.group({
      clienteTipoBusca: this.fb.control(ClienteTipoBusca.CGC, Validators.required),
      dataDeEmissao: this.fb.control(new Date(), Validators.required),
      cliente: this.fb.control(null, Validators.required),
      itens: this.fb.array([], Validators.required),
    });
  }

  ngOnInit(): void {
    this.carregarPedidos();
  }

  iniciarVenda(): void {
    if (!this.clientes.length) {
      this.isLoading = true;
      forkJoin(
        this.clientesService.getByPageRequest({page: 0, size: 1000}),
        this.produtosService.getByPageRequest({page: 0, size: 1000})
      )
        .pipe(finalize(() => this.isLoading = false))
        .subscribe(response => {
          this.clientes = response[0].itens;
          this.produtos = response[1].itens;
          this.tabViewIndex = 1;
        });
    } else {
      this.tabViewIndex = 1;
    }
  }

  salvar(): void {
    if (this.form.invalid) {
      throw new Error('O formulário está inválido');
    }

    const form = this.form.getRawValue();

    const itens = form.itens.map((i: any) => ({
      quantidade: i.quantidade,
      produtoId: i.produto.id
    }));
    const novoPedido: PedidoDeVendaForm = {
      dataDeEmissao: DateUtils.formatDateToYYYYDashMMDashDD(form.dataDeEmissao),
      clienteId: form.cliente.id,
      itens: itens
    }

    this.isLoading = true;
    this.service.criar(novoPedido)
      .pipe(finalize(() => this.isLoading = false))
      .subscribe(
        pedido => {
          this.tabViewIndex = 0;
          this.pedidos.push(pedido);
          this.messageService.add({severity: 'success', summary: 'Sucesso', detail: 'Pedido criado!'});
        },
        error => {
          console.log(error);
          this.messageService.add({severity: 'error', summary: 'Erro', detail: error.error.message});
        }
      );
  }

  cancelarCadastro(): void {
    this.tabViewIndex = 0;
  }

  cancelarPedido(): void {
    if (this.pedidoSelecionado == null) {
      throw new Error('A venda selecionado não pode ser null');
    }

    this.isLoading = true;
    this.service.cancelar(this.pedidoSelecionado.id)
      .pipe(finalize(() => this.isLoading = false))
      .subscribe(
        () => {
          if (this.pedidoSelecionado != null) {
            this.pedidoSelecionado.status = PedidoDeVendaStatus.CANCELADO;
          }
          this.messageService.add({severity: 'success', summary: 'Sucesso', detail: 'Pedido cancelado!'});
        },
        error => {
          console.log(error);
          this.messageService.add({severity: 'error', summary: 'Erro', detail: error.error.message});
        }
      );
  }

  faturar(): void {
    if (this.pedidoSelecionado == null) {
      throw new Error('A venda selecionado não pode ser null');
    }

    this.isLoading = true;
    this.service.faturar(this.pedidoSelecionado.id)
      .pipe(finalize(() => this.isLoading = false))
      .subscribe(
        () => {
          if (this.pedidoSelecionado != null) {
            this.pedidoSelecionado.status = PedidoDeVendaStatus.FATURADO;
          }
          this.messageService.add({severity: 'success', summary: 'Sucesso', detail: 'Pedido faturado!'});
        },
        error => {
          console.log(error);
          this.messageService.add({severity: 'error', summary: 'Erro', detail: error.error.message});
        }
      );
  }

  filtrarClientes(query: string): void {
    const clienteTipoBusca = this.form.get('clienteTipoBusca')?.value as ClienteTipoBusca;

    this.clientesFiltrados = this.clientes
      .filter(
        cliente => (clienteTipoBusca === ClienteTipoBusca.NOME && cliente.nome.toLowerCase().indexOf(query.toLowerCase()) == 0)
          || (clienteTipoBusca === ClienteTipoBusca.CGC && cliente.cgc.toLowerCase().indexOf(query.toLowerCase()) == 0)
      );
  }

  filtrarProdutos(query: string): void {
    this.produtosFiltrados = this.produtos
      .filter(produto => produto.descricao.toLowerCase().indexOf(query.toLowerCase()) == 0);
  }

  novoItem(): void {
    this.showNovoItemDialog = true;
    this.novoItemForm = this.fb.group({
      quantidade: this.fb.control(1, [Validators.min(1), Validators.required]),
      produto: this.fb.control(null, Validators.required)
    });
  }

  adicionarItem(): void {
    (this.form.get('itens') as FormArray).push(this.novoItemForm);
    this.showNovoItemDialog = false;
  }

  cancelarNovoItem(): void {
    this.showNovoItemDialog = false;
    this.novoItemForm?.reset();
  }

  public carregarPedidos(event?: LazyLoadEvent): void {
    let pageRequest: PageRequest;
    if (event && event.first) {
      pageRequest = {page: event.first / this.rows, size: this.rows};
    } else {
      pageRequest = {page: 0, size: this.rows};
    }

    this.isLoadingPedidos = true;
    this.service.getByPageRequest(pageRequest)
      .pipe(finalize(() => this.isLoadingPedidos = false))
      .subscribe(
        {
          next: response => {
            this.totalRecords = response.totalElements;
            this.pedidos = response.itens;

            if (!this.totalRecords) {
              const detail = 'Ainda não foi lançado nenhum pedido, para começar, clique em Novo.';
              this.messageService.add({severity: 'info', summary: 'Dica', detail: detail});
            }
          },
          error: error => {
            console.log(error);
            this.messageService.add({severity: 'error', summary: 'Erro', detail: error.error.message});
          }
        });
  }
}
