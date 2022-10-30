import {Router, Request, Response} from 'express'
import { getItems } from '../controllers/order'
// import { checkJwt } from '../middlewares/session'

const router = Router()


// router.get("/", checkJwt,getItems)
router.get('/', (req:Request,res:Response)=>{
    res.json({message:'Hola desde order.ts'})
})

export {router}