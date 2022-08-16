package br.com.openerp.api.produtos;

import br.com.openerp.api.conf.ApiException;

import java.math.BigDecimal;

public class ProdutoForm {
    private Integer id;
    private String descricao;
    private String unidadeDeMedida;
    private BigDecimal preco;

    public void setId(Integer id) {
        this.id = id;
    }

    public void setDescricao(String descricao) {
        this.descricao = descricao;
    }

    public void setUnidadeDeMedida(String unidadeDeMedida) {
        this.unidadeDeMedida = unidadeDeMedida;
    }

    public void setPreco(BigDecimal preco) {
        this.preco = preco;
    }

    public Produto get(ProdutosRepository repository) {
        Produto produto;
        if (id != null) {
            produto = repository.findById(id)
                    .orElseThrow(() -> new ApiException("Produto não encontrado."));
        } else {
            produto = new Produto(descricao, unidadeDeMedida, preco);
        }

        produto.setDescricao(descricao);
        produto.setUnidadeDeMedida(unidadeDeMedida);
        produto.setPreco(preco);

        return produto;
    }
}
