// import { NextFunction, Request, Response } from "express";
// // import { verifyToken } from "../utils/jwt.hanle";
// import {RequestExt} from '../interfaces/reqExt'


// //TODO:Cambiar esto a una Interface
// // interface RequestExt extends Request {
// //   user?: string | JwtPayload;
// // }



// const checkJwt = async (req: RequestExt, res: Response, next: NextFunction) => {
//   try {
//     const jwtByUser = req.headers.authorization || "";

//     const jwt = jwtByUser.split(" ").pop(); //['Bearer, "token"]

//     // const isUser = verifyToken(`${jwt}`);

//     console.log(isUser);

//     if (!isUser) {
//       res.status(401);
//       res.send("No tienes un jwt valido");
//     } else {
//       req.user = isUser
//       console.log({ jwtByUser });
//       next();
//     }

//     // console.log(isOk)
//   } catch (error) {
//     console.log(error);

//     res.status(400);
//     res.send("Session no valida");
//   }
// };

// export { checkJwt };
console.log('Hola desde middkeware auth')