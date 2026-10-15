package org.example;

import java.sql.SQLException;

public class TesteDAO {
    public static void main(String[] args) throws SQLException {
        AtuadoresDAO atuadoresDAO = new AtuadoresDAO();
        // DispositivoDAO dispositivoDAO = new DispositivoDAO();
        // RegistroDAO registroDAO = new RegistroDAO();


        boolean valorBooleano = true;
        atuadoresDAO.CadastrarAtuadores(new Atuadores(0, "Atuador Teste", valorBooleano , 3.4F));
    }
}
