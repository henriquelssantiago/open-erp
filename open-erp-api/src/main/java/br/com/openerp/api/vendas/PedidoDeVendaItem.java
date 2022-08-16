package br.com.openerp.api.vendas;

import br.com.openerp.api.produtos.Produto;

import javax.persistence.*;
import java.math.BigDecimal;

@Entity
public class PedidoDeVendaItem {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    private Integer quantidade;
    private BigDecimal valorUnitario;
    private BigDecimal valorTotal;

    @ManyToOne(fetch = FetchType.LAZY)
    private Produto produto;

    @ManyToOne(fetch = FetchType.LAZY)
    private PedidoDeVenda pedido;

    @Deprecated
    public PedidoDeVendaItem() {
    }

    public PedidoDeVendaItem(Integer quantidade, BigDecimal valorUnitario, Produto produto) {
        this.quantidade = quantidade;
        this.valorUnitario = valorUnitario;
        this.produto = produto;
    }

    public void setVenda(PedidoDeVenda pedidoDeVenda) {
        this.pedido = pedidoDeVenda;
    }

    public BigDecimal getValorTotal() {
        return valorTotal;
    }

    public void calcularValorTotal() {
        this.valorTotal = this.valorUnitario.multiply(BigDecimal.valueOf(this.quantidade));
    }
}
