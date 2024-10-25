const multer = require('multer');
const path = require('path');
const cloudinary = require('cloudinary').v2;
require('dotenv').config();


cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});


const storage = multer.memoryStorage(); 

const fileFilter = (req, file, cb) => {
  const filetypes = /jpeg|jpg|png/; 
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = filetypes.test(file.mimetype);

  if (mimetype && extname) {
    return cb(null, true);
  } else {
    cb(new Error('Chỉ chấp nhận các file ảnh có định dạng .jpeg, .jpg, .png!'));
  }
};

const upload = multer({
  storage: storage,
  limits: { fileSize: 5 * 1024 * 1024 },  
  fileFilter: fileFilter
});


const uploadToCloudinary = (buffer, folder) => {
  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream({
      folder: folder,  // Thư mục lưu trữ trong Cloudinary
      resource_type: 'auto'
    }, (error, result) => {
      if (error) {
        return reject(error);
      }
      resolve(result.secure_url);
    });
    stream.end(buffer);
  });
};

module.exports = {
  upload,  
  uploadToCloudinary  
};
