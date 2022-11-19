import { Schema, model } from "mongoose";
import { VoicesTypes } from "../interfaces/voices";

const voicesSchema = new Schema<VoicesTypes>(
  {
    failed_at: {
      type: String,
    },
    finished_at: {
      type: String,
    },
    meta: {
      type: String,
    },
    path: {
      type: String,
    },
    started_at: {
      type: String,
    },
    uuid:{
      type: String,
    },
    tts:{
      type: String,
    }
  },
  {
    timestamps: true,
  }
);

const VoicesModel = model("voices", voicesSchema);
export default VoicesModel;
