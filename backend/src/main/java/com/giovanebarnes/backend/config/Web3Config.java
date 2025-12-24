package com.giovanebarnes.backend.config;

import com.giovanebarnes.contracts.CredentialVerifier;
import io.github.cdimascio.dotenv.Dotenv;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.web3j.crypto.Credentials;
import org.web3j.protocol.Web3j;
import org.web3j.protocol.http.HttpService;
import org.web3j.tx.gas.DefaultGasProvider;

@Configuration
public class Web3Config {

    @Bean
    public CredentialVerifier credentialVerifier() throws Exception {
        Dotenv dotenv = Dotenv.load();
        String privateKey = dotenv.get("PrivateKey");
        String contractAddress = dotenv.get("ContractAddress");

        Web3j web3j = Web3j.build(new HttpService("http://localhost:8545"));
        Credentials credentials = Credentials.create(privateKey);

        return CredentialVerifier.load(
                contractAddress,
                web3j,
                credentials,
                new DefaultGasProvider()
        );
    }
}