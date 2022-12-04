import {Router} from 'express'
import {scrappingBooks, lolSales,lolSalesTest,blobTest,test} from '../controllers/scrapping'

const router = Router();

router.get('/books',scrappingBooks)
router.get("/saleslol", lolSales);
router.get("/loltest", lolSalesTest);
router.get("/blob", blobTest);

export{
    router
}