import { Schema, model } from "mongoose";

import { Blog } from "../interfaces/blog/blog.interfaces";

const BlogSchema = new Schema<Blog>(
  {
    title: {
      type: String,
      default: "No title",
    },
    descripcion: {
      type: String,
      default: 'No Description'
    },
    tech: {
      type: String,
    },
    image: {
      url: String,
      public_id: String,
    },
    github: {
      type: String,
    },
    proyectUrl: {
      type: String,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

const BlogModel = model("Blog", BlogSchema);

export default BlogModel;
