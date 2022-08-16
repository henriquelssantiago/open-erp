package br.com.openerp.api.vendas;

import br.com.openerp.api.clientes.Cliente;
import br.com.openerp.api.clientes.ClientesRepository;
import br.com.openerp.api.conf.ApiException;
import br.com.openerp.api.produtos.ProdutosRepository;
import com.fasterxml.jackson.annotation.JsonFormat;

import javax.validation.Valid;
import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;
import java.time.LocalDate;
import java.util.List;
import java.util.stream.Collectors;

public class PedidoDeVendaForm {
    @NotNull
    @JsonFormat(pattern="yyyy-MM-dd")
    private LocalDate dataDeEmissao;

    @NotNull
    private Integer clienteId;

    @Valid
    @NotEmpty
    private List<PedidoDeVendaItemForm> itens;

    public void setDataDeEmissao(LocalDate dataDeEmissao) {
        this.dataDeEmissao = dataDeEmissao;
    }

    public void setClienteId(Integer clienteId) {
        this.clienteId = clienteId;
    }

    public List<PedidoDeVendaItemForm> getItens() {
        return itens;
    }

    public void setItens(List<PedidoDeVendaItemForm> itens) {
        this.itens = itens;
    }

    public PedidoDeVenda get(ClientesRepository clientesRepository, ProdutosRepository produtosRepository) {
        Cliente cliente = clientesRepository.findById(clienteId)
                .orElseThrow(() -> new ApiException("Cliente não encontrado"));
        List<PedidoDeVendaItem> itens = this.itens.stream()
                .map(item -> item.get(produtosRepository))
                .collect(Collectors.toList());
        return new PedidoDeVenda(dataDeEmissao, cliente, itens);
    }
}
