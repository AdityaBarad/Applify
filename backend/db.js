import pg from 'pg';

const db = new pg.Client({
  user: 'postgres',
  host: 'localhost',
  database: 'applify_db',
  password: 'Aditya@2004',
  port: 5432,
});

db.connect();

export default db;
