DROP DATABASE IF EXISTS bamazon;
CREATE DATABASE bamazon;

USE bamazon;

CREATE TABLE products(
  item_id INT NOT NULL AUTO_INCREMENT,
  product_name VARCHAR(50) NOT NULL,
  department_name VARCHAR(50) NOT NULL,
  price DECIMAL(10,3)NULL,
  stock_quantity INT,
  PRIMARY KEY (item_id)
);


INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("White T-Shirt", "Clothing Department", 9.99, 100);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Running Shoes", "Shoe Department", 57.89, 10);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Tap Dancing Shoes", "Shoe Department", 42.29, 5);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Blue Dress", "Clothing Department", 124.55, 7);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Bananas", "Grocery Store", 0.66, 7999);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Laptop", "Electronics", 999.99, 15);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Ipod", "Electronics", 99.99, 2);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Canoe", "Outdoors", 699.99, 1);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Steak", "Grocery Store", 9.99, 44);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Bluetooth Speaker", "Electronics", 39.79, 6);

SELECT * FROM products;

-- highest value in a cloumn
select max(item_id) from products;

UPDATE products SET stock_quantity = stock_quantity - 1 + WHERE item_id = 8;
SELECT * FROM products;
