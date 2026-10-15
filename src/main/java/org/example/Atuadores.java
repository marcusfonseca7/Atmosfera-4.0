package org.example;

public class Atuadores {
    private int id_atuadores ;
    private  String nome_atuadores;
    private  Boolean status_atual;
    private Float datetime;

        public Atuadores(int id_atuadores, String nome_atuadores, Boolean status_atual, Float datetime) {
        this.id_atuadores = id_atuadores;
        this.nome_atuadores = nome_atuadores;
        this.status_atual = status_atual;
        this.datetime = datetime;
    }

    public Atuadores(){}




    public int getId_atuadores() {
        return id_atuadores;
    }

    public void setId_atuadores(int id_atuadores) {
        this.id_atuadores = id_atuadores;
    }

    public String getNome_atuadores() {
        return nome_atuadores;
    }

    public void setNome_atuadores(String nome_atuadores) {
        this.nome_atuadores = nome_atuadores;
    }

    public Boolean getStatus_atual() {
        return status_atual;
    }

    public void setStatus_atual(Boolean status_atual) {
        this.status_atual = status_atual;
    }

    public Float getDatetime() {
        return datetime;
    }

    public void setDatetime(Float datetime) {
        this.datetime = datetime;
    }
}
