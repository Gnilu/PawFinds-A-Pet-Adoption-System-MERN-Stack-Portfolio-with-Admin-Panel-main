// Middleware/upload.js

const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, 'public/images/items');
  },
  filename: function(req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});

const fileFilter = (req, file, cb) => {
  const allowedTypes = /jpeg|jpg|png/;
  const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = allowedTypes.test(file.mimetype);

  if (extname && mimetype) {
    cb(null, true);
  } else {
    cb(new Error('Only JPEG, JPG and PNG files are allowed!'));
  }
};

const upload = multer({
  storage,
  fileFilter,
  limits: { fileSize: 1 * 1024 * 1024 } // 1MB limit (optional)
});

module.exports = upload;
