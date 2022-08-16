package br.com.openerp.api.conf;

import org.springframework.core.Ordered;
import org.springframework.core.annotation.Order;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice
@Order(Ordered.HIGHEST_PRECEDENCE)
public class ApiExceptionHandler {
    @ExceptionHandler(ApiException.class)
    public ResponseEntity<ApiExceptionDto> handle(ApiException e) {
        return ResponseEntity
                .status(e.getCode())
                .body(new ApiExceptionDto(e.getCode(), e.getMessage()));
    }
}
