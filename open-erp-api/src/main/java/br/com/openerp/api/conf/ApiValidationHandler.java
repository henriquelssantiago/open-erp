package br.com.openerp.api.conf;

import org.springframework.core.Ordered;
import org.springframework.core.annotation.Order;
import org.springframework.http.HttpStatus;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import java.util.List;
import java.util.stream.Collectors;

@RestControllerAdvice
@Order(Ordered.HIGHEST_PRECEDENCE)
public class ApiValidationHandler {
    @ResponseStatus(HttpStatus.BAD_REQUEST)
    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ApiValidationDto handleValidationExceptions(MethodArgumentNotValidException ex) {
        List<ApiValidationErrorDto> errors = ex.getBindingResult()
                .getAllErrors()
                .stream()
                .map(e -> new ApiValidationErrorDto(((FieldError) e).getField(), e.getDefaultMessage()))
                .collect(Collectors.toList());
        return new ApiValidationDto(errors);
    }
}
