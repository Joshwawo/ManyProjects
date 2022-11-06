import { Request, Response } from "express";
import axios from "axios";
import { LexicaTypes } from "../interfaces/ai/lexicaTypes";

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
  // how to valite a url encode

  const searchPrompt = async () => {
    try {
      const url = `https://lexica.art/api/v1/search?q=${promptQ}`;
      // const url = `https://lexica.art/api/v1/search?q=`;
      const respuesta = await axios.get(url);
      let result = respuesta.data.images as LexicaTypes[];

      // const nsfwRes = result.filter((item) => item.nsfw === Boolean(nsfw));
      // const widthRes = result.filter((item) => item.width === Number(width));
      // const heightRes = result.filter((item) => item.height === Number(height));
      // const gridRes = result.filter((item) => item.grid === Boolean(grid));

      //Permitir las imagenes nsfw si el usuario lo desea
      // if (nsfwQ) {
      //   result = result.filter((item) => item.nsfw === nsfwQ);
      // }

      // if (limit) {
      //  return result = result.slice(0, Number(limit));
      // }

      // if([promptQ,width,height,grid,nsfw,guidance].includes(undefined)){
      //   return result
      // }

      if ([grid, nsfw].includes(undefined)) {
        // let error = new Error("grid or nsfw is undefined");

        return undefined;
      }
      if ([gridQ, nsfwQ].includes(true)) {
        result = result.filter((item) => item.grid === gridQ);
      }
      if ([gridQ, nsfwQ].includes(false)) {
        result = result.filter((item) => item.nsfw === nsfwQ);
      }

      //Permitir las imagenes nsfw y los grid si el usuario lo desea
      // if ([gridQ, nsfwQ].includes(true)) {
      //   result = result.filter(
      //     (item) => item.nsfw === nsfwQ && item.grid === gridQ
      //   );
      //   return result;
      // }
      // console.log("lleggooooo uno");

      // const finalMap = result.filter(
      //   (item) => item.grid === gridQ

      // item.width === Number(width) &&
      // item.height === Number(height) &&
      // item.grid === Boolean(grid)
      // );
      // .filter((item) => widthRes.includes(item))
      // .filter((item) => heightRes.includes(item))
      // .filter((item) => gridRes.includes(item));
      // if (!limit) {
      //   console.log('Llego al !limit');
      //   return result.slice(0, Number(limit));
      // } else {
      //   console.log('Llego al ultimo  else');
      //   return result;
      // }

      const finalResult = result.slice(0, Number(limit));

      // console.log(finalResult.length + " " + limit);
      // console.log("lleggooooo dos");

      return finalResult;
    } catch (error) {
      const errorRes = new Error("you prompt is empty or invallid");
      return errorRes;
    }
  };
  const resto = await searchPrompt();
  // console.log(resto?.length);
  // console.log()
  // if (resto?.length === 0) {
  //   return res.json({ message: "No results found" });
  // }

  if(resto instanceof Error){
    return res.json({ message: resto.message });
  }
  if (resto === undefined) {
    return res.json({ message: "some parameter has undefined" });
  }

  res.json(resto);
};

export { getPrompt };
