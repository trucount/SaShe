
CREATE TABLE products (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    srcUrl VARCHAR(255),
    gallery TEXT, -- Storing as JSON string
    price DECIMAL(10, 2) NOT NULL,
    discount_amount DECIMAL(10, 2) DEFAULT 0.00,
    discount_percentage DECIMAL(5, 2) DEFAULT 0.00,
    rating DECIMAL(2, 1),
    specifications TEXT, -- Storing as JSON string
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE contact_submissions (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    message TEXT,
    submitted_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE orders (
    id INT AUTO_INCREMENT PRIMARY KEY,
    order_id VARCHAR(255) UNIQUE NOT NULL,
    full_name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    phone_number VARCHAR(50),
    address TEXT,
    whatsapp_number VARCHAR(50),
    total_price DECIMAL(10, 2) NOT NULL,
    adjusted_total_price DECIMAL(10, 2) NOT NULL,
    products_ordered TEXT, -- Storing as JSON string
    order_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
