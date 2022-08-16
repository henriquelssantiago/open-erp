package br.com.openerp.api;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class OpenERPApiController {
    @GetMapping
    public String get() {
        return "Server is up";
    }
}
