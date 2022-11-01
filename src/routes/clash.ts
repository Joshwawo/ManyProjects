import {Router} from 'express'
import {getCards,getPlayerTag,getUpcomingchest ,getClan} from '../controllers/clashCtrl'  
import checkAuth from '../middlewares/checkAuth'

const router = Router()


router.get("/cards", checkAuth,getCards)
router.get("/player",checkAuth,getPlayerTag)
router.get("/upcomingchests",checkAuth,getUpcomingchest)
router.get("/clan",checkAuth,getClan)



export {router}