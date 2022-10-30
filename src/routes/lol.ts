import {Router} from 'express';
import {getChamps,getSummoner} from '../controllers/lolCtrl'
import checkAuth from '../middlewares/checkAuth';

const router = Router()


router.get("/champs", checkAuth,getChamps)
router.get("/summoner",checkAuth,getSummoner )
 
export {router}