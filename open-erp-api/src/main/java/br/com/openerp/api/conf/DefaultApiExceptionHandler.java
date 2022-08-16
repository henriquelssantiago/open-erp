package br.com.openerp.api.conf;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.core.annotation.Order;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice
@Order
public class DefaultApiExceptionHandler {
    private final Logger logger = LoggerFactory.getLogger(DefaultApiExceptionHandler.class);

    @ResponseStatus(code = HttpStatus.BAD_REQUEST)
    @ExceptionHandler(Exception.class)
    public ApiExceptionDto handle(Exception e) {
        logger.error("Unmapped error", e);
        return new ApiExceptionDto(400, "Ocorreu um erro inesperado.");
    }
}
