import {Router} from 'express'
import {scrappingBooks, lolSales,lolSalesTest,blobTest,deviantArt,test,deviantArtPagination,testWDomCtrl,liftCtrl,rroute} from '../controllers/scrapping'

const router = Router();

router.get("/",rroute)
router.get('/books',scrappingBooks)
router.get("/saleslol", lolSales);
router.get("/loltest", lolSalesTest);
router.get("/blob", blobTest);
router.get("/deviantart", deviantArt);
router.get("/devianpag", deviantArtPagination);
router.get("/dom", testWDomCtrl);
router.get("/lift", liftCtrl)
router.get("/test", test)

export{
    router
}