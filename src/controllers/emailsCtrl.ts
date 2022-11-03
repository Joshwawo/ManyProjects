import { Request, Response } from "express";
import {
  postCorreoServices,
  fetchCorreosServices,
  deleteCorreosServices,
  deleteAllCorreosServices,
} from "../services/correos.services";

const postCorreo = async ({ body }: Request, res: Response) => {
  const respuesta = await postCorreoServices(body);
  res.json(respuesta);
};

const getCorreos = async (req: Request, res: Response) => {
  const respuesta = await fetchCorreosServices();
  res.json(respuesta);
};

const deleteCorreo = async ({ params: { id } }: Request, res: Response) => {
  const respuesta = await deleteCorreosServices(id);

  res.json({ message: respuesta });
};

const deleteAllCorreos = async (req: Request, res: Response) => {
  await deleteAllCorreosServices();
  res.status(200).json({ message: "Correos Eliminados" });
};

export { postCorreo, getCorreos, deleteCorreo, deleteAllCorreos };
