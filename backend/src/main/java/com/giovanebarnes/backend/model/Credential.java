package com.giovanebarnes.backend.model;

public class Credential {

    private String recipientName;
    private String degree;
    private String idHash;

    public Credential() {}

    public Credential(String recipientName, String degree, String idHash) {
        this.recipientName = recipientName;
        this.degree = degree;
        this.idHash = idHash;
    }

    public String getRecipientName() {
        return recipientName;
    }

    public String getDegree() {
        return degree;
    }

    public String getIdHash() {
        return idHash;
    }

    public void setRecipientName(String recipientName) {
        this.recipientName = recipientName;
    }

    public void setDegree(String degree) {
        this.degree = degree;
    }

    public void setIdHash(String idHash) {
        this.idHash = idHash;
    }
}


