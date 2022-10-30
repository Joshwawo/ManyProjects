import { Request, Response, Router } from "express";
import {
  deleteItems,
  getItem,
  getItems,
  posttItems,
  updateItems,
} from "../controllers/item";
import checkAuth from "../middlewares/checkAuth";
import { logMiddleWare } from "../middlewares/log";

const router = Router();

router.get("/posts", checkAuth,getItems);
router.get("/post/:id", checkAuth,getItem);
router.post("/posts",checkAuth, posttItems);
router.put("/post/:id", checkAuth,updateItems);
router.delete("/post/:id", checkAuth,deleteItems);

export { router };
