
CREATE DATABASE IF NOT EXISTS shopzone_db;
USE shopzone_db;


CREATE TABLE users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  email VARCHAR(100) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  firstName VARCHAR(100),
  lastName VARCHAR(100),
  address TEXT,
  role VARCHAR(20) DEFAULT 'user'
);


CREATE TABLE products (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  description TEXT,
  price DECIMAL(10,2) NOT NULL,
  imageUrl VARCHAR(255),
  category VARCHAR(50)
);


CREATE TABLE orders (
  id INT AUTO_INCREMENT PRIMARY KEY,
  userId INT,
  totalPrice FLOAT,
  status VARCHAR(20) DEFAULT 'open',
  FOREIGN KEY (userId) REFERENCES users(id)
);


CREATE TABLE product_order (
  id INT AUTO_INCREMENT PRIMARY KEY,
  productId INT,
  orderId INT,
  quantity INT DEFAULT 1,
  FOREIGN KEY (orderId) REFERENCES orders(id),
  FOREIGN KEY (productId) REFERENCES products(id),
  UNIQUE KEY unique_order_product (orderId, productId)
);

INSERT INTO products (name, description, price, imageUrl, category)
VALUES 
('Lenovo Laptop', 'Powerful and reliable Lenovo laptop ideal for office productivity, web browsing, and light multimedia tasks. Equipped with the latest processor and 8GB RAM for smooth performance.', 600.00, '/uploads/1751999210336-lenovo.jpg', 'Electronics'),
('Samsung Smartphone', 'Feature-packed Samsung smartphone with high-resolution camera, vibrant display, long-lasting battery, and ample storage. Perfect for photography enthusiasts and everyday use.', 350.00, '/uploads/1751999210455-samsung.jpg', 'Electronics'),
('Bluetooth Earbuds', 'Compact and wireless Bluetooth earbuds delivering crystal-clear sound quality, noise isolation, and up to 8 hours of battery life. Comes with a portable charging case for convenience.', 50.00, '/uploads/1751999210555-earbuds.jpg', 'Accessories'),
('Nike Sneakers', 'Comfortable and durable Nike running sneakers designed for everyday wear. Provides excellent cushioning, breathability, and traction to enhance your workout experience.', 120.00, '/uploads/1751999210666-nike.jpg', 'Clothing'),
('Travel Backpack', 'Spacious and sturdy travel backpack with multiple compartments, padded laptop sleeve, and ergonomic straps. Ideal for daily commuting or weekend trips.', 80.00, '/uploads/1751999210777-backpack.jpg', 'Accessories');
