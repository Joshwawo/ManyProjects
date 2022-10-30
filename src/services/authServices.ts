// import { Auth } from "../interfaces/auth.interfaces";
// import { User } from "../interfaces/user.interfaces";
// import UserModel from "../models/auth";
// import { encrypt, verified } from "../utils/bcrypt.hanle";
// import { generateToken } from "../utils/jwt.hanle";

// const registerNewUser = async ({ email, password, name }: User) => {
//   const exist = await UserModel.findOne({ email });

//   if (exist) return "Ya_existe_el_usuario";

//   const pwdHash = await encrypt(password)

//   const registerNewUser = await UserModel.create({ email, password:pwdHash, name });
//   return registerNewUser;
// };

// const loginUser = async ({email, password}:Auth) => {

//   const exist = await UserModel.findOne({ email });

//   if (!exist) return "No existe el usuario";

//   const passwordHash = exist.password

//   const isCorrect = await verified(password, passwordHash)

//   if(!isCorrect) return "Contraseña_incorrecta"

//   const token = await generateToken(exist.email)
  

//   const data = {
//     token,
//     user:exist
//   }

//   return data

// };

// export { registerNewUser, loginUser };

console.log('AuthServices')
