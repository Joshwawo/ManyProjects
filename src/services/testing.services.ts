// import { poolConexion } from "../config/sqlServer";

// const dateFetch = async (start: string, end: string) => {
//   try {
//     const pool = await poolConexion();
//     // const result = await pool?.request().query("select * from dbo.timestampDemo");
//     //   const result = await pool
//     //     ?.request()
//     //     .query(
//     //       `SELECT * FROM timestampDemo WHERE created_at BETWEEN '${start}' AND '${end}'`
//     //     );
//     const result = await pool
//       ?.request()
//       .query(
//         `SELECT * FROM timestampDemo WHERE created_at BETWEEN '${start}' AND '${end}'`
//       );

//     return result?.recordset;
//   } catch (error) {
//     console.log(error);
//   }
// };

// export { dateFetch };

console.log('Desde el service de testing')
