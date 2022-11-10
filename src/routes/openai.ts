import {Router, Request, Response} from 'express'
import {getDalle,testPost,getImagenes,cloudinarySave} from '../controllers/dalleCtrl'
import checkAuth from '../middlewares/checkAuth'

const router = Router()

router.post("/dalle",checkAuth,getDalle) 
router.get("/images",checkAuth,getImagenes)
router.post("/test",checkAuth,testPost)
router.post("/cd",checkAuth,cloudinarySave)
export{
    router
}