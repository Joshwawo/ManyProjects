import ItemModel from "../models/items";
import { Car } from "../interfaces/car.interfaces";

const insertItem = async (item: Car) => {
  const RespuestaInsert = await ItemModel.create(item);

  return RespuestaInsert;
};

const getItemsCars = async () => {
  const respuestaItems = await ItemModel.find({});
  return respuestaItems;
};

const getById = async (id: string) => {
  const respuestaItem = await ItemModel.findOne({ _id: id });
  return respuestaItem;
};

const updateCar = async (id: string, data: Car) => {
  const respuesta = await ItemModel.findByIdAndUpdate({ _id: id }, data, {
    new: true,
  });
  return respuesta;
};

const deleteCar = async (id: string) => {
  const respuestaIte = await ItemModel.remove({ _id: id });
  return respuestaIte;
};

export { insertItem, getItemsCars, getById, updateCar, deleteCar };
