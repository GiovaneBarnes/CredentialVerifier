package com.giovanebarnes.contracts;

import java.math.BigInteger;
import java.util.Arrays;
import java.util.Collections;
import java.util.List;
import java.util.concurrent.Callable;
import org.web3j.abi.TypeReference;
import org.web3j.abi.datatypes.Address;
import org.web3j.abi.datatypes.Bool;
import org.web3j.abi.datatypes.DynamicStruct;
import org.web3j.abi.datatypes.Function;
import org.web3j.abi.datatypes.Type;
import org.web3j.abi.datatypes.Utf8String;
import org.web3j.abi.datatypes.generated.Uint256;
import org.web3j.abi.datatypes.generated.Uint8;
import org.web3j.crypto.Credentials;
import org.web3j.protocol.Web3j;
import org.web3j.protocol.core.RemoteCall;
import org.web3j.protocol.core.RemoteFunctionCall;
import org.web3j.protocol.core.methods.response.TransactionReceipt;
import org.web3j.tuples.generated.Tuple4;
import org.web3j.tx.Contract;
import org.web3j.tx.TransactionManager;
import org.web3j.tx.gas.ContractGasProvider;

/**
 * <p>Auto generated code.
 * <p><strong>Do not modify!</strong>
 * <p>Please use the <a href="https://docs.web3j.io/command_line.html">web3j command line tools</a>,
 * or the org.web3j.codegen.SolidityFunctionWrapperGenerator in the 
 * <a href="https://github.com/LFDT-web3j/web3j/tree/main/codegen">codegen module</a> to update.
 *
 * <p>Generated with web3j version 1.7.0.
 */
