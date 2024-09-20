import multer from "multer";
import { v4 as uuid } from "uuid";

const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, "uploads")
  },
  filename(req, file, cb) {

    //To generate a random ID for the media to prevent multiple uploads
    const id = uuid();
    //Extension of the file that needs to be uploaded
    const extName = file.originalname.split(".").pop();
    //naming the file
    const fileName = `${id}.${extName}`
    cb(null, fileName);
  }
});

export const uploadFiles = multer({ storage }).single("file");