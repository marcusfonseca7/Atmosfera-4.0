package org.example;

//TIP To <b>Run</b> code, press <shortcut actionId="Run"/> or

import com.google.gson.Gson;
import com.sun.net.httpserver.HttpExchange;
import com.sun.net.httpserver.HttpHandler;
import com.sun.net.httpserver.HttpServer;
import com.sun.net.httpserver.SimpleFileServer;

import java.io.IOException;
import java.net.InetSocketAddress;
import java.nio.file.Files;
import java.nio.file.Path;
import java.sql.SQLException;
import java.util.Map;
import java.util.concurrent.Executor;
import java.util.concurrent.Executors;

public class Main {

    private static final int PORTA = 8080;
    private static  final Gson GSON = new Gson();

    private static final AtuadoresDAO ATUADORES_DAO = new AtuadoresDAO();
    private static  final DispositivoDAO DISPOSITIVO_DAO = new DispositivoDAO();
    private static final RegistroDAO REGISTRO_DAO = new RegistroDAO();



    public static void main(String[] args) throws Exception {
        Conexao.abrirConexao();

        HttpServer servidor = HttpServer.create(new InetSocketAddress(PORTA), 0);

        servidor.createContext("api/visualizar", Main::visualizarDadosRecebidos);
        servidor.createContext("api/inserir", Main:: inserirDados);

        Path pastaFrontend = Path.of("")   //AQUI VAI SER O CAMINHO AONDE VAI SE LOCALIZAR O FRONT
                .toAbsolutePath() //Tranforma o caminho relativo em en
                .normalize();   //limpa o endereço,removendo partes desnecessarias (ex> . e ...)

        if (!Files.isDirectory(pastaFrontend)){
            throw new IllegalAccessException("Front-end nao encontrado  em " + pastaFrontend);
        }

        HttpHandler arquivos = SimpleFileServer.createFileHandler(pastaFrontend);
        servidor.createContext("/", exchange -> {
            if (exchange.getRequestURI().getPath().equals("/")){
                exchange.getResponseHeaders().set("Location", "index.html");
                exchange.sendResponseHeaders(302, - 1 );
                exchange.close();
                return;
            }
            arquivos.handle(exchange);
        });


        servidor.setExecutor(Executors.newFixedThreadPool(8));
        servidor.start();

        System.out.printf("Banco conectado com sucesso !!!");
        System.out.printf("ATMOSFERA SENAI http://localhost: "+ PORTA);
        System.out.printf("precione Ctrl + C para encerrar ");
    }


    public static void visualizarDadosRecebidos(HttpExchange exchange)throws IOException{
        if (!exchange.getRequestMethod().equals("GET")) {
            responder(exchange, 405, Map.of(
                    "Erro", "Use o metodo GET "
            ));
            return;
            }

        try{
    private static void inserirDados() {

    }
}