package br.com.openerp.api.clientes;

import br.com.openerp.api.conf.ApiException;

public class ClienteForm {
    private Integer id;
    private String nome;
    private String cgc;
    private ClientePessoaTipo tipoDePessoa;
    private String rg;
    private String nomeFantasia;

    public void setId(Integer id) {
        this.id = id;
    }

    public void setNome(String nome) {
        this.nome = nome;
    }

    public void setCgc(String cgc) {
        this.cgc = cgc;
    }

    public void setTipoDePessoa(ClientePessoaTipo tipoDePessoa) {
        this.tipoDePessoa = tipoDePessoa;
    }

    public void setRg(String rg) {
        this.rg = rg;
    }

    public void setNomeFantasia(String nomeFantasia) {
        this.nomeFantasia = nomeFantasia;
    }

    public Cliente get(ClientesRepository repository) {
        Cliente cliente;

        if (id == null) {
            cliente = new Cliente(this.nome, this.cgc, this.tipoDePessoa);
        } else {
            cliente = repository.findById(id).orElseThrow(() -> new ApiException("Cliente não encontrado."));
        }

        cliente.setRg(this.rg);
        cliente.setNomeFantasia(this.nomeFantasia);

        if (tipoDePessoa.equals(ClientePessoaTipo.FISICA)) {
            this.nomeFantasia = null;
        } else if (tipoDePessoa.equals(ClientePessoaTipo.JURIDICA)) {
            this.rg = null;
        }

        return cliente;
    }
}
