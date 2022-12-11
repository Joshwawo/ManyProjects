import { Request, Response } from "express";
import { postServices } from "../services/validaciones.services";

export const postCtrl = (req: Request, res: Response) => {
  const response = postServices();
  res.json(response)
};

export const getCtrl = async (req: Request, res: Response) => {
  res.json({ message: "Holas" });
};
