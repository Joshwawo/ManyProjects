import { OpenAIApi } from "openai";
import { configuration } from "../config/openAiConfig";
import dalleModel from "../models/dalle";
import { NewUser } from "../models/newUser";
import { body as trashbody } from "../bin/tash";
import mongoose, { Model } from "mongoose";

type bodyGen = {
  prompt: string;
  resolution: Resolution;
};

enum Resolution {
  "256x256" = "256x256",
  "512x512" = "512x512",
  "1024x1024" = "1024x1024",
}

type userDalle = {
  _id: string;
  name: string;
  email: string;
  confirmado: boolean;
  credits: number;
};

const openAI = new OpenAIApi(configuration);

const newGenerationServices = async (
  { prompt, resolution }: bodyGen,
  user: userDalle
) => {
  const userGen = (await searchUserHelper(user._id)) as any;
  // console.log(prompt);
  if (userGen.credits <= 0) {
    const error = new Error(
      "No tienes suficientes creditos para generar una nueva imagen"
    );
    return error;
  }

  try {
    const response = await openAI.createImage({
      prompt: prompt,
      n: 1,
      size: `${resolution}`,
      user: user.name,
      response_format: "url",
    });

    //trashbody

    userGen.credits = userGen.credits - 1;

    //   console.log(userGen);
    const newImgGen = new dalleModel(response.data);
    newImgGen.creator = user._id;
    newImgGen.prompt = prompt;

    const imagenGenSaved = await newImgGen.save();
    await userGen.save();
    return imagenGenSaved;
  } catch (error: any) {
    console.log(error.response.data.error);
    // const errors: any = new Error(error.response.data.error.message);

    if (error.response.data.error) {
      const errors: any = new Error(
        error.response.data.error.message
      );
      return errors;
    }

    const errors = new Error(
      "Error es el servidor, lo siento hemos superado el limite de peticiones"
    );
    return error.response.data.error.message;
  }

  // return 'lllegue al services'
};
// const getImagesServices = async (user: string)

const getImagesServices = async (user: string) => {
  const userImages = await dalleModel
    .find()
    .where("creator")
    .equals(user)
    .sort({ created: -1 });

  return userImages;
};

//*Helpers funcions
// const searchProjectHelper = async (id: string) => {
//   try {
//     const search = await dalleModel.findById(id);
//     if (!search) return;

//     return search;
//   } catch (error) {
//     return null;
//   }
// };
const searchUserHelper = async (id: string) => {
  try {
    const search = await NewUser.findById(id);
    if (!search) return;

    return search;
  } catch (error) {
    return null;
  }
};

const postPromp = async () => {
  const response = await openAI.createImage({
    prompt: "Chihuahua eating big taco",
    n: 1,
    size: "1024x1024",
    user: "daviddalle",
    response_format: "url",
  });

  // console.log(response.data.data[0].b64_json);

  const image = new dalleModel(response.data);
  image.credits = image.credits - 1;
  const imagenStored = await image.save();

  return imagenStored;
  //   return "Estoy en mantenimiento ";
};

export { postPromp, newGenerationServices, getImagesServices };