@SuppressWarnings("rawtypes")
public class CredentialVerifier extends Contract {
    public static final String BINARY = "0x6080604052348015600f57600080fd5b50336000806101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff16021790555060018060003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060006101000a81548160ff0219169083151502179055506114b2806100b66000396000f3fe608060405234801561001057600080fd5b50600436106100935760003560e01c80638da5cb5b116100665780638da5cb5b14610133578063ca6eec7814610151578063cfe0ae4a1461016d578063d1be48831461019d578063ea6999d7146101cd57610093565b8063299d034814610098578063383fcff0146100cb57806359936a00146100fb5780637e5e90ff14610117575b600080fd5b6100b260048036038101906100ad9190610b00565b6101e9565b6040516100c29493929190610c4d565b60405180910390f35b6100e560048036038101906100e09190610b00565b610336565b6040516100f29190610ca0565b60405180910390f35b61011560048036038101906101109190610df0565b6103bb565b005b610131600480360381019061012c9190610ed9565b610555565b005b61013b61063b565b6040516101489190610f15565b60405180910390f35b61016b60048036038101906101669190610b00565b61065f565b005b61018760048036038101906101829190610ed9565b610786565b6040516101949190610f4b565b60405180910390f35b6101b760048036038101906101b29190610b00565b6107a6565b6040516101c49190611038565b60405180910390f35b6101e760048036038101906101e29190610ed9565b610995565b005b600260205280600052604060002060009150905080600001805461020c90611089565b80601f016020809104026020016040519081016040528092919081815260200182805461023890611089565b80156102855780601f1061025a57610100808354040283529160200191610285565b820191906000526020600020905b81548152906001019060200180831161026857829003601f168201915b50505050509080600101805461029a90611089565b80601f01602080910402602001604051908101604052809291908181526020018280546102c690611089565b80156103135780601f106102e857610100808354040283529160200191610313565b820191906000526020600020905b8154815290600101906020018083116102f657829003601f168201915b5050505050908060020154908060030160009054906101000a900460ff16905084565b600080600260008481526020019081526020016000206002015403610390576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161038790611106565b60405180910390fd5b6002600083815260200190815260200160002060030160009054906101000a900460ff169050919050565b600160003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060009054906101000a900460ff16610447576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161043e90611172565b60405180910390fd5b60006002600083815260200190815260200160002060020154146104a0576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610497906111de565b60405180910390fd5b6040518060800160405280848152602001838152602001428152602001600060018111156104d1576104d0610bd6565b5b8152506002600083815260200190815260200160002060008201518160000190816104fc91906113aa565b50602082015181600101908161051291906113aa565b506040820151816002015560608201518160030160006101000a81548160ff0219169083600181111561054857610547610bd6565b5b0217905550905050505050565b600160003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060009054906101000a900460ff166105e1576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016105d890611172565b60405180910390fd5b60018060008373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060006101000a81548160ff02191690831515021790555050565b60008054906101000a900473ffffffffffffffffffffffffffffffffffffffff1681565b600160003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060009054906101000a900460ff166106eb576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016106e290611172565b60405180910390fd5b6000600260008381526020019081526020016000206002015403610744576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161073b90611106565b60405180910390fd5b60016002600083815260200190815260200160002060030160006101000a81548160ff0219169083600181111561077e5761077d610bd6565b5b021790555050565b60016020528060005260406000206000915054906101000a900460ff1681565b6107ae610a7c565b6000600260008481526020019081526020016000206002015403610807576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016107fe90611106565b60405180910390fd5b6002600083815260200190815260200160002060405180608001604052908160008201805461083590611089565b80601f016020809104026020016040519081016040528092919081815260200182805461086190611089565b80156108ae5780601f10610883576101008083540402835291602001916108ae565b820191906000526020600020905b81548152906001019060200180831161089157829003601f168201915b505050505081526020016001820180546108c790611089565b80601f01602080910402602001604051908101604052809291908181526020018280546108f390611089565b80156109405780601f1061091557610100808354040283529160200191610940565b820191906000526020600020905b81548152906001019060200180831161092357829003601f168201915b50505050508152602001600282015481526020016003820160009054906101000a900460ff16600181111561097857610977610bd6565b5b600181111561098a57610989610bd6565b5b815250509050919050565b600160003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060009054906101000a900460ff16610a21576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610a1890611172565b60405180910390fd5b6000600160008373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060006101000a81548160ff02191690831515021790555050565b604051806080016040528060608152602001606081526020016000815260200160006001811115610ab057610aaf610bd6565b5b81525090565b6000604051905090565b600080fd5b600080fd5b6000819050919050565b610add81610aca565b8114610ae857600080fd5b50565b600081359050610afa81610ad4565b92915050565b600060208284031215610b1657610b15610ac0565b5b6000610b2484828501610aeb565b91505092915050565b600081519050919050565b600082825260208201905092915050565b60005b83811015610b67578082015181840152602081019050610b4c565b60008484015250505050565b6000601f19601f8301169050919050565b6000610b8f82610b2d565b610b998185610b38565b9350610ba9818560208601610b49565b610bb281610b73565b840191505092915050565b6000819050919050565b610bd081610bbd565b82525050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052602160045260246000fd5b60028110610c1657610c15610bd6565b5b50565b6000819050610c2782610c05565b919050565b6000610c3782610c19565b9050919050565b610c4781610c2c565b82525050565b60006080820190508181036000830152610c678187610b84565b90508181036020830152610c7b8186610b84565b9050610c8a6040830185610bc7565b610c976060830184610c3e565b95945050505050565b6000602082019050610cb56000830184610c3e565b92915050565b600080fd5b600080fd5b7f4e487b7100000000000000000000000000000000000000000000000000000000600052604160045260246000fd5b610cfd82610b73565b810181811067ffffffffffffffff82111715610d1c57610d1b610cc5565b5b80604052505050565b6000610d2f610ab6565b9050610d3b8282610cf4565b919050565b600067ffffffffffffffff821115610d5b57610d5a610cc5565b5b610d6482610b73565b9050602081019050919050565b82818337600083830152505050565b6000610d93610d8e84610d40565b610d25565b905082815260208101848484011115610daf57610dae610cc0565b5b610dba848285610d71565b509392505050565b600082601f830112610dd757610dd6610cbb565b5b8135610de7848260208601610d80565b91505092915050565b600080600060608486031215610e0957610e08610ac0565b5b600084013567ffffffffffffffff811115610e2757610e26610ac5565b5b610e3386828701610dc2565b935050602084013567ffffffffffffffff811115610e5457610e53610ac5565b5b610e6086828701610dc2565b9250506040610e7186828701610aeb565b9150509250925092565b600073ffffffffffffffffffffffffffffffffffffffff82169050919050565b6000610ea682610e7b565b9050919050565b610eb681610e9b565b8114610ec157600080fd5b50565b600081359050610ed381610ead565b92915050565b600060208284031215610eef57610eee610ac0565b5b6000610efd84828501610ec4565b91505092915050565b610f0f81610e9b565b82525050565b6000602082019050610f2a6000830184610f06565b92915050565b60008115159050919050565b610f4581610f30565b82525050565b6000602082019050610f606000830184610f3c565b92915050565b600082825260208201905092915050565b6000610f8282610b2d565b610f8c8185610f66565b9350610f9c818560208601610b49565b610fa581610b73565b840191505092915050565b610fb981610bbd565b82525050565b610fc881610c2c565b82525050565b60006080830160008301518482036000860152610feb8282610f77565b915050602083015184820360208601526110058282610f77565b915050604083015161101a6040860182610fb0565b50606083015161102d6060860182610fbf565b508091505092915050565b600060208201905081810360008301526110528184610fce565b905092915050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052602260045260246000fd5b600060028204905060018216806110a157607f821691505b6020821081036110b4576110b361105a565b5b50919050565b7f43726564656e7469616c20646f65736e27742065786973740000000000000000600082015250565b60006110f0601883610b38565b91506110fb826110ba565b602082019050919050565b6000602082019050818103600083015261111f816110e3565b9050919050565b7f4e6f7420617574686f72697a656420746f2069737375652c206265676f6e6521600082015250565b600061115c602083610b38565b915061116782611126565b602082019050919050565b6000602082019050818103600083015261118b8161114f565b9050919050565b7f43726564656e7469616c20616c72656164792065786973747300000000000000600082015250565b60006111c8601983610b38565b91506111d382611192565b602082019050919050565b600060208201905081810360008301526111f7816111bb565b9050919050565b60008190508160005260206000209050919050565b60006020601f8301049050919050565b600082821b905092915050565b6000600883026112607fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff82611223565b61126a8683611223565b95508019841693508086168417925050509392505050565b6000819050919050565b60006112a76112a261129d84610bbd565b611282565b610bbd565b9050919050565b6000819050919050565b6112c18361128c565b6112d56112cd826112ae565b848454611230565b825550505050565b600090565b6112ea6112dd565b6112f58184846112b8565b505050565b5b818110156113195761130e6000826112e2565b6001810190506112fb565b5050565b601f82111561135e5761132f816111fe565b61133884611213565b81016020851015611347578190505b61135b61135385611213565b8301826112fa565b50505b505050565b600082821c905092915050565b600061138160001984600802611363565b1980831691505092915050565b600061139a8383611370565b9150826002028217905092915050565b6113b382610b2d565b67ffffffffffffffff8111156113cc576113cb610cc5565b5b6113d68254611089565b6113e182828561131d565b600060209050601f8311600181146114145760008415611402578287015190505b61140c858261138e565b865550611474565b601f198416611422866111fe565b60005b8281101561144a57848901518255600182019150602085019450602081019050611425565b868310156114675784890151611463601f891682611370565b8355505b6001600288020188555050505b50505050505056fea2646970667358221220d8793bcd85afddd6ec257596cc77cfeb3a533959b77fed8badd618c758cf1a3464736f6c634300081c0033";

