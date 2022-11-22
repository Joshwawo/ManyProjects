import {postSusImages,getSusImages,getSusRandom} from '../services/images.services'
import {Request, Response} from 'express'


const postImgSus =async ({body,files}:Request,res:Response) => {
    const response = await postSusImages(files,body)
    res.json(response)
}

const getImgSus = async (req:Request,res:Response) => {
    const response = await getSusImages()
    res.json(response)
}

const getRandomImg = async (req:Request,res:Response) => {
    const response = await getSusRandom(req.query)
    res.json(response)
}


export{
    postImgSus,
    getImgSus,
    getRandomImg
}