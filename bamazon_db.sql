-- Drops the bamazon_db if it exists currently --
DROP DATABASE IF EXISTS bamazon_db;
-- Creates the "animals_db" database --
CREATE DATABASE bamazon_db;

-- Makes it so all of the following code will affect animals_db --
USE bamazon_db;

CREATE TABLE products (

item_id INT AUTO_INCREMENT  NOT NULL,
product_name VARCHAR(100) NULL,
department_name VARCHAR(100) NULL,
price DECIMAL(10,2) NULL ,
stock_quantity INT NULL,
PRIMARY KEY(item_id)

);

INSERT INTO products (product_name, department_name, price, stock_quantity) VALUES
("Face Masks", "Clothing", 1.99, 100),
("Micro SD Card", "Electronic",29.95, 150),
("Wireless Mouse", "Electronic", 14.99, 200),
("Pan Set", "Kitchen", 54.95, 150),
("Knife Set", "Kitchen", 49.98, 180),
("Star Wars Blue-Ray", "Movies", 17.25, 100),
("Pens 2-Packs", "Office Product", 2.35, 300),
("Ink Cartridge", "Office Product", 32.99, 50),
("Footballs", "Sport", 15.95, 250),
("Yoga Mat", "Sport", 23.25, 150),
("Whole Milk", "Food & Drink", 5.89, 400),
("Bread", "Food & Drink", 3.49, 300);


