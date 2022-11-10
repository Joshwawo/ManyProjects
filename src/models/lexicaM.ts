import { Schema, model } from "mongoose";
import { LexicaModelTypes } from "../interfaces/ai/lexicaMode";

const LexicaSchema = new Schema<LexicaModelTypes>(
  {
    image: {
        public_id: String,
        url: String
    },
    data: []
  },
  {
    timestamps: true,
  }
);

const LexicaModel = model("lexica", LexicaSchema);

export default LexicaModel;
