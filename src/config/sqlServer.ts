import sql, { config } from "mssql";
import "dotenv/config";

const sqlConfig: config = {
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  server: String(process.env.DB_SERVER),
  database: process.env.DB_DATABASE,
  options: {
    encrypt: true,
    trustServerCertificate: true,
    enableArithAbort: true,
  },
};

export const poolConexion = async () => {
  try {
    const pool = await sql.connect(sqlConfig);
    //    const resultado = await pool.request().query("SELECT 1")
    //      console.log(resultado)

    return pool;
  } catch (error) {
    console.log(error);
  }
};
