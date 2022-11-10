import { Request, Response } from "express";
import axios from "axios";
import { LexicaTypes } from "../interfaces/ai/lexicaTypes";
import colors from "colors";
import {testUpload} from '../services/lexicaServices'
import {
  searchPromptServices,
  searchImgUplodedServices,
} from "../services/lexicaServices";

const getPrompt = async (req: Request, res: Response) => {
  console.log(req.query);
  // const limite = req.query.limit;
  const {
    prompt: promptQ,
    width,
    height,
    grid,
    nsfw,
    limit,
    guidance,
  } = req.query;

  const nsfwQ = nsfw === "true" ? true : false;
  const gridQ = grid === "true" ? true : false;

  // const searchPrompt = async () => {
  //   try {
  //     const url = `https://lexica.art/api/v1/search?q=${promptQ}`;
  //     // const url = `https://lexica.art/api/v1/search?q=`;
  //     const respuesta = await axios.get(url);
  //     let result = respuesta.data.images as LexicaTypes[];

  //     // const nsfwRes = result.filter((item) => item.nsfw === Boolean(nsfw));
  //     // const widthRes = result.filter((item) => item.width === Number(width));
  //     // const heightRes = result.filter((item) => item.height === Number(height));
  //     // const gridRes = result.filter((item) => item.grid === Boolean(grid));

  //     //Permitir las imagenes nsfw si el usuario lo desea
  //     // if (nsfwQ) {
  //     //   result = result.filter((item) => item.nsfw === nsfwQ);
  //     // }

  //     // if (limit) {
  //     //  return result = result.slice(0, Number(limit));
  //     // }

  //     // if([promptQ,width,height,grid,nsfw,guidance].includes(undefined)){
  //     //   return result
  //     // }
  //     colors.enable();
  //     console.log(`Resulto de la api: ${result.length}`.green);
  //     // console.log('hello'.green);

  //     if ([grid, nsfw].includes(undefined)) {
  //       // let error = new Error("grid or nsfw is undefined");

  //       return undefined;
  //     }
  //     // if ([gridQ, nsfwQ].includes(true)) {
  //     //   result = result.filter((item) => item.grid !== false);
  //     //   console.log('Entre en los dos true')
  //     // }
  //     // if ([gridQ, nsfwQ].includes(false)) {
  //     //   result = result.filter((item) => item.nsfw !== true);
  //     //   console.log('Entre en los dos false')
  //     // }

  //     if (nsfwQ === true && gridQ === false) {
  //       // result = result.filter((item) => item.nsfw === true);
  //       result = result.filter((item) => item.grid !== true);
  //       // result = result.filter((item) => item.nsfw !== false);q

  //       console.log(
  //         `entre en el NSFW true y GRID false ${result.length}`.magenta
  //       );
  //       return result.slice(0, Number(limit));
  //     }
  //     if (nsfwQ === false && gridQ === true) {
  //       result = result.filter((item) => item.nsfw !== true);
  //       // result = result.filter((item) => item.grid === true);
  //       // result = result.filter((item) => item.grid !== false);
  //       // result = result.filter((item) => item.grid === true);
  //       console.log(
  //         `entre en el NSFW false y GRID true ${result.length}`.yellow
  //       );
  //       return result.slice(0, Number(limit));
  //     }

  //     if (nsfwQ === true && gridQ === true) {
  //       // result = result.filter((item) => item.nsfw === true);
  //       // result = result.filter((item) => item.grid === true);
  //       // result = result.filter((item) => item.grid !== false);
  //       console.log(
  //         `entre en el NSFW true y GRID true resultaos ${result.length}`.cyan
  //       );

  //       return result.slice(0, Number(limit));
  //     }
  //     if (nsfwQ === false && gridQ === false) {
  //       result = result.filter((item) => item.nsfw !== true);
  //       result = result.filter((item) => item.grid !== true);
  //       console.log(
  //         `entre en el NSFW false y GRID false resultaos ${Number(
  //           result.length
  //         )}`.red
  //       );
  //       return result.slice(0, Number(limit));
  //     }

  //     //Permitir las imagenes nsfw y los grid si el usuario lo desea
  //     // if ([gridQ, nsfwQ].includes(true)) {
  //     //   result = result.filter(
  //     //     (item) => item.nsfw === nsfwQ && item.grid === gridQ
  //     //   );
  //     //   return result;
  //     // }
  //     // console.log("lleggooooo uno");

  //     // const finalMap = result.filter(
  //     //   (item) => item.grid === gridQ

  //     // item.width === Number(width) &&
  //     // item.height === Number(height) &&
  //     // item.grid === Boolean(grid)
  //     // );
  //     // .filter((item) => widthRes.includes(item))
  //     // .filter((item) => heightRes.includes(item))
  //     // .filter((item) => gridRes.includes(item));
  //     // if (!limit) {
  //     //   console.log('Llego al !limit');
  //     //   return result.slice(0, Number(limit));
  //     // } else {
  //     //   console.log('Llego al ultimo  else');
  //     //   return result;
  //     // }

  //     const finalResult = result.slice(0, Number(limit));
  //     console.log(finalResult.length);

  //     // console.log(finalResult.length + " " + limit);
  //     // console.log("lleggooooo dos");

  //     return finalResult;
  //   } catch (error) {
  //     const errorRes = new Error("you prompt is empty or invallid");
  //     return errorRes;
  //   }
  // };
  const resto = await searchPromptServices(promptQ, gridQ, nsfwQ, limit);

  if (resto instanceof Error) {
    return res.json({ message: resto.message });
  }
  if (resto === undefined) {
    return res.json({ message: "some parameter has undefined" });
  }

  res.json(resto);
};

const postPrompt = async ({ files }: Request, res: Response) => {
  const response = await searchImgUplodedServices(files);

  res.json(response);
};

const postImgTest = async ({ files }: Request, res: Response) => {
  const response = await testUpload(files);

  res.json(response);
}

export { getPrompt, postPrompt,postImgTest };
