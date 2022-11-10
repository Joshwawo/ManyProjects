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
      folder: "dalle",
      format: "webp",
      // transformation: [
      //   { width: 500, height: 500, crop: "limit" },
      //   // {
      //   //   dpr: "auto",
      //   //   responsive: true,
      //   //   width: "auto",
      //   //   crop: "scale",
      //   //   angle: 20,
      //   // },
      //   // { effect: "art:hokusai", border: "3px_solid_rgb:00399b", radius: 20 },
      // ],
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
  