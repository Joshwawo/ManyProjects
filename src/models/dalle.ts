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
    },
    cloudinarySave: {
      type: Object,
      
    },
    
  },
  {
    timestamps: true,
    
    // timeseries: {
    //   timeField: "timestamp",
    //   metaField: "metadata",
    //   granularity: "seconds",
    // },
    
    
    // timestamps: true,
    // versionKey: false,
    // expireAfterSeconds: 60,
    // expires: 60,
    //como eliminar despues de 60 segundos
  },
);

const dalleModelo = model("dalle", DallleSchema);
export default dalleModelo;
