import { OpenAIApi } from "openai";
import { configuration } from "../config/openAiConfig";
import dalleModel from "../models/dalle";
import { NewUser } from "../models/newUser";
import { body as trashbody } from "../bin/tash";
import { uploadImage } from "../libs/dalleSavesCloudinary";
import colors from "colors";
import dateFs from "date-fns";

colors.enable();

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
      "You do not have enough credits to generate a new image. u need more for free? @joshwawo on twitter"
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

    // console.log(response.data.data[0].url);

    //trashbody
    let imageResponse =  response.data.data[0].url;
    const cloudinaryResponse = await uploadImage(imageResponse as string);

    let imageClodinary = {
      url: cloudinaryResponse.secure_url,
      public_id: cloudinaryResponse.public_id,
    };

    userGen.credits = userGen.credits - 1;
    const newImgGen = new dalleModel(response.data);
    newImgGen.creator = user._id;
    newImgGen.prompt = prompt;
    newImgGen.cloudinarySave = imageClodinary;

    const imagenGenSaved = await newImgGen.save();
    await userGen.save();
    return imagenGenSaved;
  } catch (error: any) {
    console.log(error.response.data);
    // const errors: any = new Error(error.response.data.error.message);

    if (error.response.data.error) {
      const errors: any = new Error(error.response.data.error.message);
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
    .sort({ createdAt: -1 });
    
  // const userImages = await dalleModel
  //   .find()
  //   .where("creator")
  //   .equals(user)
  //   .sort({ created: -1 });

  //filtrar registros que fueron creados una hora despues de su creacion
  // const userImagesLog = await dalleModel.find({
  //   created: { $gte: new Date(new Date().getTime() - 60 * 60 * 1000) },
  // });

  // const date2 = "2022-11-07T19:12:46.692Z";

  // const dataFortmat = (date: any) => {
  //   const dateToFormat = "2022-11-07T19:12:46.692Z";

  //   const dateF = dateFs.format(new Date(dateToFormat), "yyyy-MM-dd HH:mm:ss");
  //   console.log(dateF);
  //   return dateF;
  // };

  //formatear fecha para que apareza con dias, horas, minutos y segundos
  // const userImagesLogFormat = userImagesLog.map((item) => {
  //   const date = new Date(item.created);
  //   const dateFormated = date.toLocaleString();
  //   return { ...item.$where, created: dateFormated };
  // });
  // console.log(userImagesLogFormat)
  // const dateFormat = (date: any) => {
  //   const dateFormated = date.toLocaleString();
  //   return dateFormated;
  // }

  // console.log(dateFormat(userImagesLog[0].created));

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
