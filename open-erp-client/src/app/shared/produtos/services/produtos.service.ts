import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {Observable} from "rxjs";
import {Produto} from "../domain/produto";
import {environment} from "../../../../environments/environment";
import {PageResponse} from "../../page-response";
import {PageRequest} from "../../page-request";

const PRODUTOS_PATH = `${environment.API_URL}/produtos`;

@Injectable()
export class ProdutosService {

  constructor(private http: HttpClient) {
  }

  getByPageRequest(pageRequest: PageRequest): Observable<PageResponse<Produto>> {
    const params = new HttpParams()
      .append("page", pageRequest.page)
      .append("size", pageRequest.size);
    return this.http.get<PageResponse<Produto>>(PRODUTOS_PATH, {params: params});
  }

  criar(form: Produto): Observable<Produto> {
    return this.http.post<Produto>(PRODUTOS_PATH, form);
  }

  deletar(id: number): Observable<void> {
    return this.http.delete<void>(`${PRODUTOS_PATH}/${id}`);
  }
}
