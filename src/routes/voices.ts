import { Router, Request, Response } from "express";
import {
  root,
  postVoices,
  test,
  voiceList,
  getVoices,
} from "../controllers/voices";

const router = Router();

router.get("/", root);
router.get("/voices", voiceList);
router.get("/test", test);

/**
 * @swagger
 *  components:
 *    schemas:
 *     Tss:
 *      type: object
 *      properties:
 *        tts:
 *         type: string
 *         description: The text to speech
 *        voice:
 *          type: string
 *          description: The voice to use
 *      required:
 *       - tts
 *       - voice
 *      example:
 *        tts: "Hola como han estado, el dia de hoy es un dia muy bonito"
 *        voice: "fernanfloo"
 *      responses:
 *
 */

/**
 * @swagger
 *  /voices/tss:
 *    post:
 *     summary: Generate a audio file from a text
 *     tags:
 *     - Text to Speech
 *     requestBody:
 *      required: true
 *      content:
 *       application/json:
 *        schema:
 *          type: object
 *          $ref: '#/components/schemas/Tss'
 *     responses:
 *      200:
 *       description: The audio was generated
 *       content:
 * 
 *      500:
 *        description: Internal server error
 */

router.post("/tss", postVoices);

/**
 * @swagger
 * /voices/voiceslist:
 *  get:
 *   summary: Get a list of voices
 *   tags:
 *   - Text to Speech
 *   parameters:
 *      - in: query
 *        name: mode
 *        required: true
 *        schema:
 *          type: string
 *        description: The mode of the voice - tts-basic, tss-all, tss-reference
 *      - in: query
 *        name: language
 *        type: string
 *        description: The language of the voice English, Spanish, Polish, portuguese, dutch
 *
 *   example:
 *    mode: tss-basic
 *    language: spanish
 *   required:
 *     - mode
 *
 *   responses:
 *
 *     200:
 *      description: A successful response
 *      content:
 *       application/json:
 *        example:
 *           [{displayName: "Fernanfloo (Latin American Spanish)",name: "fernanfloo"},{displayName: "dotCSV (Castillian Spanish)",name: "dotcsv"}, ...]
 *     400:
 *      description: Bad request
 *     500:
 *      description: Internal server error
 *
 *
 *
 */
router.get("/voiceslist", getVoices);

export { router };
