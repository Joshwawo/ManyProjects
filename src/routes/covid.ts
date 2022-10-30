import {Router} from 'express'
import {covidData} from '../controllers/covid'
const router = Router()

router.get("/data",covidData )


export {
    router
}