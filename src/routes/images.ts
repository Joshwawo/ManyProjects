import { Router, Request, Response } from "express";
import { postImgSus, getImgSus, getRandomImg } from "../controllers/imagesCtrl";
import checkAuth from "../middlewares/checkAuth";

const router = Router();

/**
 * @swagger
 *  components:
 *   schemas:
 *    SusImages:
 *      type: object
 *      properties:
 *        image:
 *          type: file
 *          description: The image to upload
 *        nsfw:
 *         type: boolean
 *         description: The image is nsfw
 *      required:
 *        - image
 *        - nsfw
 *      example:
 *        susImage: { url: "http://res.cloudinary.com/pantallas/image/upload/v1669943997/susimages/lysjps1w0bd01bvfh5gc.webp", nsfw: false }
 *        nsfw: false
 *        _id: 60e1f3f9b9b5a40015b8b0a2
 *        createdAt: 2021-07-05T21:33:53.000Z
 *        updatedAt: 2021-07-05T21:33:53.000Z
 *        __v: 0
 */

/**
 * @swagger
 * /images/sus:
 *  post:
 *    security:
 *     - bearerAuth: []
 *    summary: Upload an sus image
 *    tags:
 *    - Sus Images
 *    requestBody:
 *      required: true
 *      content:
 *        multipart/form-data:
 *          schema:
 *            type: object
 *            $ref: '#/components/schemas/SusImages'
 *    responses:
 *      200:
 *        description: The image was uploaded
 *        content:
 *          multipart/form-data:
 *            schema:
 *            type: object
 *            $ref: '#/components/schemas/SusImages'
 *      401:
 *        description: Unauthorized
 * 
 *      500:
 *        description: Internal server error
 */
router.post("/sus", checkAuth,postImgSus);

/**
 * @swagger
 * /images/sus:
 *  get:
 *   summary: return all random sus image
 *   tags:
 *   - Sus Images
 *   responses:
 *      200:
 *        description: A successful response
 *        content:
 *         application/json:
 *          schema:
 *          type: object
 *          properties:
 *            susImg:
 *             type: string
 *            description: The sus image
 */
router.get("/sus", getImgSus);

/**
 * @swagger
 * /images/sus/random:
 *  get:
 *   summary: return a random sus image
 *   tags:
 *   - Sus Images
 *
 *   responses:
 *      200:
 *        description: A successful response
 *        content:
 *         application/json:
 *          schema:
 *          type: object
 *          properties:
 *            susImg:
 *             type: string
 *            description: The sus image
 */
router.get("/sus/random", getRandomImg);

export { router };
