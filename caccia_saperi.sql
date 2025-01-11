-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jan 11, 2025 at 03:57 PM
-- Server version: 10.4.28-MariaDB
-- PHP Version: 8.2.4

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
-- Table structure for table `informazioni`
--

CREATE TABLE `informazioni` (
  `testo` text NOT NULL,
  `id` bigint(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `informazioni`
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
-- Table structure for table `prenotazioni`
--

CREATE TABLE `prenotazioni` (
  `data_fine` datetime(6) NOT NULL,
  `data_inizio` datetime(6) NOT NULL,
  `testo` text NOT NULL,
  `id` bigint(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `prenotazioni`
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
('2025-01-15 19:00:00.000000', '2025-01-14 19:00:00.000000', 'Testo di esempio per prenotazione 10', 10);

-- --------------------------------------------------------

--
-- Table structure for table `richieste`
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
-- Dumping data for table `richieste`
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
(20, b'1', 'Marroni', '2025-01-20 19:00:00.000000', '2025-02-20 10:00:00.000000', 'luisa.marroni@example.com', 'Luisa', '9900112233', 'Azienda F', 'RIFIUTATA');

-- --------------------------------------------------------

--
-- Table structure for table `utenti`
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
-- Dumping data for table `utenti`
--

INSERT INTO `utenti` (`email`, `cognome`, `nome`, `password`, `ruolo`, `cancellato`, `data_prevista_cancellazione`) VALUES
('a', 'a', 'a', '$2a$10$4tZD/YbYS/aDObw775PNEe45R1XhhmY6csJflXu6pkBwc45DLW89y', 'USER', b'0', NULL);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `informazioni`
--
ALTER TABLE `informazioni`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `prenotazioni`
--
ALTER TABLE `prenotazioni`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `richieste`
--
ALTER TABLE `richieste`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `utenti`
--
ALTER TABLE `utenti`
  ADD PRIMARY KEY (`email`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `richieste`
--
ALTER TABLE `richieste`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=21;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `informazioni`
--
ALTER TABLE `informazioni`
  ADD CONSTRAINT `FKb5w7yti08rd56055derdujdwx` FOREIGN KEY (`id`) REFERENCES `richieste` (`id`);

--
-- Constraints for table `prenotazioni`
--
ALTER TABLE `prenotazioni`
  ADD CONSTRAINT `FKd78arqfk8mdpejnmp2oe2y0c6` FOREIGN KEY (`id`) REFERENCES `richieste` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
