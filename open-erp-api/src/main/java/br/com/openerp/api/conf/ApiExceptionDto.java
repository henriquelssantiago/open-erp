package br.com.openerp.api.conf;

public class ApiExceptionDto {
    private final Integer code;
    private final String message;

    public ApiExceptionDto(Integer code, String message) {
        this.code = code;
        this.message = message;
    }

    public Integer getCode() {
        return code;
    }

    public String getMessage() {
        return message;
    }
}
