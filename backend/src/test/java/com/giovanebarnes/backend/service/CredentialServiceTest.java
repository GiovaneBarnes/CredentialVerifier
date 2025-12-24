package com.giovanebarnes.backend.service;

import com.giovanebarnes.backend.model.Credential;
import com.giovanebarnes.contracts.CredentialVerifier;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.web3j.protocol.core.RemoteFunctionCall;
import org.web3j.protocol.core.methods.response.TransactionReceipt;

import java.math.BigInteger;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.*;
import static org.mockito.Mockito.*;

@SpringBootTest
class CredentialServiceTest {

    @Autowired
    private CredentialService credentialService;

    @SuppressWarnings("deprecation")
    @MockBean
    private CredentialVerifier contract;

    @Test
    void testIssueCredential() throws Exception {
        // Given
        Credential dto = new Credential("John Doe", "Bachelor of Science", "hash123");
        TransactionReceipt mockReceipt = mock(TransactionReceipt.class);
        when(mockReceipt.getTransactionHash()).thenReturn("0x123");
        RemoteFunctionCall<TransactionReceipt> mockCall = mock(RemoteFunctionCall.class);
        when(mockCall.send()).thenReturn(mockReceipt);
        when(contract.addCredential(anyString(), anyString(), any(byte[].class))).thenReturn(mockCall);

        // When
        String result = credentialService.issueCredential(dto);

        // Then
        assertEquals("0x123", result);
        verify(contract).addCredential("John Doe", "Bachelor of Science", "hash123".getBytes());
    }

    @Test
    void testGetCredential() throws Exception {
        // Given
        String idHash = "hash123";
        CredentialVerifier.Credential mockCredential = new CredentialVerifier.Credential("John Doe", "Bachelor of Science", BigInteger.valueOf(1234567890L), BigInteger.valueOf(0));
        RemoteFunctionCall<CredentialVerifier.Credential> mockCall = mock(RemoteFunctionCall.class);
        when(mockCall.send()).thenReturn(mockCredential);
        when(contract.getCredential(idHash.getBytes())).thenReturn(mockCall);

        // When
        Credential result = credentialService.getCredential(idHash);

        // Then
        assertNotNull(result);
        assertEquals("John Doe", result.getRecipientName());
        assertEquals("Bachelor of Science", result.getDegree());
        assertEquals(idHash, result.getIdHash());
        assertEquals(1234567890L, result.getIssuedAt());
        assertEquals(0, result.getStatus());
    }

    @Test
    void testIssueCredentialThrowsException() throws Exception {
        // Given
        Credential dto = new Credential("John Doe", "Bachelor of Science", "hash123");
        RemoteFunctionCall<TransactionReceipt> mockCall = mock(RemoteFunctionCall.class);
        when(mockCall.send()).thenThrow(new RuntimeException("Blockchain error"));
        when(contract.addCredential(anyString(), anyString(), any(byte[].class))).thenReturn(mockCall);

        // When & Then
        assertThrows(RuntimeException.class, () -> credentialService.issueCredential(dto));
    }

    @Test
    void testGetCredentialThrowsException() throws Exception {
        // Given
        String idHash = "hash123";
        RemoteFunctionCall<CredentialVerifier.Credential> mockCall = mock(RemoteFunctionCall.class);
        when(mockCall.send()).thenThrow(new RuntimeException("Credential not found"));
        when(contract.getCredential(idHash.getBytes())).thenReturn(mockCall);

        // When & Then
        assertThrows(RuntimeException.class, () -> credentialService.getCredential(idHash));
    }
}