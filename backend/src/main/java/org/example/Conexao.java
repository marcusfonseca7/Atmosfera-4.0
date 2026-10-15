package org.example;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;

public class Conexao {
    private static final String URL = "jdbc:mysql://localhost:3306/atmosfera_4";
    private static final String USUARIO = "root";
    private static final String SENHA = "senaisp";


    public static Connection abrirConexao() throws SQLException {
        return DriverManager.getConnection(URL, USUARIO, SENHA);
    }

}