    private static String librariesLinkedBinary;

    public static final String FUNC_ADDAUTHORIZEISSUER = "addAuthorizeIssuer";

    public static final String FUNC_ADDCREDENTIAL = "addCredential";

    public static final String FUNC_AUTHORIZEDISSUER = "authorizedIssuer";

    public static final String FUNC_CREDENTIALS = "credentials";

    public static final String FUNC_GETCREDENTIAL = "getCredential";

    public static final String FUNC_GETCREDENTIALSTATUS = "getCredentialStatus";

    public static final String FUNC_OWNER = "owner";

    public static final String FUNC_REVOKEAUTHORIZEISSUE = "revokeAuthorizeIssue";

    public static final String FUNC_REVOKECREDENTIAL = "revokeCredential";

    @Deprecated
    protected CredentialVerifier(String contractAddress, Web3j web3j, Credentials credentials,
            BigInteger gasPrice, BigInteger gasLimit) {
        super(BINARY, contractAddress, web3j, credentials, gasPrice, gasLimit);
    }

    protected CredentialVerifier(String contractAddress, Web3j web3j, Credentials credentials,
            ContractGasProvider contractGasProvider) {
        super(BINARY, contractAddress, web3j, credentials, contractGasProvider);
    }

    @Deprecated
    protected CredentialVerifier(String contractAddress, Web3j web3j,
            TransactionManager transactionManager, BigInteger gasPrice, BigInteger gasLimit) {
        super(BINARY, contractAddress, web3j, transactionManager, gasPrice, gasLimit);
    }

