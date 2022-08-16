package br.com.openerp.api.produtos;

import java.math.BigDecimal;
import java.util.List;
import java.util.stream.Collectors;

public class ProdutoParaAListagemDto {
    private final Integer id;
    private final String descricao;
    private final String unidadeDeMedida;
    private final boolean bloqueado;
    private final BigDecimal preco;

    public ProdutoParaAListagemDto(Produto produto) {
        id = produto.getId();
        unidadeDeMedida = produto.getUnidadeDeMedida();
        descricao = produto.getDescricao();
        preco = produto.getPreco();
        bloqueado = produto.isBloqueado();
    }

    public Integer getId() {
        return id;
    }

    public String getDescricao() {
        return descricao;
    }

    public String getUnidadeDeMedida() {
        return unidadeDeMedida;
    }

    public BigDecimal getPreco() {
        return preco;
    }

    public boolean isBloqueado() {
        return bloqueado;
    }

    public static List<ProdutoParaAListagemDto> of(List<Produto> produtos) {
        return produtos
                .stream()
                .map(ProdutoParaAListagemDto::of)
                .collect(Collectors.toList());
    }

    public static ProdutoParaAListagemDto of(Produto produto) {
        return new ProdutoParaAListagemDto(produto);
    }
}