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


INSERT INTO registros(temperatura, umidade, pressao, altitude, luminosidade, velocidade_vento, direcao_vento, intensidade_wifi, id_dispositivo_fk)
VALUES
    (24.5, 65.0, 1013.2, 850.0, 720.0, 2.5, 90, -45, 2),
    (26.1, 58.5, 1011.8, 850.0, 850.0, 3.1, 120, -52, 3),
    (23.8, 70.2, 1014.5, 850.0, 600.0, 1.8, 75, -40, 1);


SELECT * FROM atuadores;
SELECT * FROM dispositivos;



