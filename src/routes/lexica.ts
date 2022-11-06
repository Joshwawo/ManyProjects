import { Router } from "express";
import { getPrompt } from "../controllers/lexicaCtrl";

const router = Router();

router.get("/search", getPrompt);

export{
    router
}
