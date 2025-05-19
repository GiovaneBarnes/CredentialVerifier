package com.giovanebarnes.backend.model;

public class Issuer {

    private String address;

    public Issuer() {}

    public Issuer(String address) {
        this.address = address;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }
}
