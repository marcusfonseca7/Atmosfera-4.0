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
            comando.setFloat(4, registro.getAltitude());
            comando.setFloat(5, registro.getLuminosidade());
            comando.setFloat(6, registro.getVelocidadeVento());
            comando.setInt(7, registro.getDirecaoVento());
            comando.setInt(8, registro.getIntensidadeWifi());
            comando.setInt(9, registro.getIdDispositivoFk());

            comando.executeUpdate();

        }
    }

    public List<Registro> listar() throws SQLException {

        String sql = "SELECT * FROM registros ORDER BY id_registro DESC";
        List<Registro> registros = new ArrayList<>();

        try (Connection connection = Conexao.abrirConexao();
             PreparedStatement comando = connection.prepareStatement(sql);
             ResultSet resultado = comando.executeQuery()) {

            while (resultado.next()) {
                Registro registro = new Registro(
                        resultado.getInt("id_registro"),
                        resultado.getFloat("temperatura"),
                        resultado.getFloat("umidade"),
                        resultado.getFloat("pressao"),
                        resultado.getFloat("altitude"),
                        resultado.getFloat("luminosidade"),
                        resultado.getFloat("velocidade_vento"),
                        resultado.getInt("direcao_vento"),
                        resultado.getInt("intensidade_wifi"),
                        resultado.getInt("id_dispositivo_fk")


                );
                registros.add(registro); // Adiciona o objeto à lista
            }
        }

        return registros;
    }
}
