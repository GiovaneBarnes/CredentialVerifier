package com.giovanebarnes.backend.service;

import com.giovanebarnes.backend.model.Credential;
import com.giovanebarnes.contracts.CredentialVerifier;
import org.springframework.stereotype.Service;
import org.web3j.protocol.core.methods.response.TransactionReceipt;

@Service
public class CredentialService {

    private final CredentialVerifier contract;

    public CredentialService(CredentialVerifier contract) {
        this.contract = contract;
    }

    public String issueCredential(Credential dto ) throws Exception {
        TransactionReceipt tx = contract.addCredential(
                dto.getRecipientName(),
                dto.getDegree(),
                dto.getIdHash().getBytes()
        ).send();
        return tx.getTransactionHash();
    }

    public Credential getCredential(String idHash) throws Exception {
        CredentialVerifier.Credential result = contract.getCredential(idHash.getBytes()).send();
        return new Credential(result.recipientName, result.degree, idHash, result.issuedAt.longValue(), result.status.intValue());
    }
}
