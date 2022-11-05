import {Router, Request, Response} from 'express'
import {getDalle,testPost,getImagenes} from '../controllers/dalleCtrl'
import checkAuth from '../middlewares/checkAuth'

const router = Router()

router.post("/dalle",checkAuth,getDalle) 
router.get("/images",checkAuth,getImagenes)
router.post("/test",checkAuth,testPost)
export{
    router
}