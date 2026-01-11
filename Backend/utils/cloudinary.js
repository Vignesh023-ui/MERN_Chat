import { configEnv } from "../../config.js";
configEnv();

import { v2 as cloudinary } from "cloudinary";
import multer from "multer";

const storage = new multer.memoryStorage();

// * Config Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// * Multer config
const upload = multer({ storage });

// ? Upload image to Cloudinary
const uploadCloudinary = async (file) => {
  try {
    const response = await cloudinary.uploader.upload(file, {
      resource_type: "image",
      folder: "chat",
    });

    return response;
  } catch (error) {
    return error;
  }
};

// ? Delete image from Cloudinary
const deleteCloudinary = async (publicId) => {
  try {
    const response = await cloudinary.uploader.destroy(publicId, {
      type: "upload",
      resource_type: "image",
    });

    return response;
  } catch (error) {
    return error;
  }
};

export { upload, uploadCloudinary, deleteCloudinary };
