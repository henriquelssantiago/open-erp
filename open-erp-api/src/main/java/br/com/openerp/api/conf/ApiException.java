package br.com.openerp.api.conf;

public class ApiException extends RuntimeException {
    private final Integer code;
    private final String message;

    public ApiException(String message) {
        this.code = 400;
        this.message = message;
    }

    public ApiException(String error, String message) {
        this.code = 400;
        this.message = message;
    }

    public Integer getCode() {
        return code;
    }

    @Override
    public String getMessage() {
        return message;
    }
}
