import {Router} from 'express'
import {getBlogs,postBlogs,getBlog,deleteBlog,updateBlog,deleteAllBogs} from '../controllers/blogCtrl'
import checkAuth from '../middlewares/checkAuth'

const router = Router()


router.get("/posts",getBlogs)
router.get("/posts/:id",checkAuth,getBlog)
router.post("/posts", checkAuth,postBlogs)
router.put("/posts/:id",checkAuth,updateBlog)
router.delete("/posts/:id",checkAuth ,deleteBlog)
router.delete("/all", checkAuth,deleteAllBogs)

export {router}