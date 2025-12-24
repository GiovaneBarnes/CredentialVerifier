package com.giovanebarnes.backend.controller;

import com.giovanebarnes.backend.model.Credential;
import com.giovanebarnes.backend.service.CredentialService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/credentials")
public class CredentialController {

    private final CredentialService credentialService;

    public CredentialController(CredentialService credentialService) {
        this.credentialService = credentialService;
    }

    @PostMapping
    public ResponseEntity<String> issueCredential(@RequestBody Credential credential) {
        try {
            String txHash = credentialService.issueCredential(credential);
            return ResponseEntity.ok(txHash);
        } catch (Exception e) {
            return ResponseEntity.internalServerError().body("Error issuing credential: " + e.getMessage());
        }
    }

    @GetMapping("/{idHash}")
    public ResponseEntity<Credential> getCredential(@PathVariable String idHash) {
        try {
            Credential credential = credentialService.getCredential(idHash);
            return ResponseEntity.ok(credential);
        } catch (Exception e) {
            return ResponseEntity.notFound().build();
        }
    }
}