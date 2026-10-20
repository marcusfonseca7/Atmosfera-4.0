package org.example;

import java.sql.SQLException;
import java.time.LocalDateTime;

public class TesteDAO {
    public static void main(String[] args) throws SQLException {


        AtuadoresDAO atuadoresDAO = new AtuadoresDAO();
        DispositivoDAO dispositivoDAO = new DispositivoDAO();
        RegistroDAO registroDAO = new RegistroDAO();


        atuadoresDAO.CadastrarAtuadores(new Atuadores(0, "Atuador Teste", true, LocalDateTime.of(2026, 10, 15, 14, 30, 0), 1));
        dispositivoDAO.CadastrarDispostivos(new Dispositivos(0, "Sala 01", "localização", "TEMP", 1));
        registroDAO.CadastrarRegistro(new Registro(0, 25.2f, 23.6f, 12.1f, 1.2f, 95.5f, 20.2f, 2, 5, 1 ));
    }
}
