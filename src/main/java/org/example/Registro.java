package org.example;

public class Registro {
    private int idRegistro;
    private float temperatura;
    private float umidade;
    private float pressao;
    private float altitude;
    private float luminosidade;
    private float velocidadeVento;
    private int direcaoVento;
    private int intensidadeWifi;
    private int idDispositivoFk;

    public Registro(int idRegistro, float temperatura, float umidade, float pressao, float altitude, float luminosidade, float velocidadeVento, int direcaoVento, int intensidadeWifi, int idDispositivoFk) {
        this.idRegistro = idRegistro;
        this.temperatura = temperatura;
        this.umidade = umidade;
        this.pressao = pressao;
        this.altitude = altitude;
        this.luminosidade = luminosidade;
        this.velocidadeVento = velocidadeVento;
        this.direcaoVento = direcaoVento;
        this.intensidadeWifi = intensidadeWifi;
        this.idDispositivoFk = idDispositivoFk;
    }

    public int getIdRegistro() {
        return idRegistro;
    }

    public void setIdRegistro(int idRegistro) {
        this.idRegistro = idRegistro;
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

    public float getVelocidadeVento() {
        return velocidadeVento;
    }

    public void setVelocidadeVento(float velocidadeVento) {
        this.velocidadeVento = velocidadeVento;
    }

    public int getDirecaoVento() {
        return direcaoVento;
    }

    public void setDirecaoVento(int direcaoVento) {
        this.direcaoVento = direcaoVento;
    }

    public int getIntensidadeWifi() {
        return intensidadeWifi;
    }

    public void setIntensidadeWifi(int intensidadeWifi) {
        this.intensidadeWifi = intensidadeWifi;
    }

    public int getIdDispositivoFk() {
        return idDispositivoFk;
    }

    public void setIdDispositivoFk(int idDispositivoFk) {
        this.idDispositivoFk = idDispositivoFk;
    }
}