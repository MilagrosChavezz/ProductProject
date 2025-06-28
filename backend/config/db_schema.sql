CREATE DATABASE shopzone_db;
USE shopzone_db;


select * from users;

CREATE TABLE users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  email VARCHAR(100) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  firstName VARCHAR(100),
  lastName VARCHAR(100),
  address TEXT
);

CREATE TABLE products (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100),
  description TEXT,
  price DECIMAL(10,2),
  imageUrl VARCHAR(255),
  category VARCHAR(50)
);


CREATE TABLE orders (
  id INT AUTO_INCREMENT PRIMARY KEY,
  userId INT,
  totalPrice FLOAT,
  status VARCHAR(20),
  FOREIGN KEY (userId) REFERENCES users(id)
);

CREATE TABLE product_order (
  id INT AUTO_INCREMENT PRIMARY KEY,
  productId INT,
  orderId INT,
  FOREIGN KEY (orderId) REFERENCES orders(id),
  FOREIGN KEY (productId) REFERENCES products(id)
);
ALTER TABLE product_order ADD COLUMN quantity INT DEFAULT 1;
ALTER TABLE users ADD COLUMN role VARCHAR(20) DEFAULT 'user';
ALTER TABLE orders ADD COLUMN status VARCHAR(20) DEFAULT 'open';

INSERT INTO users (email, password, firstName, lastName, role) 


SHOW CREATE TABLE orders;

