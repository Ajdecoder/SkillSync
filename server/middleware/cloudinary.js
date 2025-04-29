import { v2 as cloudinary } from 'cloudinary';
import dotenv from 'dotenv';
dotenv.config();

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Verify Cloudinary configuration
console.log('Cloudinary configured with:', {
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY ? '***' : 'missing',
  api_secret: process.env.CLOUDINARY_API_SECRET ? '***' : 'missing'
});

export const uploadFile = async (file) => {
  try {
    if (!file) {
      throw new Error('No file provided for upload');
    }
    
    console.log('Uploading file to Cloudinary...');
    const result = await cloudinary.uploader.upload(file, {
      folder: 'SkillSync',
      resource_type: 'auto', // Automatically detect the resource type (image, video, etc.)
    });
    console.log('Upload Result:', result);
    return result;
  } catch (err) {
    console.error('Upload error:', err);
    throw err; // Re-throw the error to be handled by the caller
  }
};

export default cloudinary;
