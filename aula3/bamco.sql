-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema IDEV3
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema IDEV#
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `IDEV3` DEFAULT CHARACTER SET utf8 ;
USE `IDEV3` ;

-- -----------------------------------------------------
-- Table `IDEV3`.`table1`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `IDEV3`.`table1` (
  `idtable1` INT NOT NULL,
  `nome` VARCHAR(45) NOT NULL,
  `senha` VARCHAR(45) NOT NULL,
  `Email` VARCHAR(45) NOT NULL,
  `cpf` VARCHAR(20) NOT NULL,
  `telefone` VARCHAR(20) NOT NULL,
  PRIMARY KEY (`idtable1`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `IDEV3`.`USUARIO`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `IDEV3`.`USUARIO` (
  `idusuario` INT NOT NULL AUTO_INCREMENT,
  `endereco` VARCHAR(45) NOT NULL,
  `Email` VARCHAR(45) NOT NULL,
  `senha` VARCHAR(45) NOT NULL,
  `telefone` VARCHAR(20) NOT NULL,
  `CPF` CHAR(20) NOT NULL,
  PRIMARY KEY (`idusuario`))
ENGINE = InnoDB;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;