import { Request, Response } from "express";
import {
  insertItem,
  getItemsCars,
  getById,
  updateCar,
  deleteCar,
} from "../services/item";
import { handleHttp } from "../utils/error.handle";

const getItem = async (req: Request, res: Response) => {
  try {
    // res.json({ message: "Holas" });
    const { id } = req.params;
    const respuesta = await getById(id);
    const data = respuesta ? respuesta : "NOT_FOUND";
    res.send(data);
  } catch (error) {
    res.status(500);
    res.send("Error_Get_Items");
  }
};

//Puedo quitar este body y volver a poner el req, es para files didactos esta desescruturacion
const posttItems = async ({ body }: Request, res: Response) => {
  try {
    const respuestaItem = await insertItem(body);
    res.send(respuestaItem);
  } catch (error) {
    handleHttp(res, "Error_Post_Items", error);
  }
};

const getItems = async (req: Request, res: Response) => {
  try {
    // const respuesta = await getItemsCars();


    // res.send(respuesta);
    res.send({message:"Hola desde aqui"})
  } catch (error) {
    handleHttp(res, "Error_Get_Items");
  }
};

const updateItems = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const body = req.body;

    const respuestaItems = await updateCar(id, body);
    console.log(respuestaItems);
    res.send(respuestaItems);
  } catch (error) {
    handleHttp(res, "Error_Update_Items");
  }
};

const deleteItems = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const respuestaItems = await deleteCar(id);
    // console.log(respuestaItems);
    res.send(respuestaItems);
  } catch (error) {
    handleHttp(res, "Error_Delete_Items");
  }
};

export { getItem, posttItems, getItems, updateItems, deleteItems };
