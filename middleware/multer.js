const multer = require("multer");
const path = require("path");

module.exports = multer({
  storage: multer.diskStorage({}),
  fileFilter: (req, file, cb) => {
    let ext = path.extname(file.originalname);
    if (ext !== ".mp3" && ext !== ".wav" && ext !== ".m4a" && ext !== ".pdf" && ext !== ".jpeg") {
      cb(new Error("File type is not supported"), false);
      return;
    }
    cb(null, true);
  },
});
