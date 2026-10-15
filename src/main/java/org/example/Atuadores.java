package org.example;

public class Atuadores {
    private int id_atuadores ;
    private  String nome_atuadores;
    private  Boolean status_atual;
    private Float ultimo_comando;


        public Atuadores(int id_atuadores, String nome_atuadores, Boolean status_atual, Float ultimo_comando) {
        this.id_atuadores = id_atuadores;
        this.nome_atuadores = nome_atuadores;
        this.status_atual = status_atual;
        this.ultimo_comando = ultimo_comando;
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

    public Float getUltimo_comando() {
        return ultimo_comando;
    }

    public void setUltimo_comando(Float datetime) {
        this.ultimo_comando = ultimo_comando;
    }
}
