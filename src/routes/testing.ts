import { Router } from "express";
import {
  testingParams,
  userData,
  queryMongo,
  queryBeetWeenDates,
  queryByNameAndDate,
    sqlTest,
} from "../controllers/testingCtl";
import checkAuth from "../middlewares/checkAuth";

const router = Router();

router.get("/test/:name&:lastname&:bg", checkAuth,testingParams);
router.get("/user", checkAuth,userData);

router.get("/query", checkAuth,queryMongo);

router.get("/date", checkAuth,queryBeetWeenDates);
router.get("/name", checkAuth,queryByNameAndDate);
router.get("/sql", checkAuth,sqlTest);

export { router };
