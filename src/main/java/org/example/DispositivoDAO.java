package org.example;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

public class DispositivoDAO {


    public void CadastrarDispostivos(Dispositivos dispositivos) throws SQLException {
        String sql =
                """
           INSERT INTO dispositivos(nome_dispositivo, localizacao, tipo_dispositivo, gateway_pai_fk) Values (?,?,?,?)
           """;


        try (Connection connection = Conexao.abrirConexao();
            PreparedStatement comando = connection.prepareStatement(sql)){

            comando.setString(1, dispositivos.getNomeDispositivo());
            comando.setString(2, dispositivos.getLocalizacao());
            comando.setString(3, dispositivos.getTipoDispositivo());
            comando.setObject(4, dispositivos.getGatewayPaiFk());

            comando.executeUpdate();

        }
    }

    public List<Dispositivos> listar() throws SQLException {

        String sql = "SELECT id_dispositivo, nome_dispositivo, localizacao, tipo_dispositivo FROM dispotivos ORDER BY id_dispositivos DESC";
        List<Dispositivos> dispositivos = new ArrayList<>();

        try (Connection connection = Conexao.abrirConexao();
             PreparedStatement comando = connection.prepareStatement(sql);
             ResultSet resultado = comando.executeQuery()) {

            while (resultado.next()) {
                Dispositivos dispositivo = new Dispositivos(
                        resultado.getInt("id_dispositivos"),
                        resultado.getString("nome_dispositivo"),
                        resultado.getString("localizacao"),
                        resultado.getString("tipo_dispositivo"),
                        resultado.getInt("gateway_pai_fk")

                );
                dispositivos.add(dispositivo); // Adiciona o objeto à lista
            }
        }

        return dispositivos;
    }
}
