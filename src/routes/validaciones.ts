import {Router} from 'express'
import {postCtrl} from '../controllers/validacionesCtrl'
const router = Router()


router.post("/",postCtrl)
router.get("/g",)

export{
    router
}