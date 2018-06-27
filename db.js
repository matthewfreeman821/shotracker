const pgp = require('pg-promise')();
const cn = {
    host: 'localhost',
    port: 5432,
    database: 'shottracker',
    user: 'postgres',
    password: ''
};
const db = pgp(cn);