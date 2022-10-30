import BlogModel from "../models/blog.model";
import { Blog } from "../interfaces/blog/blog.interfaces";
import { deleteImage, uploadImage, deleteAndUpdate } from "../libs/cloudinary";
import fs from "fs-extra";

//!POST
const insertBlog = async (blog: Blog, files: any): Promise<unknown> => {
  //   console.log(files);
  try {
    const { title, descripcion, tech, github, proyectUrl } = blog;
    let image;

    if (files?.image) {
      const result = await uploadImage(files.image.tempFilePath);
      // console.log(result);
      await fs.remove(files.image.tempFilePath);
      image = {
        url: result.secure_url,
        public_id: result.public_id,
      };
    }

    const newBlog = new BlogModel({
      title,
      descripcion,
      tech,
      image,
      github,
      proyectUrl,
    });

    const respuestaBlog = await newBlog.save();
    return respuestaBlog;
  } catch (error) {
    console.log(error);
    return error;
  }
};

//!GET
const FetchBlogs = async (): Promise<unknown> => {
  try {
    const respuestaBlogs = await BlogModel.find({});
    return respuestaBlogs;
  } catch (error) {
    console.log(error);
    return error;
  }
};
//!GET BY ID
const fetchBlogId = async (id: string) => {
  try {
    const respuestBlog = await BlogModel.findById(id);
    if(!respuestBlog) return ;
    return respuestBlog;
  } catch (error) {
    // console.log(error);
    return "No se encontro el blog";
    // return error;
  }
};

//!DELETE
const fetchBlogDelete = async (id: string) => {
  try {
    // const postDelete = await BlogModel.findOneAndDelete({_id:req.params.id})
    const postDelete = await BlogModel.findOneAndDelete({ _id: id });
    if (!postDelete) return false;
    if (postDelete?.image?.public_id) {
      await deleteImage(postDelete.image.public_id);
    }
    return postDelete;
  } catch (error) {}
};
//!DELETE ALL BLOGS 

const FetchDeleteAllBlogs = async () => {
  try {
    const deleteAll = await BlogModel.deleteMany({
      _id: { $exists: true },

    });
    return deleteAll;
  } catch (error) {
    console.log(error);
  }

}

//!PUT

const fetchUpdateblog = async (id: string, files: any, body: Blog) => {
  try {
    let blog = await BlogModel.findById(id);

    if (files?.image === undefined) {
      const data = {
        title: body.title,
        descripcion: body.descripcion,
        tech: body.tech,
        github: body.github,
        proyectUrl: body.proyectUrl,
      };
      blog = await BlogModel.findByIdAndUpdate(id, data, { new: true });
      return blog;
    } else if (files?.image) {
      //   await cloudinary.uploader.destroy(String(blog?.image.public_id));
      //   const result = await uploadImage(files.image.tempFilePath);
      //   await fs.remove(files.image.tempFilePath);

      // const  result= deleteAndUpdate(String(blog?.image.public_id),files.image.tempFilePath)
      const result = await deleteAndUpdate(
        String(blog?.image.public_id),
        files.image.tempFilePath
      );

      const data: Blog = {
        title: body.title,
        descripcion: body.descripcion,
        tech: body.tech,
        image: {
          url: result?.secure_url,
          public_id: result?.public_id,
        },
        github: body.github,
        proyectUrl: body.proyectUrl,
      };

      blog = await BlogModel.findByIdAndUpdate(id, data, { new: true });

      return blog;
    }
  } catch (error) {
    console.log(error);
  }
};

export {
  insertBlog,
  FetchBlogs,
  fetchBlogId,
  fetchBlogDelete,
  fetchUpdateblog,
  FetchDeleteAllBlogs,
};
