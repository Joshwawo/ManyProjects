import { Router, Request, Response } from "express";
import { root,postVoices,test,voiceList } from "../controllers/voices";

const router = Router();

router.get("/", root);
router.post('/tss',postVoices)
router.get("/voices",voiceList)
router.get('/test',test)

export { router };
