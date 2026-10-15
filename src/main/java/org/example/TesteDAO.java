package org.example;

import java.sql.SQLException;
import java.time.LocalDateTime;

public class TesteDAO {
    public static void main(String[] args) throws SQLException {
        AtuadoresDAO atuadoresDAO = new AtuadoresDAO();
        // DispositivoDAO dispositivoDAO = new DispositivoDAO();
        // RegistroDAO registroDAO = new RegistroDAO();


        atuadoresDAO.CadastrarAtuadores(new Atuadores(0, "Atuador Teste", true, LocalDateTime.of(2026, 10, 15, 14, 30, 0), 1));
    }
}
