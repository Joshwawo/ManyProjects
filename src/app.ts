import "dotenv/config";
import express from "express";
import cors from "cors";
import morgan from "morgan";
import fileupload from "express-fileupload";
import swaggerUi from "swagger-ui-express";
import swaggerJsDoc from "swagger-jsdoc";
import helmet from "helmet";
import compression from "compression";
import axios, { AxiosResponse } from "axios";
import colors from 'colors'

import { router } from "./routes";
import { dbConnect } from "./config/mongo";
import swagger_pathJson from "./utils/swaggerJson.json";
import { convertMsToMIn } from "./helpers/convertMsToMins";

// const swaggerDocument = YAML.load('./swagger.yaml');
// const swagger_path = path.resolve(__dirname, "./utils/swagger.yaml");
// const swaggerDocument = YAML.load(swagger_path);
// console.log(swagger_path);
// console.log(swagger_pathJson);

export const swaggerSpec: swaggerJsDoc.Options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "API DOCUMENTATION",
      version: "1.0.0",
      description: "API DOCUMENTATION FOR THE THIS APP",
    },
    servers: [
      {
        url: "http://localhost:3003",
      },
      {
        url: "https://api-projects.up.railway.app",
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },
    },
  },
  apis: ["./src/routes/*.ts", "./src/routes/*.js"],
  // apiss: [`${path.join(__dirname, "./routes/*.ts")}`],
  // apis: [`${path.join(__dirname, "./routes/*.ts", "./routes/*.js")}`],
};

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
app.use(
  "/api-docs",
  swaggerUi.serve,
  swaggerUi.setup(swaggerJsDoc(swaggerSpec))
);
// app.use("/api-yaml", swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use("/api-json", swaggerUi.serve, swaggerUi.setup(swagger_pathJson));
const call = async (): Promise<void> => {
  try {
    const url = "http://localhost:3003/scrap/lift";
    const urlProd = "https://api-projects.up.railway.app/scrap/lift";

    const timer = 900 * 1000;
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

call();

app.listen(PORT, () => {
  console.log(`Servidor corriendo en el http://localhost:${PORT}`);
});
