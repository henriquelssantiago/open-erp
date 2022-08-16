package br.com.openerp.api.conf;

public class ApiValidationErrorDto {
    private final String field;
    private final String message;

    public ApiValidationErrorDto(String field, String message) {
        this.field = field;
        this.message = message;
    }

    public String getField() {
        return field;
    }

    public String getMessage() {
        return message;
    }
}
