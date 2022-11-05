import { Configuration, OpenAIApi } from "openai";
import { Request, Response } from "express";
import { configuration } from "../config/openAiConfig";
import dalleModel from "../models/dalle";
import { postPromp, newGenerationServices,getImagesServices } from "../services/dalle.Services";
import { RequestNvo } from "../interfaces/newAuth.interfaces";

const getImagenes = async (req: RequestNvo, res: Response) => {
  const usuer = req.user
  const respuesta =await getImagesServices(usuer)
  return res.json(respuesta);
};

const getDalle = async (req: RequestNvo, res: Response) => {
  const usuerio = req.user;
  const body = req.body;
  // const clientIp = req.ip;
  console.log(body);

  const repuesta = await newGenerationServices(body, usuerio);

  if (repuesta instanceof Error) {
    return res.status(403).json({
      message: repuesta.message,
    });
  }

  res.json(repuesta);
};

const testPost = async (req: Request, res: Response) => {
  const respuesta = "Mantenimiento";
  return res.json(respuesta);
};

export { getDalle, testPost, getImagenes };
