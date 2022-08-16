package br.com.openerp.api.clientes;

import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import javax.persistence.*;
import java.time.LocalDateTime;

@Entity
public class Cliente {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    private String nome;
    private String nomeFantasia;
    private String cgc;
    private String rg;

    @Enumerated(EnumType.STRING)
    private ClientePessoaTipo tipoDePessoa;

    @CreationTimestamp
    private LocalDateTime createdAt;

    @UpdateTimestamp
    private LocalDateTime updatedAt;

    private boolean bloqueado;

    @Deprecated
    public Cliente() {
    }

    public Cliente(String nome, String cgc, ClientePessoaTipo tipoDePessoa) {
        this.nome = nome;
        this.cgc = cgc;
        this.tipoDePessoa = tipoDePessoa;
        this.bloqueado = false;
    }

    public Integer getId() {
        return id;
    }

    public String getNome() {
        return nome;
    }

    public void setNome(String nome) {
        this.nome = nome;
    }

    public String getCgc() {
        return cgc;
    }

    public void setCgc(String cgc) {
        if (cgc != null) {
            this.cgc = cgc.replaceAll("\\.", "")
                    .replaceAll("-", "")
                    .replaceAll("/", "");

        }
    }

    public String getRg() {
        return rg;
    }

    public void setRg(String rg) {
        if (rg != null) {
            this.rg = rg.replaceAll("\\.", "")
                    .replaceAll("-", "")
                    .replaceAll("/", "");

        }
    }

    public ClientePessoaTipo getTipoDePessoa() {
        return tipoDePessoa;
    }

    public void setTipoDePessoa(ClientePessoaTipo tipoDePessoa) {
        this.tipoDePessoa = tipoDePessoa;
    }

    public String getNomeFantasia() {
        return nomeFantasia;
    }

    public void setNomeFantasia(String nomeFantasia) {
        this.nomeFantasia = nomeFantasia;
    }

    public boolean isBloqueado() {
        return bloqueado;
    }

    public void alternarBloqueio() {
        this.bloqueado = !this.bloqueado;
    }
}
