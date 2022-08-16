package br.com.openerp.api.clientes;

import br.com.openerp.api.conf.ApiException;
import br.com.openerp.api.shared.PageResponseDto;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

@RestController
@RequestMapping("/clientes")
public class ClientesController {
    private final ClientesRepository repository;

    public ClientesController(ClientesRepository repository) {
        this.repository = repository;
    }

    @GetMapping
    public PageResponseDto<ClienteParaListagemDto> getBy(@RequestParam(value = "page", required = false) Integer pageNumber,
                                                         @RequestParam(value = "size", required = false) Integer size) {
        pageNumber = pageNumber != null ? pageNumber : 1;
        size = size != null ? size : 10;
        Page<Cliente> page = repository.findAll(PageRequest.of(pageNumber, size));
        List<ClienteParaListagemDto> clientes = ClienteParaListagemDto.of(page.toList());
        return new PageResponseDto<>(page.getTotalPages(), page.getSize(), page.getTotalElements(), clientes);
    }

    @GetMapping("/{id}")
    public ClienteDto getBy(@PathVariable("id") Integer id) {
        Cliente cliente = repository.findById(id)
                .orElseThrow(() -> new RuntimeException("Cliente não encontrado."));

        return ClienteDto.apartirDo(cliente);

    }

    @PostMapping
    @Transactional
    public ClienteParaListagemDto salvar(@Valid @RequestBody ClienteForm form) {
        Cliente cliente = form.get(repository);
        Cliente clienteSalvo = repository.save(cliente);
        return ClienteParaListagemDto.of(clienteSalvo);
    }

    @PutMapping("/{id}")
    @Transactional
    public ClienteParaListagemDto atualizar(@PathVariable("id") Integer id, @Valid @RequestBody ClienteForm form) {
        Cliente cliente = form.get(repository);
        Cliente clienteSalvo = repository.save(cliente);
        return ClienteParaListagemDto.of(clienteSalvo);
    }

    @DeleteMapping("/{id}")
    public void deletar(@PathVariable("id") Integer id) {
        Cliente cliente = repository.findById(id)
                .orElseThrow(() -> new ApiException("Cliente não encontrado."));
        repository.delete(cliente);
    }

    @PutMapping("{id}/alternar-bloqueio")
    @Transactional
    public void alternarBloqueio(@PathVariable("id") Integer id) {
        Cliente cliente = repository.findById(id)
                .orElseThrow(() -> new ApiException("Cliente não encontrado."));
        cliente.alternarBloqueio();
        repository.save(cliente);
    }
}
