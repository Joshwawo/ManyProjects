import CorreosModelo from "../models/correoRecibidos";
import { CorreosRecibidos } from "../interfaces/correosRecibidosInterface";

const postCorreoServices = async (body: CorreosRecibidos) => {
  const correos = new CorreosModelo(body);

  const correoGuardado = await correos.save();
  return correoGuardado;
};

const fetchCorreosServices = async () => {
  const correos = await CorreosModelo.find();
  return correos;
};

const deleteCorreosServices = async (id: string) => {
  try {
    const correos = await buscarCorreo(id);
    if (!correos) {
      const error = new Error("Este correo no existe");
      return error.message;
    }

    return correos;
  } catch (error) {
    console.log(error);
    return null;
  }
};

const deleteAllCorreosServices = async () => {
  const correos = await CorreosModelo.deleteMany();
  return correos;
};

//Funciones helpers

const buscarCorreo = async (id: string) => {
  try {
    const buscar = await CorreosModelo.findByIdAndDelete(id);
    if (!buscar) {
      return null;
    }
    return buscar;
  } catch (error) {
    return null;
  }
};

export {
  postCorreoServices,
  fetchCorreosServices,
  deleteCorreosServices,
  deleteAllCorreosServices,
};
