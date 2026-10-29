DROP DATABASE IF exists atmosfera_4;
CREATE DATABASE atmosfera_4;
USE atmosfera_4;

CREATE TABLE dispositivos(
                             id_dispositivo INT PRIMARY KEY AUTO_INCREMENT,
                             nome_dispositivo VARCHAR(100) NOT NULL,
                             localizacao VARCHAR(30) NOT NULL,
                             tipo_dispositivo VARCHAR(5),
                             gateway_pai_fk INT,

                             FOREIGN KEY (gateway_pai_fk) REFERENCES dispositivos(id_dispositivo)
);

CREATE TABLE atuadores(
                          id_atuador INT PRIMARY KEY AUTO_INCREMENT,
                          nome_atuadores VARCHAR(50) NOT NULL,
                          status_atual BOOL NOT NULL,
                          ultimo_comando DATETIME NOT NULL,
                          id_dispositivo_fk INT NOT NULL,

                          FOREIGN KEY (id_dispositivo_fk) REFERENCES dispositivos(id_dispositivo)
);

CREATE TABLE registros(
                          id_registro BIGINT PRIMARY KEY AUTO_INCREMENT,
                          time_stamp TIMESTAMP DEFAULT NOW(),
                          data_hora DATETIME DEFAULT NOW(),
                          temperatura FLOAT NOT NULL, -- V
                          umidade FLOAT NOT NULL, -- V
                          pressao FLOAT NOT NULL, -- V
                          altitude FLOAT NOT NULL,-- V
                          luminosidade FLOAT NOT NULL, -- V
                          velocidade_vento FLOAT NOT NULL, -- V
                          direcao_vento INT NOT NULL, -- V
                          intensidade_wifi INT NOT NULL, -- V
                          id_dispositivo_fk INT NOT NULL,

                          FOREIGN KEY (id_dispositivo_fk) REFERENCES dispositivos(id_dispositivo)
);

INSERT INTO dispositivos(nome_dispositivo, localizacao, tipo_dispositivo, gateway_pai_fk)
VALUES ('Sensor 1', '-23.589800, -46.620500', 'GW', NULL),
       ('Sensor 2', '-23.589850, -46.620550', 'TEMP', 1),
       ('Sensor 3', '-23.589900, -46.620600', 'AMB', 1);


SELECT * FROM atuadores;
SELECT * FROM dispositivos;



