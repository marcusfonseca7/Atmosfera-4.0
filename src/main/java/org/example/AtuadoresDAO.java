package org.example;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

public class AtuadoresDAO{


    public void CadastrarAtuadores(Atuadores atuadores ) throws SQLException {
      String sql = """
              
              INSERT INTO atuadores(nome_atuadores status_atual,datetime) VALUES(?, ?, ?)
              """;

      try(Connection connection =  Conexao.abrirConexao()){
          PreparedStatement comando =  connection.prepareStatement(sql);
          comando.setString(1,  atuadores.getNome_atuadores());
          comando.setString(2, String.valueOf(atuadores.getStatus_atual()));
          comando.setString(3,String.valueOf(atuadores.getDatetime()));
          comando.executeUpdate();
      }
  }

    public List<Atuadores> listar() throws SQLException {
        String sql = "SELECT id_atuadores, nome_atuadores, status_atual FROM atuadores ORDER BY id_atuadores DESC";
        List<Atuadores> atuadores = new ArrayList<>();

        try (Connection connection = Conexao.abrirConexao();
             PreparedStatement comando = connection.prepareStatement(sql);
             ResultSet resultado = comando.executeQuery()) {

            while (resultado.next()) {
                Atuadores atuador = new Atuadores(
                        resultado.getInt("id_atuadores"),
                        resultado.getString("nome_atuadores"),
                        resultado.getBoolean("status_atual"),
                        resultado.getFloat("datetime")

                );

                atuadores.add(atuador); // Adiciona o objeto à lista
            }
        }

        return atuadores;
    }
}



