package com.giovanebarnes.backend.model;

public class Credential {

    private String recipientName;
    private String degree;
    private String idHash;
    private long issuedAt;
    private int status;

    public Credential() {}

    public Credential(String recipientName, String degree, String idHash) {
        this.recipientName = recipientName;
        this.degree = degree;
        this.idHash = idHash;
    }

    public Credential(String recipientName, String degree, String idHash, long issuedAt, int status) {
        this.recipientName = recipientName;
        this.degree = degree;
        this.idHash = idHash;
        this.issuedAt = issuedAt;
        this.status = status;
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

    public long getIssuedAt() {
        return issuedAt;
    }

    public void setIssuedAt(long issuedAt) {
        this.issuedAt = issuedAt;
    }

    public int getStatus() {
        return status;
    }

    public void setStatus(int status) {
        this.status = status;
    }
}


