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
//TODO: Activar la whitelist del cors
// Configurar cors
const whiteList = [process.env.FRONTEND_URL,"http://localhost:3001", `${process.env.OWN_HOST}`,"http://localhost:5173",process.env.OWN_HOST_GAMES];

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
app.use(cors());
dbConnect();
app.use(morgan('dev'))
app.use(express.json());
app.use(
  fileupload({
    useTempFiles: true,
    tempFileDir: "./upload",
  })
);

app.use(router);


app.listen(PORT, () => {
  console.log(`Servidor corriendo en el http://localhost:${PORT}`);
});
