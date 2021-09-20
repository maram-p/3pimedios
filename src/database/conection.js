const {Pool} = require('pg');

const pool = new Pool({
    host: 'localhost',
    user: 'postgresadmin',
    password: 'admin123',
    database: 'tiendaDaniela',
    port: '5434'

});

module.exports = {pool};