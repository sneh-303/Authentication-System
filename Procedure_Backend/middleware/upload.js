const multer = require('multer');
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const cloudinary = require('cloudinary').v2;
require('dotenv').config();

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET,
});

// Define storage strategy
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'auth-system-uploads',
    allowed_formats: ['jpeg', 'jpg', 'png'],
    transformation: [{ width: 500, height: 500, crop: 'limit' }],
  },
});

// Create multer instance
const upload = multer({ storage });

module.exports = upload;
