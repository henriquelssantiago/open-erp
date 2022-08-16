package br.com.openerp.api.clientes;

public class ClienteDto {
    private final Integer id;
    private final String nome;
    private final String cgc;
    private final ClientePessoaTipo tipoDePessoa;
    private final String rg;
    private final String nomeFantasia;
    private final boolean bloqueado;

    public ClienteDto(Cliente cliente) {
        this.id = cliente.getId();
        this.nome = cliente.getNome();
        this.cgc = cliente.getCgc();
        this.tipoDePessoa = cliente.getTipoDePessoa();
        this.rg = cliente.getRg();
        this.nomeFantasia = cliente.getNomeFantasia();
        bloqueado = cliente.isBloqueado();
    }

    public Integer getId() {
        return id;
    }

    public String getNome() {
        return nome;
    }

    public String getCgc() {
        return cgc;
    }

    public ClientePessoaTipo getTipoDePessoa() {
        return tipoDePessoa;
    }

    public String getRg() {
        return rg;
    }

    public String getNomeFantasia() {
        return nomeFantasia;
    }

    public boolean isBloqueado() {
        return bloqueado;
    }

    public static ClienteDto apartirDo(Cliente cliente) {
        return new ClienteDto(cliente);
    }
}
