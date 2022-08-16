import {ClientePessoaTipo} from "./cliente-pessoa-tipo";

export interface Cliente {
  id: number;
  nome: string;
  nomeFantasia: string;
  cgc: string;
  rg: string;
  tipoDePessoa: ClientePessoaTipo;
  bloqueado: boolean;
}
