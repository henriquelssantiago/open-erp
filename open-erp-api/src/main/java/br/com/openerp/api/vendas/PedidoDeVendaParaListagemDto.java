package br.com.openerp.api.vendas;

import com.fasterxml.jackson.annotation.JsonFormat;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.List;
import java.util.stream.Collectors;

public class PedidoDeVendaParaListagemDto {
    private final Integer id;

    @JsonFormat(pattern="yyyy-MM-dd")
    private final LocalDate dataDeEmissao;

    private final PedidoDeVendaStatus status;
    private final Integer clienteId;
    private final String clienteNome;
    private final BigDecimal valorTotal;

    public PedidoDeVendaParaListagemDto(PedidoDeVenda pedido) {
        id = pedido.getId();
        dataDeEmissao = pedido.getDataDeEmissao();
        status = pedido.getStatus();
        clienteId = pedido.getClienteId();
        clienteNome = pedido.getClienteNome();
        valorTotal = pedido.getValorTotal();
    }

    public Integer getId() {
        return id;
    }

    public PedidoDeVendaStatus getStatus() {
        return status;
    }

    public LocalDate getDataDeEmissao() {
        return dataDeEmissao;
    }

    public Integer getClienteId() {
        return clienteId;
    }

    public String getClienteNome() {
        return clienteNome;
    }

    public BigDecimal getValorTotal() {
        return valorTotal;
    }

    public static PedidoDeVendaParaListagemDto of(PedidoDeVenda pedido) {
        return new PedidoDeVendaParaListagemDto(pedido);
    }

    public static List<PedidoDeVendaParaListagemDto> of(List<PedidoDeVenda> pedidos) {
        return pedidos
                .stream()
                .map(PedidoDeVendaParaListagemDto::of)
                .collect(Collectors.toList());
    }
}