    protected CredentialVerifier(String contractAddress, Web3j web3j,
            TransactionManager transactionManager, ContractGasProvider contractGasProvider) {
        super(BINARY, contractAddress, web3j, transactionManager, contractGasProvider);
    }

    public RemoteFunctionCall<TransactionReceipt> addAuthorizeIssuer(String issuer) {
        final Function function = new Function(
                FUNC_ADDAUTHORIZEISSUER, 
                Arrays.<Type>asList(new org.web3j.abi.datatypes.Address(160, issuer)), 
                Collections.<TypeReference<?>>emptyList());
        return executeRemoteCallTransaction(function);
    }

    public RemoteFunctionCall<TransactionReceipt> addCredential(String recipientName, String degree,
            byte[] idHash) {
        final Function function = new Function(
                FUNC_ADDCREDENTIAL, 
                Arrays.<Type>asList(new org.web3j.abi.datatypes.Utf8String(recipientName), 
                new org.web3j.abi.datatypes.Utf8String(degree), 
                new org.web3j.abi.datatypes.generated.Bytes32(idHash)), 
                Collections.<TypeReference<?>>emptyList());
        return executeRemoteCallTransaction(function);
    }

    public RemoteFunctionCall<Boolean> authorizedIssuer(String param0) {
        final Function function = new Function(FUNC_AUTHORIZEDISSUER, 
                Arrays.<Type>asList(new org.web3j.abi.datatypes.Address(160, param0)), 
                Arrays.<TypeReference<?>>asList(new TypeReference<Bool>() {}));
        return executeRemoteCallSingleValueReturn(function, Boolean.class);
    }

    public RemoteFunctionCall<Tuple4<String, String, BigInteger, BigInteger>> credentials(
            byte[] param0) {
        final Function function = new Function(FUNC_CREDENTIALS, 
                Arrays.<Type>asList(new org.web3j.abi.datatypes.generated.Bytes32(param0)), 
                Arrays.<TypeReference<?>>asList(new TypeReference<Utf8String>() {}, new TypeReference<Utf8String>() {}, new TypeReference<Uint256>() {}, new TypeReference<Uint8>() {}));
        return new RemoteFunctionCall<Tuple4<String, String, BigInteger, BigInteger>>(function,
                new Callable<Tuple4<String, String, BigInteger, BigInteger>>() {
                    @Override
                    public Tuple4<String, String, BigInteger, BigInteger> call() throws Exception {
                        List<Type> results = executeCallMultipleValueReturn(function);
                        return new Tuple4<String, String, BigInteger, BigInteger>(
                                (String) results.get(0).getValue(), 
                                (String) results.get(1).getValue(), 
                                (BigInteger) results.get(2).getValue(), 
                                (BigInteger) results.get(3).getValue());
                    }
                });
    }

    public RemoteFunctionCall<Credential> getCredential(byte[] idHash) {
        final Function function = new Function(FUNC_GETCREDENTIAL, 
                Arrays.<Type>asList(new org.web3j.abi.datatypes.generated.Bytes32(idHash)), 
                Arrays.<TypeReference<?>>asList(new TypeReference<Credential>() {}));
        return executeRemoteCallSingleValueReturn(function, Credential.class);
    }

    public RemoteFunctionCall<BigInteger> getCredentialStatus(byte[] idHash) {
        final Function function = new Function(FUNC_GETCREDENTIALSTATUS, 
                Arrays.<Type>asList(new org.web3j.abi.datatypes.generated.Bytes32(idHash)), 
                Arrays.<TypeReference<?>>asList(new TypeReference<Uint8>() {}));
        return executeRemoteCallSingleValueReturn(function, BigInteger.class);
    }

    public RemoteFunctionCall<String> owner() {
        final Function function = new Function(FUNC_OWNER, 
                Arrays.<Type>asList(), 
                Arrays.<TypeReference<?>>asList(new TypeReference<Address>() {}));
        return executeRemoteCallSingleValueReturn(function, String.class);
    }

