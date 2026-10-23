package org.example;

//TIP To <b>Run</b> code, press <shortcut actionId="Run"/> or

import com.google.gson.Gson;
import com.sun.net.httpserver.HttpExchange;
import com.sun.net.httpserver.HttpHandler;
import com.sun.net.httpserver.HttpServer;
import com.sun.net.httpserver.SimpleFileServer;

import java.io.IOException;
import java.io.InputStreamReader;
import java.io.OutputStream;
import java.net.InetSocketAddress;
import java.nio.charset.StandardCharsets;
import java.nio.file.Files;
import java.nio.file.Path;
import java.sql.SQLException;
import java.util.List;
import java.util.Map;
import java.util.concurrent.Executor;
import java.util.concurrent.Executors;

public class Main {

    private static final int PORTA = 8080;
    private static final Gson GSON = new Gson();

    private static final AtuadoresDAO ATUADORES_DAO = new AtuadoresDAO();
    private static final DispositivoDAO DISPOSITIVO_DAO = new DispositivoDAO();
    private static final RegistroDAO REGISTRO_DAO = new RegistroDAO();


    public static void main(String[] args) throws Exception {
        Conexao.abrirConexao();

        HttpServer servidor = HttpServer.create(new InetSocketAddress(PORTA), 0);

        servidor.createContext("api/visualizar", Main::visualizarDadosRecebidos);
        servidor.createContext("api/inserir", Main::inserirDados);

        Path pastaFrontend = Path.of("")   //AQUI VAI SER O CAMINHO AONDE VAI SE LOCALIZAR O FRONT
                .toAbsolutePath() //Tranforma o caminho relativo em en
                .normalize();   //limpa o endereço,removendo partes desnecessarias (ex> . e ...)

        if (!Files.isDirectory(pastaFrontend)) {
            throw new IllegalAccessException("Front-end nao encontrado  em " + pastaFrontend);
        }

        HttpHandler arquivos = SimpleFileServer.createFileHandler(pastaFrontend);
        servidor.createContext("/", exchange -> {
            if (exchange.getRequestURI().getPath().equals("/")) {
                exchange.getResponseHeaders().set("Location", "index.html");
                exchange.sendResponseHeaders(302, -1);
                exchange.close();
                return;
            }
            arquivos.handle(exchange);
        });

        servidor.setExecutor(Executors.newFixedThreadPool(8));
        servidor.start();

        System.out.printf("Banco conectado com sucesso !!!");
        System.out.printf("ATMOSFERA SENAI http://localhost: " + PORTA);
        System.out.printf("precione Ctrl + C para encerrar ");
    }


    /*   O BLOCO DE CODIGO ABAIXO PEGA O METODO DE LISTAR OS ITENS DO BANCO E COLOCA DENTRO DE UMA LISTA, COM UM FOR ELE PERCORRE ESSA LISTA
         E FAZ UM MAP DE ITEM TRATADO AONDE ELE PUXA DADOS ESPECIFICOS E DIRECIONAS OS CAMPO (CHAVE E VALOR)

          * POR ULTIMO ELE EM UMA OUTRA LISTA JA COM OS DADOS TRATADOS */

    public static void visualizarDadosRecebidos(HttpExchange exchange) throws IOException {
        if (!exchange.getRequestMethod().equals("GET")) {
            responder(exchange, 405, Map.of("Erro", "Use o metodo GET "));
            return;}
        try {
            List<Registro> registrosBrutos = REGISTRO_DAO.listar();
            // faz o tratamento e a formação dos dados
            List<Map<String, Object>> registrosTratados = new java.util.ArrayList<>();


            for (Registro r : registrosBrutos){
                Map<String, Object> itemTratado = new java.util.HashMap<>();

            itemTratado.put("id", r.getIdRegistro());
            itemTratado.put("temperatura", r.getTemperatura() + "°C");
            itemTratado.put("Umidade", r.getLuminosidade() +  "%");



            //CRIANDO UMA REGRA DE NEGOCIO PARA QUE SE A TEMPERATURA FOR MAIOR Q X NUMERO O CAMPO RECEBE UM ALERTA
                if (r.getTemperatura() > 30.0){
                    itemTratado.put("statusTemperatura", "Alerta: temperatura Alta!");
                }else {
                    itemTratado.put("statusTemperatura", "Estaveel");
                }
                itemTratado.put("Luminosidade", r.getLuminosidade());
                 itemTratado.put("dispositivo", r.getIdDispositivoFk());

                 registrosTratados.add(itemTratado);
            }
                responder(exchange, 200, registrosTratados);  // responder tem um metodo de conversao para JSON

        } catch (Exception e) {
            e.printStackTrace();
            responder(exchange,500, Map.of("erro", "Erro ao tratar dados " + e.getMessage()));
        }

    }


    public static void inserirDados(HttpExchange exchange) throws IOException{

        if (!exchange.getRequestMethod().equals("POST")){
            responder(exchange, 405 , Map.of("erro", "Use o metodo POST"));
            return;
        }
        try {
            //le o corpo enviado do front (Json)
            InputStreamReader reader = new InputStreamReader(exchange.getRequestBody(), StandardCharsets.UTF_8);

            //converte  o JSon recebido  diretamente paara um Objeto da classe Registro o Gson
            Registro novoRegistro = GSON.fromJson(reader, Registro.class);

            REGISTRO_DAO.CadastrarRegistro(novoRegistro);

            responder(exchange, 201,Map.of("sucesso", true, "mensagem", "Registro cadastrado com sucesso !"));


        }catch (SQLException e ){
            e.printStackTrace();
            responder(exchange, 500, Map.of("sucesso", false, "erro", "Erro no banco de dados " + e.getMessage()));
        }catch (Exception e ){
            e.printStackTrace();
            responder(exchange, 500, Map.of("sucesso", false, "erro", "Erro ao processar os dados " + e.getMessage()));
        }
    }



    private  static void responder(HttpExchange exchange, int status, Object conteudo)throws IOException{
        byte[] resposta = GSON.toJson(conteudo).getBytes(StandardCharsets.UTF_8);
        exchange.getResponseHeaders().set("Content-Type", "application/json; charset=UTF8");

        exchange.getResponseHeaders().set("Cache-Control", "no-store");
        exchange.sendResponseHeaders(status, resposta.length);

        try (OutputStream saida = exchange.getResponseBody()){
            saida.write(resposta);
        }

    }

}