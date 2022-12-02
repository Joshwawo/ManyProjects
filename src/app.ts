import "dotenv/config";
import express from "express";
import cors from "cors";
import morgan from "morgan";
import fileupload from "express-fileupload";
import swaggerUi from "swagger-ui-express";
import swaggerJsDoc from "swagger-jsdoc";

import { router } from "./routes";
import { dbConnect } from "./config/mongo";
import path from "path";
// import {swaggerSpec} from './utils/swaggerConfig'

export const swaggerSpec:swaggerJsDoc.Options = {
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
    components:{
      securitySchemes:{
        bearerAuth:{
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT"
        }
      }
    },
    

    
  },
  // apis: ["./src/routes/*.ts"],
  apis: [`${path.join(__dirname, "./routes/*.ts")}`],
};

const PORT = process.env.PORT || 3000;

export const JTW_SECRET = process.env.JTW_SECRET;

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
// app.set("trust proxy", true);
dbConnect();
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

app.listen(PORT, () => {
  console.log(`Servidor corriendo en el http://localhost:${PORT}`);
});
