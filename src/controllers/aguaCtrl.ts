import { Request, Response } from "express";
import { salsaServices } from "../services/agua.services";

const root = async (req: Request, res: Response) => {
  res.json({ message: "Si jala la ruta o no pues /root" });
};

const agua = async (req: Request, res: Response) => {
  res.json({ message: "Si jala la ruta o no pues /agua" });
};

const salsaServies = async (req: Request, res: Response) => {
  try {
    await salsaServices();
    res.json({message: "Ok"});
  } catch (error) {
    console.error(error);
  }
};

const lecheServices = async (req: Request, res: Response) => {
    res.json({message: "leche para pan"});
}

export { root, agua,salsaServies,lecheServices };
