const multer = require("multer");
const path = require("path");
const { HttpError } = require("../utils");

const tempDir = path.join(__dirname, "../", "tmp");

const multerStorage = multer.diskStorage({
  destination: tempDir,
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

const multerFilter = (req, file, cb) => {
  if (file.mimetype.startsWith("image/")) {
    cb(null, true);
  } else {
    cb(new HttpError(400, "Please, upload images only!!"), false);
  }
};

const upload = multer({
  storage: multerStorage,
  fileFilter: multerFilter,
});

module.exports = upload;
