import { Router } from "express";
import { getMeme,getMemeImg,getMemeImgCm,getMemeImgCat } from "../controllers/memeCtrl";

const router = Router();

router.get("/text/:input", getMeme);
router.get('/meme/:input/:url*',getMemeImg)
router.get('/cm/:url*',getMemeImgCm)
router.get('/say/',getMemeImgCat)

export { router };
