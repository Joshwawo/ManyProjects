import ItemModel from "../models/items";
import { Car } from "../interfaces/car.interfaces";

const getOrders = async ()  => {
  const respuestaOrder = await ItemModel.find({});
  return respuestaOrder;
};

export {getOrders}
