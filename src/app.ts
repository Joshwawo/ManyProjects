import "dotenv/config";
import express , {Request, Response} from "express";
import cors from "cors";
import morgan from "morgan";
import fileupload from "express-fileupload";
import swaggerUi from "swagger-ui-express";
import helmet from "helmet";
import compression from "compression";
import axios, { AxiosResponse } from "axios";
import colors from 'colors'
import { router } from "./routes";
import { dbConnect } from "./config/mongo";
import swagger_pathJson from "./utils/swaggerJson.json";
import { convertMsToMIn } from "./helpers/convertMsToMins";
import checkAuth from './middlewares/checkAuth'


const PORT = process.env.PORT || 3000;

export const JTW_SECRET = process.env.JTW_SECRET;
colors.enable()
const app = express();

//TODO: Activar la whitelist del cors
// Configurar cors
// const whiteList = [process.env.FRONTEND_URL,"http://localhost:3001", `${process.env.OWN_HOST}`,"http://localhost:5173",process.env.OWN_HOST_GAMES];

// const corsOptions = {
//   origin: function (origin:any, callback:any) {
//     console.log(origin);
//     if (whiteList.includes(origin)) {
//       //Puede consultar la api
//       callback(null, true);
//     } else {
//       //No esta permitido
//       callback(new Error("Error de Cors, habla con el administador del sitio para mas informacion"));
//     }
//   },
// };

// app.use(cors(corsOptions));
//as
app.use(cors());
app.use(compression());
// app.set("trust proxy", true);
dbConnect();
app.use(helmet());
app.use(morgan("dev"));
app.use(express.json());
// app.use(express.urlencoded({ extended: false }));
app.use(
  fileupload({
    useTempFiles: true,
    tempFileDir: "./upload",
  })
);
app.use(router);

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swagger_pathJson));
const call = async (): Promise<void> => {
  console.log('Entre'.white)
  try {
    const url = "http://localhost:3003/scrap/lift";
    const urlProd = "https://api-projects.up.railway.app/agua/salsa";

    const timer = 900 * 1000;
    const timer7 = 2000
    const { data }: AxiosResponse = await axios.get(urlProd);
    console.log({
      response: data.message,
      time: `Han pasado ${convertMsToMIn(timer)} minutos`,
    });
    setTimeout(() => call(), timer);
  } catch (error) {
    console.log(error);
    console.log("uno un error en la fn call".red);
  }
};

app.use("*",checkAuth,(_req:Request, res:Response)=>{
  res.json({message: 'This route does exist'})
})

// const pathIn = path.join(__dirname, "../../towebp.jpg");
//     console.log(pathIn)

call();

app.listen(PORT, () => {
  console.log(`Servidor corriendo en el http://localhost:${PORT}`);
});
