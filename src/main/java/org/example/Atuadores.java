package org.example;

import java.time.LocalDateTime;

public class Atuadores {
    private int idAtuadores ;
    private String nomeAtuadores;
    private Boolean statusAtual;
    private LocalDateTime ultimoComando;
    private int dispositivoFk;

    public Atuadores(int idAtuadores, String nomeAtuadores, Boolean statusAtual, LocalDateTime ultimoComando, int dispositivoFk) {
        this.idAtuadores = idAtuadores;
        this.nomeAtuadores = nomeAtuadores;
        this.statusAtual = statusAtual;
        this.ultimoComando = ultimoComando;
        this.dispositivoFk = dispositivoFk;
    }

    public Atuadores(){}

    public int getIdAtuadores() {
        return idAtuadores;
    }

    public void setIdAtuadores(int idAtuadores) {
        this.idAtuadores = idAtuadores;
    }

    public String getNomeAtuadores() {
        return nomeAtuadores;
    }

    public void setNomeAtuadores(String nomeAtuadores) {
        this.nomeAtuadores = nomeAtuadores;
    }

    public Boolean getStatusAtual() {
        return statusAtual;
    }

    public void setStatusAtual(Boolean statusAtual) {
        this.statusAtual = statusAtual;
    }

    public LocalDateTime getUltimoComando() {
        return ultimoComando;
    }

    public void setUltimoComando(LocalDateTime ultimoComando) {
        this.ultimoComando = ultimoComando;
    }

    public int getDispositivoFk() {
        return dispositivoFk;
    }

    public void setDispositivoFk(int dispositivoFk) {
        this.dispositivoFk = dispositivoFk;
    }
}
