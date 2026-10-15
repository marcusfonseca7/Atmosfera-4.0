package org.example;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.SQLException;

public class AtuadoresDAO{


    public void CadastrarAtuadores(Atuadores atuadores ) throws SQLException {
      String sql = """
              
              INSERT INTO atuadores(nome_atuadore status_atual,) VALUES(?, ?)
              """;

      try(Connection connection =  Conexao.abrirConexao()){
          PreparedStatement comando =  connection.prepareStatement(sql);
          comando.setString(1,  atuadores.getNome_atuadores());
          comando.setString(2, String.valueOf(atuadores.getStatus_atual()));
          comando.executeUpdate();
      }
  }
}
