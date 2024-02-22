const { Pool } = require('pg');

const pool = new Pool({
    user: 'sachin', // This should match POSTGRES_USER in your Docker Compose file
    host: 'postgres_container', // Since you're using port mapping, you can use localhost
    database: 'ecommerce', // This should match POSTGRES_DB in your Docker Compose file
    password: 'sachin', // This should match POSTGRES_PASSWORD in your Docker Compose file
    port: 5432, // This should match the port mapping in your Docker Compose file
});

pool.on('error', (err, client) => {
    console.error('Unexpected error on idle client', err);
    process.exit(-1);
});

module.exports = {
    query: (text, params) => pool.query(text, params),
    // pool: pool // If you need access to the pool object elsewhere
};