import { Request, Response } from "express";
import { ClashCards } from "../interfaces/clash/clash.interfaces";
import {
  fetchCards,
  fetchPlayer,
  fetchUpcomingchests,
  fetchClan,
} from "../services/clash.service";

const getCards = async (req: Request, res: Response): Promise<void> => {
  const respuesta = await fetchCards();

  res.send(respuesta);
};

const getPlayerTag = async (
  { query }: Request,
  res: Response
): Promise<void> => {
  try {
    // console.log({tag: query.userHashTag})
    const userHashTag = query.userHashTag?.toString().replace("#", "%23");
    // const userHashTag = "#QPYJPJ20".replace("#","%23")

    // console.log(userHashTag);
    // const userHashTag = "#UJJR8PUCG".toUpperCase().replace("#", "%23");
    const respuesta = await fetchPlayer(String(userHashTag));
    // console.log(respuesta)
    // if(respuesta instanceof Error){
    //   res.json(Error)
    if(!respuesta){
      res.status(404).json({message:"Player not Found"})
    }
    // }
    res.json(respuesta);
    // res.json({message: 'Hello'})

  } catch (error:any) {
    console.log(error)
  }
};

const getUpcomingchest = async (
  { query }: Request,
  res: Response
): Promise<void> => {
  try {
    // res.send({message:" Hola desde aki"})
    // const userHashTag = "#UJJR8PUCG".toUpperCase().replace("#", "%23");
    const userHashTag = query.userHashTag?.toString().replace("#", "%23");
    // console.log(userHashTag)

    const respuesta = await fetchUpcomingchests(String(userHashTag));

    res.send(respuesta);
  } catch (error) {
    console.log(error);
    res.send(error);
  }
};

const getClan = async ({ query }: Request, res: Response): Promise<void> => {
  try {
    const clanHashTag = query.clanHashTag?.toString().replace("#", "%23");

    // res.send({message:"Hola desde getClan"})
    // const clanHashTag = "#LRJ0GLV2".toUpperCase().replace("#","%23")
    const respuesta = await fetchClan(String(clanHashTag));
    res.status(200).send(respuesta);
  } catch (error) {
    console.log(error);
  }
};

export { getCards, getPlayerTag, getUpcomingchest, getClan };
