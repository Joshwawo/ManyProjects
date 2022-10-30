import express from "express";
import cors from "cors";
import "dotenv/config";
import fileupload from "express-fileupload";
import { router } from "./routes";
import { dbConnect } from "./config/mongo";
import morgan from 'morgan'

const PORT = process.env.PORT || 3000;

export const JTW_SECRET = process.env.JTW_SECRET ;

const app = express();
// Configurar cors
const whiteList = [process.env.FRONTEND_URL,"http://localhost:3001", 'https://jorgemorales.vercel.app'];

const corsOptions = {
  origin: function (origin:any, callback:any) {
    console.log(origin);
    if (whiteList.includes(origin)) {
      //Puede consultar la api
      callback(null, true);
    } else {
      //No esta permitido
      callback(new Error("Error de Cors, habla con el administador del sitio para mas informacion"));
    }
  },
};

app.use(cors(corsOptions));
// app.use(cors());
app.use(morgan('combined'))
app.use(express.json());
app.use(
  fileupload({
    useTempFiles: true,
    tempFileDir: "./upload",
  })
);

app.use(router);

dbConnect();

app.listen(PORT, () => {
  console.log(`Servidor corriendo en el http://localhost:${PORT}`);
});
