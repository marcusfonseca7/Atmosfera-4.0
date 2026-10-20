package org.example;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

public class RegistroDAO {
    public void CadastrarRegistro(Registro registro) throws SQLException {
        String sql =
                """
           INSERT INTO registros(temperatura, umidade, pressao, altitude, luminosidade, velocidade_vento, direcao_vento, intensidade_wifi, id_dispositivo_fk) 
           VALUES (?,?,?,?,?,?,?,?,?)
           """;


        try (Connection connection = Conexao.abrirConexao();
             PreparedStatement comando = connection.prepareStatement(sql)){

            comando.setFloat(1, registro.getTemperatura());
            comando.setFloat(2, registro.getUmidade());
            comando.setFloat(3, registro.getPressao());
            comando.setObject(4, registro.getAltitude());
            comando.setFloat(5, registro.getLuminosidade());
            comando.setFloat(6, registro.getVelocidadeVento());
            comando.setObject(7, registro.getDirecaoVento());
            comando.setObject(8, registro.getIntensidadeWifi());
            comando.setObject(9, registro.getIdDispositivoFk());

            comando.executeUpdate();

        }
    }
}
