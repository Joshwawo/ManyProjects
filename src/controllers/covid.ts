import {Request, Response} from 'express'
import {covidata} from '../data/covidData'


const covidData =async (req:Request, res:Response) => {

    // res.json({message:'hola mundo'})
    res.json(covidata)
    
}


export {
    covidData
}