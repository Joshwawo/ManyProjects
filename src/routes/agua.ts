import {Router} from 'express'
import {agua,root,salsaServies,lecheServices} from '../controllers/aguaCtrl'

const router = Router()

router.get("/",root)
router.get("/agua",agua)
router.get("/salsa",salsaServies)
router.get("/leche",lecheServices)

export{
    router
}