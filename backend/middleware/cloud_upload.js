import multer from 'multer';
import { v2 as cloudinary } from 'cloudinary';
import { CloudinaryStorage } from 'multer-storage-cloudinary';

import dotenv from 'dotenv';
dotenv.config();

cloudinary.config({ 
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
  api_key: process.env.CLOUDINARY_API_KEY, 
  api_secret: process.env.CLOUDINARY_API_SECRET 
});

// Test the connection immediately
cloudinary.api.ping()
  .then(res => console.log("✅ CLOUDINARY_CONNECTED"))
  .catch(err => {
    console.log("❌ CLOUDINARY_ERROR_DETAILS:", JSON.stringify(err, null, 2));
  });
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'lost-courier/submissions',
    transformation: [
      { width: 1200, crop: 'limit' }, // Don't store 4k images, waste of space
      { quality: 'auto' },            // Auto-compression
      { fetch_format: 'auto' }        // Serves WebP to browsers that support it
    ],
  },
});


function fileFilter(req, file, cb) {
  if (!file.mimetype.startsWith('image/')) {
    cb(new Error('Only image files are allowed'), false);
  } else {
    cb(null, true);
  }
}

export const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB is plenty for optimized uploads
  fileFilter
});