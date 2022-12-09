import {Request,Response} from 'express'

const root = async (req:Request,res:Response)=>{
    res.json({message:"Si jala la ruta o no pues /root"})

}

const agua = async (req:Request,res:Response)=>{
    res.json({message:"Si jala la ruta o no pues /agua"})
}

export {
    root,
    agua
}