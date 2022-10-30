import { Request, Response, Router } from "express";

// import {LoginController,registerController, testing} from '../controllers/auth'

const router = Router()

// router.post("/register",registerController)
// router.post("/login",LoginController)
// router.get("/testing",testing )

router.get('/', (req:Request, res:Response)=>{
    res.json({message: 'Hola desde la route auth'})
})

export {router}