import {Router, Request, Response} from 'express'
import {postImgSus,getImgSus,getRandomImg} from '../controllers/imagesCtrl'

const router = Router();

router.post('/sus',postImgSus)
router.get('/sus',getImgSus)
router.get('/sus/random',getRandomImg)

export{
    router
}