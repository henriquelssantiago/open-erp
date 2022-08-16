package br.com.openerp.api.clientes;

import java.util.List;
import java.util.stream.Collectors;

public class ClienteParaListagemDto {
    private final Integer id;
    private final String nome;
    private final String cgc;
    private final String nomeFantasia;
    private final Boolean bloqueado;
    private final ClientePessoaTipo tipoDePessoa;

    public ClienteParaListagemDto(Cliente cliente) {
        this.id = cliente.getId();
        this.nome = cliente.getNome();
        tipoDePessoa = cliente.getTipoDePessoa();
        this.cgc = cliente.getCgc();
        this.nomeFantasia = cliente.getNomeFantasia();
        this.bloqueado = cliente.isBloqueado();
    }

    public Integer getId() {
        return id;
    }

    public String getNome() {
        return nome;
    }

    public ClientePessoaTipo getTipoDePessoa() {
        return tipoDePessoa;
    }

    public String getCgc() {
        return cgc;
    }

    public String getNomeFantasia() {
        return nomeFantasia;
    }

    public Boolean getBloqueado() {
        return bloqueado;
    }

    public static List<ClienteParaListagemDto> of(List<Cliente> clientes) {
        return clientes
                .stream()
                .map(ClienteParaListagemDto::new)
                .collect(Collectors.toList());
    }

    public static ClienteParaListagemDto of(Cliente cliente) {
        return new ClienteParaListagemDto(cliente);
    }
}
