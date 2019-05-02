DROP DATABASE IF EXISTS bamazon;

CREATE DATABASE bamazon;

USE bamazon;

CREATE TABLE products (
  item_id INT NOT NULL AUTO_INCREMENT,
  product_name VARCHAR(80) NOT NULL,
  department_name VARCHAR(80) NOT NULL,
  price DECIMAL(6,2) NOT NULL,
  stock_quantity INT(30) NOT NULL,
  PRIMARY KEY (item_id)
);

insert into products(product_name,department_name,price,stock_quantity)
values("Fire TV Stick 4k with Alexa Voice Remote","Electronics",49.99,100);

insert into products(product_name,department_name,price,stock_quantity)
values("Instant Pot Ulrtra 3 Qt 10-in-1 Pressure Cooker","Appliances",99.99,150);

insert into products(product_name,department_name,price,stock_quantity)
values("Samsonite Winfield 2 Hardside Luggage ","Travel Gear",74.99,85);

insert into products(product_name,department_name,price,stock_quantity)
values("Alienware 25 Gaming Monitor","Electronics",465.00,200);

insert into products(product_name,department_name,price,stock_quantity)
values("Weber Black Spirit II Gas Grill","Lawn & Garden",449.99,50);

insert into products(product_name,department_name,price,stock_quantity)
values("Marmot Crane Creek Backpacking and Camping tent","Sports & Outdoors",179.99,120);

insert into products(product_name,department_name,price,stock_quantity)
values("Codenames","Toys & Games",16.99,300);

insert into products(product_name,department_name,price,stock_quantity)
values("Nintendo Switch w/ Gray Joy-con","Video Games",299.99,275);

insert into products(product_name,department_name,price,stock_quantity)
values("Asus GeForce RTX 2080","Computers & Accessories",789.99,350);

insert into products(product_name,department_name,price,stock_quantity)
values("CamelBak M.U.L.E Hydration Pack 100oz","Sports & Outdoors",109.95,400);


SELECT * FROM products;