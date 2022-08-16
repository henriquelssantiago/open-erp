package br.com.openerp.api.vendas;

import br.com.openerp.api.conf.ApiException;
import br.com.openerp.api.produtos.Produto;
import br.com.openerp.api.produtos.ProdutosRepository;

import javax.validation.constraints.Min;
import javax.validation.constraints.NotNull;

public class PedidoDeVendaItemForm {
    @Min(1)
    private Integer quantidade;

    @NotNull
    private Integer produtoId;

    public Integer getQuantidade() {
        return quantidade;
    }

    public Integer getProdutoId() {
        return produtoId;
    }

    public void setQuantidade(Integer quantidade) {
        this.quantidade = quantidade;
    }


    public void setProdutoId(Integer produtoId) {
        this.produtoId = produtoId;
    }

    public PedidoDeVendaItem get(ProdutosRepository produtosRepository) {
        Produto produto = produtosRepository.findById(this.produtoId)
                .orElseThrow(() -> new ApiException("Produto não encontrado"));

        return new PedidoDeVendaItem(quantidade, produto.getPreco(), produto);
    }
}
