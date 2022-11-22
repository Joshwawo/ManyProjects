import { Schema, model } from "mongoose";
import { imagesTypes } from "../interfaces/images.interfaces";

const ImagesSchema = new Schema<imagesTypes>(
  {
    susImage: {
        url: String,
      public_id: String,
    },
    nsfw: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

const ImageModel = model("images", ImagesSchema);
export default ImageModel;
