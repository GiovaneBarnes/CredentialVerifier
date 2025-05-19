package com.giovanebarnes.backend.service;

import com.giovanebarnes.backend.model.Credential;
import com.giovanebarnes.contracts.CredentialVerifier;
import org.springframework.stereotype.Service;
import io.github.cdimascio.dotenv.Dotenv;
import org.web3j.crypto.Credentials;
import org.web3j.protocol.Web3j;
import org.web3j.protocol.core.methods.response.TransactionReceipt;
import org.web3j.protocol.http.HttpService;
import org.web3j.tuples.generated.Tuple3;
import org.web3j.tx.gas.DefaultGasProvider;

@Service
public class CredentialService {

    Dotenv dotenv = Dotenv.load();
    String privateKey = dotenv.get("PrivateKey");
    String contractAddress = dotenv.get("ContractAddress");

    private final CredentialVerifier contract;

    public CredentialService() throws Exception{
        Web3j web3j = Web3j.build(new HttpService("http://localhost:8545"));
        Credentials credentials = Credentials.create(privateKey);

        this.contract = CredentialVerifier.load(
                contractAddress,
                web3j,
                credentials,
                new DefaultGasProvider()
        );
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
        Tuple3<String>
    }



}
