package br.com.openerp.api.vendas;

import br.com.openerp.api.clientes.Cliente;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import javax.persistence.*;
import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

@Entity
public class PedidoDeVenda {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    private LocalDate dataDeEmissao;

    @Enumerated(EnumType.STRING)
    private PedidoDeVendaStatus status;

    private LocalDateTime horarioDeCancelamento;
    private LocalDateTime horarioDeFaturamento;

    private BigDecimal valorTotal;

    @CreationTimestamp
    private LocalDateTime createdAt;

    @UpdateTimestamp
    private LocalDateTime updatedAt;

    @ManyToOne(fetch = FetchType.LAZY)
    private Cliente cliente;

    @OneToMany(mappedBy = "pedido", cascade = CascadeType.PERSIST)
    private List<PedidoDeVendaItem> itens;

    @Deprecated
    public PedidoDeVenda() {
    }

    public PedidoDeVenda(LocalDate dataDeEmissao, Cliente cliente, List<PedidoDeVendaItem> itens) {
        this.dataDeEmissao = dataDeEmissao;
        this.status = PedidoDeVendaStatus.CRIADO;
        this.cliente = cliente;
        this.itens = itens;
        this.itens.forEach(i -> i.setVenda(this));
        this.calcularValorTotal();
    }

    public Integer getId() {
        return id;
    }

    public LocalDate getDataDeEmissao() {
        return dataDeEmissao;
    }

    public PedidoDeVendaStatus getStatus() {
        return status;
    }

    public BigDecimal getValorTotal() {
        return valorTotal;
    }

    public Integer getClienteId() {
        return cliente.getId();
    }

    public String getClienteNome() {
        return cliente.getNome();
    }

    private void calcularValorTotal() {
        this.itens.forEach(PedidoDeVendaItem::calcularValorTotal);
        this.valorTotal = this.itens.stream()
                .map(PedidoDeVendaItem::getValorTotal)
                .reduce(BigDecimal.ZERO, BigDecimal::add);
    }

    public void faturar() {
        this.status = PedidoDeVendaStatus.FATURADO;
        this.horarioDeFaturamento = LocalDateTime.now();
    }

    public void cancelar() {
        this.status = PedidoDeVendaStatus.CANCELADO;
        this.horarioDeCancelamento = LocalDateTime.now();
    }
}