    public RemoteFunctionCall<TransactionReceipt> revokeAuthorizeIssue(String issuer) {
        final Function function = new Function(
                FUNC_REVOKEAUTHORIZEISSUE, 
                Arrays.<Type>asList(new org.web3j.abi.datatypes.Address(160, issuer)), 
                Collections.<TypeReference<?>>emptyList());
        return executeRemoteCallTransaction(function);
    }

    public RemoteFunctionCall<TransactionReceipt> revokeCredential(byte[] idHash) {
        final Function function = new Function(
                FUNC_REVOKECREDENTIAL, 
                Arrays.<Type>asList(new org.web3j.abi.datatypes.generated.Bytes32(idHash)), 
                Collections.<TypeReference<?>>emptyList());
        return executeRemoteCallTransaction(function);
    }

    @Deprecated
    public static CredentialVerifier load(String contractAddress, Web3j web3j,
            Credentials credentials, BigInteger gasPrice, BigInteger gasLimit) {
        return new CredentialVerifier(contractAddress, web3j, credentials, gasPrice, gasLimit);
    }

    @Deprecated
    public static CredentialVerifier load(String contractAddress, Web3j web3j,
            TransactionManager transactionManager, BigInteger gasPrice, BigInteger gasLimit) {
        return new CredentialVerifier(contractAddress, web3j, transactionManager, gasPrice, gasLimit);
    }

    public static CredentialVerifier load(String contractAddress, Web3j web3j,
            Credentials credentials, ContractGasProvider contractGasProvider) {
        return new CredentialVerifier(contractAddress, web3j, credentials, contractGasProvider);
    }

    public static CredentialVerifier load(String contractAddress, Web3j web3j,
            TransactionManager transactionManager, ContractGasProvider contractGasProvider) {
        return new CredentialVerifier(contractAddress, web3j, transactionManager, contractGasProvider);
    }

    public static RemoteCall<CredentialVerifier> deploy(Web3j web3j, Credentials credentials,
            ContractGasProvider contractGasProvider) {
        return deployRemoteCall(CredentialVerifier.class, web3j, credentials, contractGasProvider, getDeploymentBinary(), "");
    }

    public static RemoteCall<CredentialVerifier> deploy(Web3j web3j,
            TransactionManager transactionManager, ContractGasProvider contractGasProvider) {
        return deployRemoteCall(CredentialVerifier.class, web3j, transactionManager, contractGasProvider, getDeploymentBinary(), "");
    }

    @Deprecated
    public static RemoteCall<CredentialVerifier> deploy(Web3j web3j, Credentials credentials,
            BigInteger gasPrice, BigInteger gasLimit) {
        return deployRemoteCall(CredentialVerifier.class, web3j, credentials, gasPrice, gasLimit, getDeploymentBinary(), "");
    }

    @Deprecated
    public static RemoteCall<CredentialVerifier> deploy(Web3j web3j,
            TransactionManager transactionManager, BigInteger gasPrice, BigInteger gasLimit) {
        return deployRemoteCall(CredentialVerifier.class, web3j, transactionManager, gasPrice, gasLimit, getDeploymentBinary(), "");
    }

//    public static void linkLibraries(List<Contract.LinkReference> references) {
//        librariesLinkedBinary = linkBinaryWithReferences(BINARY, references);
//    }

    private static String getDeploymentBinary() {
        if (librariesLinkedBinary != null) {
            return librariesLinkedBinary;
        } else {
            return BINARY;
        }
    }

    public static class Credential extends DynamicStruct {
        public String recipientName;

        public String degree;

        public BigInteger issuedAt;

        public BigInteger status;

        public Credential(String recipientName, String degree, BigInteger issuedAt,
                BigInteger status) {
            super(new org.web3j.abi.datatypes.Utf8String(recipientName), 
                    new org.web3j.abi.datatypes.Utf8String(degree), 
                    new org.web3j.abi.datatypes.generated.Uint256(issuedAt), 
                    new org.web3j.abi.datatypes.generated.Uint8(status));
            this.recipientName = recipientName;
            this.degree = degree;
            this.issuedAt = issuedAt;
            this.status = status;
        }

        public Credential(Utf8String recipientName, Utf8String degree, Uint256 issuedAt,
                Uint8 status) {
            super(recipientName, degree, issuedAt, status);
            this.recipientName = recipientName.getValue();
            this.degree = degree.getValue();
            this.issuedAt = issuedAt.getValue();
            this.status = status.getValue();
        }
    }
}
