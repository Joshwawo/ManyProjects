import {Router,Request, Response} from 'express'
import {postCorreo,getCorreos,deleteCorreo,deleteAllCorreos} from '../controllers/emailsCtrl'
import checkAuth from '../middlewares/checkAuth'

const router = Router()

router.route("/").post(checkAuth,postCorreo).get(checkAuth,getCorreos).delete(checkAuth,postCorreo)
router.delete("/email/:id",checkAuth,deleteCorreo)
router.delete("/all",checkAuth,deleteAllCorreos)


export{
    router
}