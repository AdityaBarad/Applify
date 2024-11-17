import pg from 'pg';

const db = new pg.Client({
  user: '',
  host: 'localhost',
  database: '',
  password: '',
  port: 5432,
});

db.connect();

export default db;
