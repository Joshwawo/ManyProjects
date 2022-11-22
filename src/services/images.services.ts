import fs from "fs-extra";
import { uploadImage } from "../libs/imagesCDN";
import ImagesModels from "../models/imagesMode";

const postSusImages = async (files: any, body: any) => {
  let susImage;
  let nsfw = body.nsfw;
  if (files?.image) {
    const result = await uploadImage(files.image.tempFilePath);
    await fs.remove(files.image.tempFilePath);
    susImage = {
      url: result.url,
      public_id: result.public_id,
    };
    try {
      const newImage = new ImagesModels({
        susImage,
        nsfw,
      });
      const saveImage = await newImage.save();
      return saveImage;
    } catch (error) {
      console.log(error);
    }
  }
};

const getSusImages = async () => {
  try {
    const getImg = await ImagesModels.find();

    const res = getImg.map((image: any) => {
      return {
        susImg: image.susImage.url,
        nsfw: image.nsfw,
      };
    });

    return res;
  } catch (error) {
    console.log(error);
  }
};

const getSusRandom = async (query: any) => {
  try {
    const { nsfw } = query;
    const nswfQuery = nsfw === "true" ? true : false;
    const getImg = await ImagesModels.find();

    const res = getImg.map((image: any) => {
      return {
        susImg: image.susImage.url,
        nsfw: image.nsfw,
      };
    });

    const filter = res.filter((item: any) => item.nsfw === nswfQuery);

    const random = Math.floor(Math.random() * filter.length);

    return filter[random];

    // return randomImg;
  } catch (error) {
    console.log(error);
  }
};

export { postSusImages, getSusImages, getSusRandom };
