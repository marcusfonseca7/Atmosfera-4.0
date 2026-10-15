package org.example;

public class Dispositivos {
    private int id_dispotivo;
    private String nome_dispositivo;
    private String localizacao;
    private String tipo_dispositivo;
    private int gateway_pai_fk;


    public int getId_dispotivo() {
        return id_dispotivo;
    }

    public void setId_dispotivo(int id_dispotivo) {
        this.id_dispotivo = id_dispotivo;
    }

    public String getNome_dispositivo() {
        return nome_dispositivo;
    }

    public void setNome_dispositivo(String nome_dispositivo) {
        this.nome_dispositivo = nome_dispositivo;
    }

    public String getLocalizacao() {
        return localizacao;
    }

    public void setLocalizacao(String localizacao) {
        this.localizacao = localizacao;
    }

    public String getTipo_dispositivo() {
        return tipo_dispositivo;
    }

    public void setTipo_dispositivo(String tipo_dispositivo) {
        this.tipo_dispositivo = tipo_dispositivo;
    }

    public int getGateway_pai_fk() {
        return gateway_pai_fk;
    }

    public void setGateway_pai_fk(int gateway_pai_fk) {
        this.gateway_pai_fk = gateway_pai_fk;
    }
}
