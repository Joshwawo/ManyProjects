// import { Request, Response } from "express";

// import { loginUser, registerNewUser } from "../services/authServices";
// import { getItemsCars } from "../services/item";

// const registerController = async (req: Request, res: Response) => {
//   const body = req.body;

//   const respuestaUser = await registerNewUser(body);

//   if (respuestaUser === "Ya_existe_el_usuario") {
//     res.status(403);
//     res.send(respuestaUser);
//   } else {
//     res.send(respuestaUser);
//   }
//   // res.send(respuestaUser);
// };

// const LoginController = async (req: Request, res: Response) => {
//   const body = req.body;

//   const { email, password } = body;

//   const respuestaUser = await loginUser({ email, password });
//   // res.send(respuestaUser);

//   if (respuestaUser === "Contraseña_incorrecta") {
//     res.status(403);
//     res.send(respuestaUser);
//   } else {
//     res.send(respuestaUser);
//   }
// };

// const testing = async (req: Request, res: Response) => {
//   try {
//     const respuesta = await getItemsCars();
//     res.send(respuesta);
//   } catch (error) {
//     console.log(error);
//   }
// };

// export { registerController, LoginController, testing };

console.log('Hola desde auth controllers')