import { Request, Response } from "express";
import {
  salsaServices,
  panServices,
  webpFolder,
  urlsWebpFolderServices,
  convertAnyToWebp,
  anotherOne,
  urlsCiberdropFolderServices,
  ciberDropFolder
  
} from "../services/agua.services";

const root = async (req: Request, res: Response) => {
  res.json({ message: "Si jala la ruta o no pues /root" });
};

const agua = async (req: Request, res: Response) => {
  res.json({ message: "Si jala la ruta o no pues /agua" });
};

const salsaServies = async (req: Request, res: Response) => {
  try {
    await salsaServices();
    res.json({ message: "Ok" });
  } catch (error) {
    console.error(error);
  }
};

const lecheServices = async (req: Request, res: Response) => {
  res.json({ message: "leche para pan" });
};
const panCtrl = async (req: Request, res: Response) => {
  try {
    const response = await panServices();
    res.json(response);
    // console.log(response)
    // res.json({message: "pan para salsa"});
  } catch (error) {
    console.log(error);
  }
};

const manzanaCtrl = async ({ params: { imagen } }: Request, res: Response) => {
  try {
    const response = await webpFolder(imagen);
    res.sendFile(String(response));
    // console.log(response)
    // res.json({message: "pan para salsa"});
  } catch (error) {
    console.log(error);
  }
};
const peraCtrl = async (req: Request, res: Response) => {
  try {
    const response = await urlsWebpFolderServices();
    res.json(response);
    // console.log(response)
    // res.json({message: "pan para salsa"});
  } catch (error) {
    console.log(error);
  }
};

const platanoCtrl = async ({query:{gallery}}: Request, res: Response) => {
  try {
    console.log(gallery)
    // const response = await convertAnyToWebp("https://estaticos.muyinteresante.es/uploads/images/gallery/59a669fc5bafe88febb3d6cc/gatito-cesped_0.jpg")
     await convertAnyToWebp(String(gallery));

    res.json({message: "successfully"});
    // console.log(response)
    // res.json({message: "pan para salsa"});
  } catch (error) {
    console.log(error);
    return res.json({message: "error was ocurred"});
  }
};



const papaCtrl = async (req: Request, res: Response) => {

  try {
    const response = await urlsCiberdropFolderServices();
    res.json(response);
    // console.log(response)
    // res.json({message: "pan para salsa"});
  } catch (error) {
    console.log(error);
  }

}
const papaFilesCtrl = async ({ params: { imagen } }: Request, res: Response) => {
  try {
    const response = await ciberDropFolder(imagen);
    res.sendFile(String(response));
    // console.log(response)
    // res.json({message: "pan para salsa"});
  } catch (error) {
    console.log(error);
  }


};

const uvaCtrl = async (req: Request, res: Response) => {
  try {
    const response = await anotherOne();
    res.json({message: "successfully"});
    // console.log(response)
    // res.json({message: "pan para salsa"});
  } catch (error) {
    console.log(error);
  }
}

export {
  root,
  agua,
  salsaServies,
  lecheServices,
  panCtrl,
  manzanaCtrl,
  peraCtrl,
  platanoCtrl,
  uvaCtrl,
  papaCtrl,
  papaFilesCtrl

};
