package br.com.openerp.api;

import java.util.Map;
import java.util.HashMap;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class OpenERPApiController {
    @GetMapping
    public Map<String, String> get() {
        Map<String, String> response = new HashMap<>();
        response.put("status", "ok");
        response.put("message", "Macho vei, finalmente!! kkk");
        return response;
    }
}
