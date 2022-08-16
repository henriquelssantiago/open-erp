import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

import {ClientesService} from "../../../shared/clientes/services/clientes.service";
import {Cliente} from "../../../shared/clientes/domain/cliente";
import {ClientePessoaTipo} from "../../../shared/clientes/domain/cliente-pessoa-tipo";
import {PageRequest} from "../../../shared/page-request";
import {finalize} from "rxjs";
import {LazyLoadEvent} from "primeng/api";

@Component({
  templateUrl: './cadastro-de-clientes.component.html',
  styleUrls: ['./cadastro-de-clientes.component.scss']
})
export class CadastroDeClientesComponent implements OnInit {
  ClientePessoaTipo = ClientePessoaTipo;

  tabViewIndex = 0;

  clientes: Cliente[] = [];
  clienteSelecionado: Cliente | undefined;

  totalRecords = 0;
  rows = 10;

  form: FormGroup;

  isLoading = false;

  constructor(private service: ClientesService,
              private fb: FormBuilder) {
    this.form = this.fb.group({
      nome: this.fb.control(null, Validators.required),
      nomeFantasia: this.fb.control(null),
      tipoDePessoa: this.fb.control(ClientePessoaTipo.FISICA, Validators.required),
      cgc: this.fb.control(null, Validators.required),
      rg: this.fb.control(null),
    });
  }

  ngOnInit(): void {
    this.carregarClientes();
  }

  iniciarCadastro(): void {
    this.tabViewIndex = 1;
  }

  onChangeTipoDePessoa(): void {
    const form = this.form.getRawValue();
    if (form.tipoDePessoa === ClientePessoaTipo.FISICA) {
      this.form.get('rg')?.addValidators(Validators.required);
    } else {
      this.form.get('rg')?.clearValidators();
    }
  }

  salvar(): void {
    const form = this.form.getRawValue();
    this.service.criar(form)
      .subscribe();
  }

  cancelar(): void {
    this.tabViewIndex = 0;

  }

  deletar() {
    if (this.clienteSelecionado == null) {
      throw new Error("O cliente selecionado não pode ser null");
    }
    this.service.deletar(this.clienteSelecionado.id)
      .subscribe();
  }

  carregarClientes(event?: LazyLoadEvent): void {
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
        this.clientes = response.itens;
      });
  }
}
