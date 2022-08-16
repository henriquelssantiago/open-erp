package br.com.openerp.api.produtos;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import java.math.BigDecimal;

@Entity
public class Produto {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    private String descricao;
    private String unidadeDeMedida;
    private BigDecimal preco;
    private boolean bloqueado;

    @Deprecated
    public Produto() {
    }

    public Produto(String descricao, String unidadeDeMedida, BigDecimal preco) {
        this.descricao = descricao;
        this.unidadeDeMedida = unidadeDeMedida;
        this.preco = preco;
        this.bloqueado = false;
    }

    public Integer getId() {
        return id;
    }

    public String getDescricao() {
        return descricao;
    }

    public void setDescricao(String descricao) {
        this.descricao = descricao;
    }

    public String getUnidadeDeMedida() {
        return unidadeDeMedida;
    }

    public void setUnidadeDeMedida(String unidadeDeMedida) {
        this.unidadeDeMedida = unidadeDeMedida;
    }

    public BigDecimal getPreco() {
        return preco;
    }

    public void setPreco(BigDecimal preco) {
        this.preco = preco;
    }

    public boolean isBloqueado() {
        return bloqueado;
    }

    public void alternarBloqueio() {
        this.bloqueado = !this.bloqueado;
    }
}
