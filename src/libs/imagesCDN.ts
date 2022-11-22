import {
    UploadApiResponse,
    DeleteApiResponse,
    v2 as cloudinary,
  } from "cloudinary";
  import "dotenv/config";
  import fs from "fs-extra";
  
  cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_KEY_SECRET,
  });
  
  export const uploadImage = async (
    filepath: string 
  ): Promise<UploadApiResponse> => {
    return await cloudinary.uploader.upload(filepath, {
      folder: "susimages",
      format: "webp",
     
    });
    
  };
  
  export const deleteImage = async (id: string): Promise<DeleteApiResponse> => {
    return await cloudinary.uploader.destroy(id);
  };
  
  export const deleteAndUpdate = async (
    public_id: string,
    filePath: string
  ): Promise<UploadApiResponse> => {
    await cloudinary.uploader.destroy(public_id);
    const result = await uploadImage(filePath);
    await fs.remove(filePath);
  
    return result;
  };
  