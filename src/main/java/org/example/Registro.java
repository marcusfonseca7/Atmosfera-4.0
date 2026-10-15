package org.example;

public class Registro {
    private int id_registro;
    private int data_hora;
    private float temperatura;
    private float umidade;
    private float pressao;
    private float altitude;
    private float luminosidade;
    private float velocidade_vento;


    private int direcao_vento;
    private  int intensidade_wifi;


    public int getId_registro() {
        return id_registro;
    }

    public void setId_registro(int id_registro) {
        this.id_registro = id_registro;
    }

    public int getData_hora() {
        return data_hora;
    }

    public void setData_hora(int data_hora) {
        this.data_hora = data_hora;
    }

    public float getTemperatura() {
        return temperatura;
    }

    public void setTemperatura(float temperatura) {
        this.temperatura = temperatura;
    }

    public float getUmidade() {
        return umidade;
    }

    public void setUmidade(float umidade) {
        this.umidade = umidade;
    }

    public float getPressao() {
        return pressao;
    }

    public void setPressao(float pressao) {
        this.pressao = pressao;
    }

    public float getAltitude() {
        return altitude;
    }

    public void setAltitude(float altitude) {
        this.altitude = altitude;
    }

    public float getLuminosidade() {
        return luminosidade;
    }

    public void setLuminosidade(float luminosidade) {
        this.luminosidade = luminosidade;
    }

    public float getVelocidade_vento() {
        return velocidade_vento;
    }

    public void setVelocidade_vento(float velocidade_vento) {
        this.velocidade_vento = velocidade_vento;
    }

    public int getDirecao_vento() {
        return direcao_vento;
    }

    public void setDirecao_vento(int direcao_vento) {
        this.direcao_vento = direcao_vento;
    }

    public int getIntensidade_wifi() {
        return intensidade_wifi;
    }

    public void setIntensidade_wifi(int intensidade_wifi) {
        this.intensidade_wifi = intensidade_wifi;
    }
}
