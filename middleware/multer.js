import multer from "multer";

const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, "../uploads");
  },
  filename(req, file, cb) {
    console.log(req);
    const { originalname } = file;
    const fileExtension = (originalname.match(/\.+[\S]+$/) || [])[0];

    cb(null, `${file.fieldname}${Date.now()}${fileExtension}`);
  },
});

export const upload = multer({ storage });
