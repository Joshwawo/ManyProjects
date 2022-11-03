import { Schema, model } from "mongoose";
import { CorreosRecibidos } from "../interfaces/correosRecibidosInterface";

const CorreosSchema = new Schema<CorreosRecibidos>(
  {
    nombre: {
      type: String,
      trim: true,
      required: true,
    },
    apellido: {
      type: String,
      trim: true,
      required: true,
    },
    email: {
      type: String,
      trim: true,
      required: true,
    },
    numero: {
      type: Number,
      trim: true,
      required: false,
    },
    mensaje: {
      type: String,
      trim: true,
      required: false,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

const CorreosRecibos = model("Correos", CorreosSchema);
export default CorreosRecibos;
