import axios from "axios";
import { Request, Response } from "express";
import { makeTextImage, makeMeme } from "../services/meme.services";

const getMeme = async (req: Request, res: Response) => {
  const input = req.params.input;
  const response = makeTextImage(input);
  res.writeHead(200, { "Content-Type": "image/jpg" });
  res.end(response);
};

const getMemeImg = async (req: Request, res: Response) => {
  const { params } = req;
  //get the text input string from the request parameters
  const input = params?.input;

  //so params.url will usually be http:
  const baseUrl = params?.url;
  //and params[0] will be www.myImageHost.com/image.jpg
  const restOfUrl = params?.[0];

  //put the baseUrl and restOfUrl together
  const url = baseUrl + restOfUrl;

  //get the image buffer
  try {
    const image = await makeMeme({ url, textTop: input, textBottom: input });

    //create headers object
    const headers = { "Content-Type": "image" };

    //set status code and headers
    res.writeHead(200, headers);

    //end by sending image
    res.end(image);
  } catch (error) {
    console.log("Llegue al catch");
    console.log(error);
    return res.json({ message: "bad request", statusCode: 400 });
  }
};

const getMemeImgCm = async (req: Request, res: Response) => {
  const { query, params } = req;
  const textTop = String(query?.textTop);
  const textBottom = String(query?.textBottom);
  const baseUrl = params?.url;
  const restOfUrl = params?.[0];

  const url = baseUrl + restOfUrl;

  try {
    const image = await makeMeme({ url, textBottom, textTop });
    const headers = { "Content-Type": "image" };
    res.writeHead(200, headers);

    res.end(image);
  } catch (error) {
    console.log("Llegue al catch");
    console.log(error);
    return res.json({ message: "bad request", statusCode: 400 });
  }
};
const getDogImg = async () => {
  const url = "https://some-random-api.ml/img/dog";
  const { data } = await axios.get(url);
  console.log("dataRestponse", data);

  return data.link;
};

const getMemeImgCat = async (req: Request, res: Response) => {
  const { query, params } = req;
  // console.log(query);
  const textTop = String(query?.textTop);
  const textBottom = String(query?.textBottom);
  const pet = query.pet;
  const baseUrl = params?.url;
  const restOfUrl = params?.[0];

  const dogRes = await getDogImg();
  //   console.log(dogRes);
  // const objOpts = {
  //   cats: "https://cataas.com/cat",
  //   dog: dogRes,
  // };
  // if (pet === "cats") query.url = "https://cataas.com/cat";
  // if (pet === "dog") query.url = objOpts.dog;
//   const url = baseUrl + restOfUrl;
    const url = pet === "cat" ? "https://cataas.com/cat" : dogRes;

  try {
    const image = await makeMeme({ url, textBottom, textTop });
    const headers = { "Content-Type": "image" };
    res.writeHead(200, headers);

    res.end(image);
  } catch (error) {
    console.log("Llegue al catch");
    console.log(error);
    return res.json({ message: "bad request", statusCode: 400 });
  }
};

export { getMeme, getMemeImg, getMemeImgCm, getMemeImgCat };
