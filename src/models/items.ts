import { Schema, Types, model, Model } from "mongoose";
import { Car } from "../interfaces/car.interfaces";

const ItemSchema = new Schema<Car>(
  {
    name: {
      type: String,
    },
    color: {
      type: String,
      required: true,
    },
    description: {
      type: String,
    },
    gas: {
      type: String,
      enum: ["gasoline", "electric"],
    },
    price: {
      type: Number,
    },
    year: {
      type: Number,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

const ItemModel = model("items", ItemSchema);

export default ItemModel;
