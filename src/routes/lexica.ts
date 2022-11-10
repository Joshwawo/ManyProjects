import { Router } from "express";
import { getPrompt,postPrompt,postImgTest } from "../controllers/lexicaCtrl";

const router = Router();

router.get("/search", getPrompt);
router.post("/search", postPrompt);
router.post("/test", postImgTest);

export{
    router
}
