import { resSpeechServices, testo,listVoicesServices } from "../services/voices";
import { Request, Response } from "express";

const root = (req: Request, res: Response) => {
  res.json({ message: "Helour desde cotnrl" });
};

const voiceList =async (req:Request,res:Response) => {
  const {language,mode} = req.query
  const response = await listVoicesServices(`${language}`,`${mode}`)
  // console.log(response)
  res.json(response)

  // res.json({message: 'me llego'})
}

const postVoices = async ({ body }: Request, res: Response) => {
  const response = await resSpeechServices(body);
  setTimeout(async () => {
    console.log(response);
    res.json(response);
  },20000);
};

const test = async (req: Request, res: Response) => {
  const response = await testo();
  setTimeout(() => {
    res.json(response);
  }, 30000);
};

export { root, postVoices, test,voiceList };
