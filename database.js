import mysql from 'mysql2/promise';
import 'dotenv/config';

let { DATABASE, DATABASE_USER, DATABASE_HOST, DATABASE_PASS, DATABASE_PORT } = process.env;

const pool = mysql.createPool({
     host: DATABASE_HOST,
     user: DATABASE_USER,
     password: DATABASE_PASS,
     database: DATABASE,
     port: DATABASE_PORT,
     waitForConnections: true,
     connectionLimit: 20,
     queueLimit: 0
});

export async function query(sql, values) {
     const [results] = await pool.execute(sql, values);
     return results;
}

try {
     const connection = await pool.getConnection();
     console.log('Conectado ao MySQL com pool de conexões!');
     connection.release();
} catch (err) {
     console.error('Erro ao conectar ao banco de dados:', err);
}

export default pool;
