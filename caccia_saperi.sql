-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Creato il: Gen 18, 2025 alle 20:04
-- Versione del server: 10.4.28-MariaDB
-- Versione PHP: 8.2.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `caccia_saperi`
--

-- --------------------------------------------------------

--
-- Struttura della tabella `email-template`
--

CREATE TABLE `email-template` (
  `id` bigint(20) NOT NULL,
  `corpo` text DEFAULT NULL,
  `encryption_type` enum('NONE','SSL','TLS') DEFAULT NULL,
  `host` varchar(255) DEFAULT NULL,
  `oggetto` varchar(255) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `port` int(11) NOT NULL,
  `usato` bit(1) NOT NULL,
  `username` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dump dei dati per la tabella `email-template`
--

INSERT INTO `email-template` (`id`, `corpo`, `encryption_type`, `host`, `oggetto`, `password`, `port`, `usato`, `username`) VALUES
(1, '<html lang=\"it\">\r\n    <head>\r\n        <meta charset=\"UTF-8\">\r\n        <meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\">\r\n        <title>Conferma Ricezione della Richiesta</title>\r\n        <style>\r\n            body {\r\n                font-family: Arial, sans-serif;\r\n                margin: 0;\r\n                padding: 0;\r\n                background-color: #f4f4f4;\r\n            }\r\n            .email-container {\r\n                max-width: 600px;\r\n                margin: 20px auto;\r\n                background: #ffffff;\r\n                border: 1px solid #dddddd;\r\n                border-radius: 8px;\r\n                overflow: hidden;\r\n            }\r\n            .header {\r\n                color: #ffffff;\r\n                text-align: center;\r\n                padding: 20px 10px;\r\n            }\r\n            h1 {\r\n                margin: 0;\r\n                font-size: 24px;\r\n                color: #fab700;\r\n            }\r\n            .content {\r\n                padding: 20px;\r\n                color: #333333;\r\n                line-height: 1.6;\r\n            }\r\n            .content h2 {\r\n                font-size: 20px;\r\n                margin-top: 0;\r\n            }\r\n            .content p {\r\n                margin: 10px 0;\r\n            }\r\n\r\n            .footer {\r\n                text-align: center;\r\n                padding: 10px;\r\n                color: white;\r\n                background-color: #4b3f72;\r\n                font-size: 12px;\r\n            }\r\n            .button {\r\n                display: inline-block;\r\n                margin-top: 20px;\r\n                padding: 10px 20px;\r\n                background-color: #4b3f72;\r\n                color: #ffffff;\r\n                text-decoration: none;\r\n                border-radius: 5px;\r\n                font-size: 16px;\r\n            }\r\n            .button:hover {\r\n                background-color: #fab700;\r\n            }\r\n        </style>\r\n    </head>\r\n    <body>\r\n        <div class=\"email-container\">\r\n            <div class=\"header\">\r\n                <img src=\"https://i.imgur.com/lPnYvNv.png\" alt=\"logo\" />\r\n            </div>\r\n            <div class=\"content\">\r\n                <h1>Grazie per la tua richiesta!</h1>\r\n                <p>Ciao {{NOME_UTENTE}},</p>\r\n                <p>Abbiamo ricevuto la tua richiesta e il nostro team la esaminerà al più presto. Ti contatteremo per fornirti una risposta in base alle tue esigenze.</p>\r\n                <p>Nel frattempo, se hai domande o necessiti di ulteriori informazioni, non esitare a contattarci.</p>\r\n                <p>Puoi anche visitare il nostro sito web per maggiori dettagli.</p>\r\n                <a href=\"https://cascinacaccia.net/\" class=\"button\">Visita il nostro sito</a>\r\n            </div>\r\n\r\n            <div class=\"footer\">\r\n                <p>Questo è un messaggio automatico, si prega di non rispondere a questa email.</p>\r\n                <p>Se non hai effettuato questa richiesta, ignora pure questa email o contatta il nostro supporto.</p>\r\n                <p>Contattaci:</p>\r\n                <p>Email: supporto@tuosito.it | Telefono: +39 123 456 7890</p>\r\n            \r\n                <!-- <p>&copy; 2024 La Nostra Attività. Tutti i diritti riservati.</p> -->\r\n            </div>\r\n        </div>\r\n    </body>\r\n    </html>', 'TLS', 'smtp.gmail.com', 'Richiesta Caccia Saperi', 'aomc iqez fopo kcnu', 587, b'1', 'caccia.saperi@gmail.com');

-- --------------------------------------------------------

--
-- Struttura della tabella `informazioni`
--

CREATE TABLE `informazioni` (
  `testo` text NOT NULL,
  `id` bigint(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dump dei dati per la tabella `informazioni`
--

INSERT INTO `informazioni` (`testo`, `id`) VALUES
('Testo di esempio per informazione 1', 11),
('Testo di esempio per informazione 2', 12),
('Testo di esempio per informazione 3', 13),
('Testo di esempio per informazione 4', 14),
('Testo di esempio per informazione 5', 15),
('Testo di esempio per informazione 6', 16),
('Testo di esempio per informazione 7', 17),
('Testo di esempio per informazione 8', 18),
('Testo di esempio per informazione 9', 19),
('Testo di esempio per informazione 10', 20);

-- --------------------------------------------------------

--
-- Struttura della tabella `prenotazioni`
--

CREATE TABLE `prenotazioni` (
  `data_fine` datetime(6) NOT NULL,
  `data_inizio` datetime(6) NOT NULL,
  `testo` text NOT NULL,
  `id` bigint(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dump dei dati per la tabella `prenotazioni`
--

INSERT INTO `prenotazioni` (`data_fine`, `data_inizio`, `testo`, `id`) VALUES
('2025-01-06 10:00:00.000000', '2025-01-05 10:00:00.000000', 'Testo di esempio per prenotazione 1', 1),
('2025-01-07 11:00:00.000000', '2025-01-06 11:00:00.000000', 'Testo di esempio per prenotazione 2', 2),
('2025-01-08 12:00:00.000000', '2025-01-07 12:00:00.000000', 'Testo di esempio per prenotazione 3', 3),
('2025-01-09 13:00:00.000000', '2025-01-08 13:00:00.000000', 'Testo di esempio per prenotazione 4', 4),
('2025-01-10 14:00:00.000000', '2025-01-09 14:00:00.000000', 'Testo di esempio per prenotazione 5', 5),
('2025-01-11 15:00:00.000000', '2025-01-10 15:00:00.000000', 'Testo di esempio per prenotazione 6', 6),
('2025-01-12 16:00:00.000000', '2025-01-11 16:00:00.000000', 'Testo di esempio per prenotazione 7', 7),
('2025-01-13 17:00:00.000000', '2025-01-12 17:00:00.000000', 'Testo di esempio per prenotazione 8', 8),
('2025-01-14 18:00:00.000000', '2025-01-13 18:00:00.000000', 'Testo di esempio per prenotazione 9', 9),
('2025-01-15 19:00:00.000000', '2025-01-14 19:00:00.000000', 'Testo di esempio per prenotazione 10', 10),
('2025-01-15 23:00:00.000000', '2025-01-14 23:00:00.000000', 'asda', 21);

-- --------------------------------------------------------

--
-- Struttura della tabella `richieste`
--

CREATE TABLE `richieste` (
  `id` bigint(20) NOT NULL,
  `cancellato` bit(1) NOT NULL,
  `cognome` varchar(255) NOT NULL,
  `data_creazione` datetime(6) DEFAULT NULL,
  `data_prevista_cancellazione` datetime(6) DEFAULT NULL,
  `email` varchar(255) NOT NULL,
  `nome` varchar(255) NOT NULL,
  `numero` varchar(255) DEFAULT NULL,
  `organizzazione` varchar(255) NOT NULL,
  `status` enum('ARCHIVIATA','CONFERMATA','PRESA_IN_CARICO','RICEVUTA','RIFIUTATA') DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dump dei dati per la tabella `richieste`
--

INSERT INTO `richieste` (`id`, `cancellato`, `cognome`, `data_creazione`, `data_prevista_cancellazione`, `email`, `nome`, `numero`, `organizzazione`, `status`) VALUES
(1, b'0', 'Rossi', '2025-01-01 10:00:00.000000', NULL, 'mario.rossi@example.com', 'Mario', '1234567890', 'Azienda X', 'RICEVUTA'),
(2, b'1', 'Bianchi', '2025-01-02 11:00:00.000000', '2025-01-15 10:00:00.000000', 'luigi.bianchi@example.com', 'Luigi', '2345678901', 'Azienda Y', 'RIFIUTATA'),
(3, b'0', 'Verdi', '2025-01-03 12:00:00.000000', NULL, 'anna.verdi@example.com', 'Anna', '3456789012', 'Azienda Z', 'CONFERMATA'),
(4, b'1', 'Neri', '2025-01-04 13:00:00.000000', '2025-01-18 10:00:00.000000', 'paola.neri@example.com', 'Paola', '4567890123', 'Azienda W', 'ARCHIVIATA'),
(5, b'0', 'Blu', '2025-01-05 14:00:00.000000', NULL, 'carlo.blu@example.com', 'Carlo', '5678901234', 'Azienda V', 'PRESA_IN_CARICO'),
(6, b'1', 'Gialli', '2025-01-06 15:00:00.000000', '2025-01-20 10:00:00.000000', 'elena.gialli@example.com', 'Elena', '6789012345', 'Azienda U', 'ARCHIVIATA'),
(7, b'0', 'Arancio', '2025-01-07 16:00:00.000000', NULL, 'sara.arancio@example.com', 'Sara', '7890123456', 'Azienda T', 'RICEVUTA'),
(8, b'0', 'Viola', '2025-01-08 17:00:00.000000', NULL, 'giulia.viola@example.com', 'Giulia', '8901234567', 'Azienda S', 'CONFERMATA'),
(9, b'0', 'Azzurri', '2025-01-09 18:00:00.000000', NULL, 'marco.azzurri@example.com', 'Marco', '9012345678', 'Azienda R', 'PRESA_IN_CARICO'),
(10, b'1', 'Marroni', '2025-01-10 19:00:00.000000', '2025-01-25 10:00:00.000000', 'laura.marroni@example.com', 'Laura', '0123456789', 'Azienda Q', 'RIFIUTATA'),
(11, b'0', 'Rossi', '2025-01-11 10:00:00.000000', NULL, 'claudio.rossi@example.com', 'Claudio', '0987654321', 'Azienda O', 'RICEVUTA'),
(12, b'1', 'Bianchi', '2025-01-12 11:00:00.000000', '2025-02-01 10:00:00.000000', 'gianni.bianchi@example.com', 'Gianni', '1122334455', 'Azienda N', 'RIFIUTATA'),
(13, b'0', 'Verdi', '2025-01-13 12:00:00.000000', NULL, 'maria.verdi@example.com', 'Maria', '2233445566', 'Azienda M', 'CONFERMATA'),
(14, b'1', 'Neri', '2025-01-14 13:00:00.000000', '2025-02-05 10:00:00.000000', 'lucia.neri@example.com', 'Lucia', '3344556677', 'Azienda L', 'ARCHIVIATA'),
(15, b'0', 'Blu', '2025-01-15 14:00:00.000000', NULL, 'alessio.blu@example.com', 'Alessio', '4455667788', 'Azienda K', 'PRESA_IN_CARICO'),
(16, b'1', 'Gialli', '2025-01-16 15:00:00.000000', '2025-02-10 10:00:00.000000', 'serena.gialli@example.com', 'Serena', '5566778899', 'Azienda J', 'ARCHIVIATA'),
(17, b'0', 'Arancio', '2025-01-17 16:00:00.000000', NULL, 'sofia.arancio@example.com', 'Sofia', '6677889900', 'Azienda I', 'RICEVUTA'),
(18, b'0', 'Viola', '2025-01-18 17:00:00.000000', NULL, 'giada.viola@example.com', 'Giada', '7788990011', 'Azienda H', 'CONFERMATA'),
(19, b'0', 'Azzurri', '2025-01-19 18:00:00.000000', NULL, 'antonio.azzurri@example.com', 'Antonio', '8899001122', 'Azienda G', 'PRESA_IN_CARICO'),
(20, b'1', 'Marroni', '2025-01-20 19:00:00.000000', '2025-02-20 10:00:00.000000', 'luisa.marroni@example.com', 'Luisa', '9900112233', 'Azienda F', 'RIFIUTATA'),
(21, b'0', 'Avdiu', '2025-01-13 21:28:33.000000', NULL, 'avdiu.eand@gmail.com', 'Eand', '+39 3483156301', 'non lo so', 'RICEVUTA'),
(22, b'0', 'ses', '2025-01-18 19:45:42.000000', NULL, 'samuelesicura@gmail.com', 'samu', '1112229988', 'LePalle', 'RICEVUTA');

-- --------------------------------------------------------

--
-- Struttura della tabella `utenti`
--

CREATE TABLE `utenti` (
  `email` varchar(255) NOT NULL,
  `cognome` varchar(255) DEFAULT NULL,
  `nome` varchar(255) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `ruolo` varchar(255) DEFAULT NULL,
  `cancellato` bit(1) NOT NULL,
  `data_prevista_cancellazione` datetime(6) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dump dei dati per la tabella `utenti`
--

INSERT INTO `utenti` (`email`, `cognome`, `nome`, `password`, `ruolo`, `cancellato`, `data_prevista_cancellazione`) VALUES
('eand.avdiu@edu.itspiemonte.it', 'Avdiu', 'Eand', '$2a$10$4tZD/YbYS/aDObw775PNEe45R1XhhmY6csJflXu6pkBwc45DLW89y', 'USER', b'0', NULL);

--
-- Indici per le tabelle scaricate
--

--
-- Indici per le tabelle `email-template`
--
ALTER TABLE `email-template`
  ADD PRIMARY KEY (`id`);

--
-- Indici per le tabelle `informazioni`
--
ALTER TABLE `informazioni`
  ADD PRIMARY KEY (`id`);

--
-- Indici per le tabelle `prenotazioni`
--
ALTER TABLE `prenotazioni`
  ADD PRIMARY KEY (`id`);

--
-- Indici per le tabelle `richieste`
--
ALTER TABLE `richieste`
  ADD PRIMARY KEY (`id`);

--
-- Indici per le tabelle `utenti`
--
ALTER TABLE `utenti`
  ADD PRIMARY KEY (`email`);

--
-- AUTO_INCREMENT per le tabelle scaricate
--

--
-- AUTO_INCREMENT per la tabella `email-template`
--
ALTER TABLE `email-template`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT per la tabella `richieste`
--
ALTER TABLE `richieste`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=23;

--
-- Limiti per le tabelle scaricate
--

--
-- Limiti per la tabella `informazioni`
--
ALTER TABLE `informazioni`
  ADD CONSTRAINT `FKb5w7yti08rd56055derdujdwx` FOREIGN KEY (`id`) REFERENCES `richieste` (`id`);

--
-- Limiti per la tabella `prenotazioni`
--
ALTER TABLE `prenotazioni`
  ADD CONSTRAINT `fk_prenotazioni_richieste` FOREIGN KEY (`id`) REFERENCES `richieste` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
