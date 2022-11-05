import { Schema, model } from "mongoose";
import { DalleInterfaces } from "../interfaces/dalle.Interfaces";

const DallleSchema = new Schema<DalleInterfaces>(
  {
    created: {
      type: Number,
    },
    data: [
      {
        type: Object,
      },
    ],
    creator: {
      type: Schema.Types.ObjectId,
      ref: "NewUser",
    },
    prompt:{
      type: String,
      default: 'No available prompt'
    }
  },
  {
    
    timeseries: {
      timeField: "timestamp",
      metaField: "metadata",
      granularity: "seconds",
    },
    expireAfterSeconds: 60,
    timestamps: true,
    versionKey: false,
    
    // timestamps: true,
    // versionKey: false,
    // expireAfterSeconds: 60,
    // expires: 60,
    //como eliminar despues de 60 segundos
  },
);

const dalleModelo = model("dalle", DallleSchema);
export default dalleModelo;
