import {Router} from 'express'
import {agua,root} from '../controllers/aguaCtrl'

const router = Router()

router.get("/",root)
router.get("/agua",agua)

export{
    router
}