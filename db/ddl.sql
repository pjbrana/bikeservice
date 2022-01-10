-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='TRADITIONAL,ALLOW_INVALID_DATES';

-- -----------------------------------------------------
-- Schema bikeservice
-- -----------------------------------------------------
DROP SCHEMA IF EXISTS `bikeservice` ;

-- -----------------------------------------------------
-- Schema bikeservice
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `bikeservice` DEFAULT CHARACTER SET utf8 ;
USE `bikeservice` ;

-- -----------------------------------------------------
-- Table `bikeservice`.`servicing_tbl`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `bikeservice`.`servicing_tbl` ;

CREATE TABLE IF NOT EXISTS `bikeservice`.`servicing_tbl` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `bill_amount` FLOAT NOT NULL,
  `bill_picture` LONGBLOB NULL,
  `created_date` DATETIME NULL,
  `modified_date` DATETIME NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `bikeservice`.`parts_details`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `bikeservice`.`parts_details` ;

CREATE TABLE IF NOT EXISTS `bikeservice`.`parts_details` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(45) NULL,
  `price` VARCHAR(45) NULL,
  `company` VARCHAR(45) NULL,
  `quantity` INT NULL,
  `created` DATETIME NULL,
  `modified` DATETIME NULL,
  `servicing_tbl_id` INT NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_parts_details_servicing_tbl_idx` (`servicing_tbl_id` ASC),
  CONSTRAINT `fk_parts_details_servicing_tbl`
    FOREIGN KEY (`servicing_tbl_id`)
    REFERENCES `bikeservice`.`servicing_tbl` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
