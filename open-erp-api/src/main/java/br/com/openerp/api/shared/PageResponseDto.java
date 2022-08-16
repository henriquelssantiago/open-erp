package br.com.openerp.api.shared;

import java.util.List;

public class PageResponseDto<E> {
    private final int totalPages;
    private final int size;
    private final long totalElements;
    private final List<E> itens;

    public PageResponseDto(int totalPages, int size, long totalElements, List<E> itens) {
        this.totalPages = totalPages;
        this.size = size;
        this.totalElements = totalElements;
        this.itens = itens;
    }

    public int getTotalPages() {
        return totalPages;
    }

    public int getSize() {
        return size;
    }

    public long getTotalElements() {
        return totalElements;
    }

    public List<E> getItens() {
        return itens;
    }
}
