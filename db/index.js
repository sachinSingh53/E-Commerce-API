const { Pool } = require('pg');

const pool = new Pool({
    user: 'sachin',
    host: 'postgres_container',
    database: 'ecommerce',
    password: 'sachin',
    port: 5432,
});

pool.on('error', (err, client) => {
    console.error('Unexpected error on idle client', err);
    process.exit(-1);
});

// Function to create tables
async function createTables() {
    try {
        // Define your SQL queries for creating tables
        const createTableQueries = [
            `CREATE TABLE categories (
                category_id SERIAL PRIMARY KEY,
                name VARCHAR(100) NOT NULL,
                description TEXT
            );`,
            `CREATE TABLE products (
                product_id SERIAL PRIMARY KEY,
                name VARCHAR(255) NOT NULL,
                description TEXT,
                price DECIMAL(10, 2) NOT NULL,
                availability BOOLEAN NOT NULL,
                category_id INT,
                FOREIGN KEY (category_id) REFERENCES categories(category_id)
            );`,
            `CREATE TABLE users (
                user_id SERIAL PRIMARY KEY,
                username VARCHAR(50) UNIQUE NOT NULL,
                password VARCHAR(255) NOT NULL,
                email VARCHAR(100) UNIQUE NOT NULL,
                full_name VARCHAR(100),
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            );`,
            `CREATE TABLE orders (
                order_id SERIAL PRIMARY KEY,
                product_id INT NOT NULL,
                quantity INT NOT NULL,
                price DECIMAL(10, 2) NOT NULL,
                address TEXT NOT NULL,
                user_id INT,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                FOREIGN KEY (user_id) REFERENCES users(user_id),
                FOREIGN KEY (product_id) REFERENCES products(product_id)
            );`

        ];

        // Execute each query in the array
        for (const query of createTableQueries) {
            await pool.query(query);
        }
        console.log('Tables created successfully');
    } catch (error) {
        console.error('Error creating tables', error);
        throw error; // Rethrow the error for handling elsewhere if needed
    }
}

module.exports = {
    query: (text, params) => pool.query(text, params),
    createTables: createTables // Export the function to create tables
};
