import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {Observable} from "rxjs";
import {Cliente} from "../domain/cliente";
import {environment} from "../../../../environments/environment";
import {PageRequest} from "../../page-request";
import {PageResponse} from "../../page-response";

const CLIENTES_PATH = `${environment.API_URL}/clientes`;

@Injectable()
export class ClientesService {

  constructor(private http: HttpClient) {
  }

  getByPageRequest(pageRequest: PageRequest): Observable<PageResponse<Cliente>> {
    const params = new HttpParams()
      .append("page", pageRequest.page)
      .append("size", pageRequest.size);
    return this.http.get<PageResponse<Cliente>>(CLIENTES_PATH, {params: params});
  }

  criar(form: Cliente): Observable<Cliente> {
    return this.http.post<Cliente>(CLIENTES_PATH, form);
  }

  deletar(id: number): Observable<void> {
    return this.http.delete<void>(`${CLIENTES_PATH}/${id}`);
  }
}
