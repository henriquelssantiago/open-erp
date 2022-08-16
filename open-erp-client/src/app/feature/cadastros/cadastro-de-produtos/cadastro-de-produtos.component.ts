import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ProdutosService} from "../../../shared/produtos/services/produtos.service";
import {Produto} from "../../../shared/produtos/domain/produto";
import {LazyLoadEvent} from "primeng/api";
import {PageRequest} from "../../../shared/page-request";
import {finalize} from "rxjs";

@Component({
  templateUrl: './cadastro-de-produtos.component.html',
  styleUrls: ['./cadastro-de-produtos.component.scss']
})
export class CadastroDeProdutosComponent implements OnInit {
  tabViewIndex = 0;

  produtos: Produto[] = [];
  produtoSelecionado: Produto | undefined;

  totalRecords = 0;
  rows = 10;

  form: FormGroup;

  isLoading = false;

  constructor(private service: ProdutosService,
              private fb: FormBuilder) {
    this.form = this.fb.group({
      descricao: this.fb.control(null, Validators.required),
      unidadeDeMedida: this.fb.control(null, Validators.required),
      preco: this.fb.control(null, Validators.required)
    });
  }

  ngOnInit(): void {
    this.carregarProdutos();
  }

  iniciarCadastro(): void {
    this.tabViewIndex = 1;
  }

  salvar(): void {
    const form = this.form.getRawValue();

    const novoProduto = {
      descricao: form.descricao,
      unidadeDeMedida: form.unidadeDeMedida,
      preco: form.preco
    }

    this.service.criar(form)
      .subscribe();
  }

  cancelar(): void {
    this.tabViewIndex = 0;

  }

  deletar() {
    if (this.produtoSelecionado == null || this.produtoSelecionado.id == null) {
      throw new Error("O produto selecionado não pode ser null");
    }
    this.service.deletar(this.produtoSelecionado.id)
      .subscribe();
  }

  carregarProdutos(event?: LazyLoadEvent): void {
    let pageRequest: PageRequest;
    if (event && event.first) {
      pageRequest = {page: event.first / this.rows, size: this.rows};
    } else {
      pageRequest = {page: 0, size: this.rows};
    }
    this.isLoading = true
    this.service.getByPageRequest(pageRequest)
      .pipe(finalize(() => this.isLoading = false))
      .subscribe(response => {
        this.totalRecords = response.totalElements;
        this.produtos = response.itens;
      });
  }
}
