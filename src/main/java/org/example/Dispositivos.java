package org.example;

public class Dispositivos {
    private int idDispotivo;
    private String nomeDispositivo;
    private String localizacao;
    private String tipoDispositivo;
    private int gatewayPaiFk;

    public Dispositivos(int idDispotivo, String nomeDispositivo, String localizacao, String tipoDispositivo, int gatewayPaiFk) {
        this.idDispotivo = idDispotivo;
        this.nomeDispositivo = nomeDispositivo;
        this.localizacao = localizacao;
        this.tipoDispositivo = tipoDispositivo;
        this.gatewayPaiFk = gatewayPaiFk;
    }

    public Dispositivos() {}

    public int getIdDispotivo() {
        return idDispotivo;
    }

    public void setIdDispotivo(int idDispotivo) {
        this.idDispotivo = idDispotivo;
    }

    public String getNomeDispositivo() {
        return nomeDispositivo;
    }

    public void setNomeDispositivo(String nomeDispositivo) {
        this.nomeDispositivo = nomeDispositivo;
    }

    public String getLocalizacao() {
        return localizacao;
    }

    public void setLocalizacao(String localizacao) {
        this.localizacao = localizacao;
    }

    public String getTipoDispositivo() {
        return tipoDispositivo;
    }

    public void setTipoDispositivo(String tipoDispositivo) {
        this.tipoDispositivo = tipoDispositivo;
    }

    public int getGatewayPaiFk() {
        return gatewayPaiFk;
    }

    public void setGatewayPaiFk(int gatewayPaiFk) {
        this.gatewayPaiFk = gatewayPaiFk;
    }
}

