import { Schema, Types, model, Model } from "mongoose";
import { Auth } from "../interfaces/auth.interfaces";
import { Car } from "../interfaces/car.interfaces";
import { User } from "../interfaces/user.interfaces";

const UserSchema = new Schema<User>(
  {
    name: {
      type: String,
    },

    email: {
      type: String,
      unique: true,
    },
    password: {
      type: String,
    },
    description:{
      type:String,
      default: 'am description...'
    }
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

const UserModel = model("users", UserSchema);

export default UserModel;
