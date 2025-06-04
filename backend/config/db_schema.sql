CREATE DATABASE shopzone_db;
USE shopzone_db;


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
  productId INT,
  quantity INT DEFAULT 1,
  FOREIGN KEY (userId) REFERENCES users(id),
  FOREIGN KEY (productId) REFERENCES products(id)
);
