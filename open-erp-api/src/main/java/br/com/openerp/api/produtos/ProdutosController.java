package br.com.openerp.api.produtos;

import br.com.openerp.api.conf.ApiException;
import br.com.openerp.api.shared.PageResponseDto;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

@RestController
@RequestMapping("/produtos")
public class ProdutosController {
    private final ProdutosRepository repository;

    public ProdutosController(ProdutosRepository repository) {
        this.repository = repository;
    }

    @GetMapping
    public PageResponseDto<ProdutoParaAListagemDto> getBy(@RequestParam(value = "page", required = false) Integer pageNumber,
                                                          @RequestParam(value = "size", required = false) Integer size) {
        pageNumber = pageNumber != null ? pageNumber : 1;
        size = size != null ? size : 10;
        Page<Produto> page = repository.findAll(PageRequest.of(pageNumber, size));
        List<ProdutoParaAListagemDto> produtos = ProdutoParaAListagemDto.of(page.toList());
        return new PageResponseDto<>(page.getTotalPages(), page.getSize(), page.getTotalElements(), produtos);
    }

    @GetMapping("/{id}")
    public ProdutoDto listarPor(@PathVariable("id") Integer id) {
        Produto produto = repository.findById(id)
                .orElseThrow(() -> new ApiException("Produto não encontrado"));
        return ProdutoDto.apartirDo(produto);
    }

    @PostMapping
    @Transactional
    public ProdutoParaAListagemDto criar(@Valid @RequestBody ProdutoForm form) {
        Produto produto = form.get(repository);
        produto = repository.save(produto);
        return ProdutoParaAListagemDto.of(produto);
    }

    @PutMapping("/{id}")
    @Transactional
    public ProdutoParaAListagemDto atualizar(@PathVariable("id") Integer id, @Valid @RequestBody ProdutoForm form) {
        Produto produto = form.get(repository);
        produto = repository.save(produto);
        return ProdutoParaAListagemDto.of(produto);
    }

    @DeleteMapping("/{id}")
    public void deletar(@PathVariable("id") Integer id) {
        Produto produto = repository.findById(id)
                .orElseThrow(() -> new ApiException("Produto não encontrado."));
        repository.delete(produto);
    }

    @PutMapping("{id}/alternar-bloqueio")
    @Transactional
    public void alternarBloqueio(@PathVariable("id") Integer id) {
        Produto produto = repository.findById(id)
                .orElseThrow(() -> new ApiException("Produto não encontrado."));
        produto.alternarBloqueio();
        repository.save(produto);
    }
}
