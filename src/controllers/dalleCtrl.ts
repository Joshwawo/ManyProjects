import { Configuration, OpenAIApi } from "openai";
import { Request, Response } from "express";
import { configuration } from "../config/openAiConfig";
import dalleModel from "../models/dalle";
import {
  postPromp,
  newGenerationServices,
  getImagesServices,
} from "../services/dalle.Services";
import { RequestNvo } from "../interfaces/newAuth.interfaces";
import { uploadImage } from "../libs/dalleSavesCloudinary";

const getImagenes = async (req: RequestNvo, res: Response) => {
  const usuer = req.user;
  const respuesta = await getImagesServices(usuer);
  return res.json(respuesta);
};

const getDalle = async (req: RequestNvo, res: Response) => {
  const usuerio = req.user;
  const body = req.body;
  // const clientIp = req.ip;
  // console.log(body);

  const repuesta = await newGenerationServices(body, usuerio);

  if (repuesta instanceof Error) {
    return res.status(403).json({
      message: repuesta.message,
    });
  }

  res.json(repuesta);
};

const cloudinarySave = async (req: Request, res: Response) => {
  const imageUrl =
    "https://oaidalleapiprodscus.blob.core.windows.net/private/org-vzN2nZUQEGteyFkFM8zMyla1/user-Jkq3pBq22w9YjxDIvYhocWQ1/img-HTkpkcofYpSJ5O2rKWZKwz3w.png?st=2022-11-10T05%3A04%3A22Z&se=2022-11-10T07%3A04%3A22Z&sp=r&sv=2021-08-06&sr=b&rscd=inline&rsct=image/png&skoid=6aaadede-4fb3-4698-a8f6-684d7786b067&sktid=a48cca56-e6da-484e-a814-9c849652bcb3&skt=2022-11-10T00%3A28%3A07Z&ske=2022-11-11T00%3A28%3A07Z&sks=b&skv=2021-08-06&sig=IKBPU3Br3IoH9%2BCbeMieTWpqNmYEbD7Qd6b2TLzQlaE%3D";
  const response = await uploadImage(imageUrl);
  console.log(response);
  return res.json(response);
};

const testPost = async (req: Request, res: Response) => {
  const respuesta = "Mantenimiento";

  return res.json({ message: respuesta });
};

export { getDalle, testPost, getImagenes, cloudinarySave };
