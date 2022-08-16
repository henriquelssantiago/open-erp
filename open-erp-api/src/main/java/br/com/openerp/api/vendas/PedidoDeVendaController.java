package br.com.openerp.api.vendas;

import br.com.openerp.api.clientes.ClientesRepository;
import br.com.openerp.api.conf.ApiException;
import br.com.openerp.api.produtos.ProdutosRepository;
import br.com.openerp.api.shared.PageResponseDto;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

@RestController
@RequestMapping("/pedido-de-venda")
public class PedidoDeVendaController {
    private final PedidoDeVendaRepository repository;
    private final ClientesRepository clientesRepository;
    private final ProdutosRepository produtosRepository;

    public PedidoDeVendaController(PedidoDeVendaRepository repository,
                                   ClientesRepository clientesRepository,
                                   ProdutosRepository produtosRepository) {
        this.repository = repository;
        this.clientesRepository = clientesRepository;
        this.produtosRepository = produtosRepository;
    }

    @GetMapping
    public PageResponseDto<PedidoDeVendaParaListagemDto> getBy(@RequestParam(value = "page", required = false) Integer pageNumber,
                                                               @RequestParam(value = "size", required = false) Integer size) {
        pageNumber = pageNumber != null ? pageNumber : 1;
        size = size != null ? size : 10;
        Page<PedidoDeVenda> page = repository.findAll(PageRequest.of(pageNumber, size));
        List<PedidoDeVendaParaListagemDto> pedidos = PedidoDeVendaParaListagemDto.of(page.toList());
        return new PageResponseDto<>(page.getTotalPages(), page.getSize(), page.getTotalElements(), pedidos);
    }

    @PostMapping
    @Transactional
    public PedidoDeVendaParaListagemDto criar(@Valid @RequestBody PedidoDeVendaForm form) {
        PedidoDeVenda novoPedido = repository.save(form.get(clientesRepository, produtosRepository));
        return PedidoDeVendaParaListagemDto.of(novoPedido);
    }

    @PostMapping("{id}/faturar")
    @Transactional
    public void faturar(@PathVariable("id") Integer id) {
        PedidoDeVenda pedido = this.repository.findById(id)
                .orElseThrow(() -> new ApiException("Pedido não encontrado."));

        if (pedido.getStatus().equals(PedidoDeVendaStatus.CANCELADO)) {
            throw new ApiException("Não foi possível faturar o pedido, pois o mesmo já se encontra cancelado.");
        }

        if (pedido.getStatus().equals(PedidoDeVendaStatus.FATURADO)) {
            throw new ApiException("Não foi possível cancelar o pedido, pois o mesmo já se encontra faturado.");
        }

        pedido.faturar();
        this.repository.save(pedido);
    }

    @DeleteMapping("{id}")
    @Transactional
    public void cancelar(@PathVariable("id") Integer id) {
        PedidoDeVenda pedido = this.repository.findById(id)
                .orElseThrow(() -> new ApiException("Pedido não encontrado."));

        if (pedido.getStatus().equals(PedidoDeVendaStatus.CANCELADO)) {
            throw new ApiException("Não foi possível cancelar o pedido, pois o mesmo já se encontra cancelado.");
        }

        if (pedido.getStatus().equals(PedidoDeVendaStatus.FATURADO)) {
            throw new ApiException("Não foi possível cancelar o pedido, pois o mesmo já se encontra faturado.");
        }

        pedido.cancelar();
        this.repository.save(pedido);
    }
}
