package br.com.openerp.api.produtos;

public class ProdutoDto {
    private final Integer id;
    private final String descricao;
    private final String unidadeDeMedida;
    private final boolean bloqueado;

    public ProdutoDto(Produto produto) {
        id = produto.getId();
        descricao = produto.getDescricao();
        unidadeDeMedida = produto.getUnidadeDeMedida();
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

    public boolean isBloqueado() {
        return bloqueado;
    }

    public static ProdutoDto apartirDo(Produto produto) {
        return new ProdutoDto(produto);
    }
}
