import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";

import {Observable} from "rxjs";

import {environment} from "../../../../environments/environment";

import {PedidoDeVenda} from "../domain/pedido-de-venda";
import {PedidoDeVendaForm} from "../domain/pedido-de-venda-form";
import {PageRequest} from "../../page-request";
import {PageResponse} from "../../page-response";

const PEDIDO_DE_VENDA_PATH = `${environment.API_URL}/pedido-de-venda`;

@Injectable()
export class PedidoDeVendaService {

  constructor(private http: HttpClient) {
  }

  getByPageRequest(pageRequest: PageRequest): Observable<PageResponse<PedidoDeVenda>> {
    const params = new HttpParams()
      .append("page", pageRequest.page)
      .append("size", pageRequest.size);
    return this.http.get<PageResponse<PedidoDeVenda>>(PEDIDO_DE_VENDA_PATH, {params: params});
  }

  criar(form: PedidoDeVendaForm): Observable<PedidoDeVenda> {
    return this.http.post<PedidoDeVenda>(PEDIDO_DE_VENDA_PATH, form);
  }

  faturar(id: number): Observable<void> {
    return this.http.post<void>(`${PEDIDO_DE_VENDA_PATH}/${id}/faturar`, null);
  }

  cancelar(id: number): Observable<void> {
    return this.http.delete<void>(`${PEDIDO_DE_VENDA_PATH}/${id}`);
  }
}
