package br.com.openerp.api.conf;

import java.util.List;
import java.util.stream.Collectors;

public class ApiValidationDto {
    private final Integer code;
    private final String message;
    private final List<ApiValidationErrorDto> errors;

    public ApiValidationDto(List<ApiValidationErrorDto> errors) {
        this.code = 400;
        this.message = errors.stream()
                .map(e -> e.getField() + " " + e.getMessage())
                .collect(Collectors.joining(", "));
        this.errors = errors;
    }

    public Integer getCode() {
        return code;
    }

    public String getMessage() {
        return message;
    }

    public List<ApiValidationErrorDto> getErrors() {
        return errors;
    }
}
