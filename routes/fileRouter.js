import { Router } from "express";
import upload from "../middleware/upload.js";
import {
  uploadFile,
  getFileDetails,
  downloadFile,
  deleteFile,
} from "../controllers/fileController.js";
import { isAuth } from "../middleware/auth.js";

const fileRouter = Router();

fileRouter.use(isAuth);

fileRouter.post("/files/upload", upload.single("file"), uploadFile);
fileRouter.get("/files/:id", getFileDetails);
fileRouter.get("/files/:id/download", downloadFile);
fileRouter.post("/files/:id/delete", deleteFile);

export default fileRouter;