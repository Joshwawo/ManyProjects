import { sign, verify } from "jsonwebtoken";
import "dotenv/config";
import { JTW_SECRET } from '../app';
console.log('gola desde jwt.handle')

// console.log(process.env.JTW_SECRET);

// const JTW_SECRET = process.env.JTW_SECRET || "estoesunacontraseñasupersecreta";

// const generateToken = async (id: object) => {
//   const jwt = sign({ id }, JTW_SECRET, { expiresIn: "2h" });

//   return jwt;
// };

// const generateToken = async (id: string) => {
//   const jwt = sign({ id }, JTW_SECRET, { expiresIn: "2h" });

//   return jwt;
// };

// const verifyToken = async (jwt: string   ) => {
//   const isOk = verify(jwt,JTW_SECRET );

//   return isOk;
// };

// export { generateToken, verifyToken };
