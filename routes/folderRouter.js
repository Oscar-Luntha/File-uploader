// routes/folderRouter.js
import { Router } from "express";
import {
  createFolder,
  getFolderDetails,
  updateFolder,
  deleteFolder,
} from "../controllers/folderController.js";
import { isAuth } from "../middleware/auth.js";

const folderRouter = Router();

// Protect all folder routes with authentication middleware
folderRouter.use(isAuth);

folderRouter.post("/folders", createFolder);
folderRouter.get("/folders/:id", getFolderDetails);
folderRouter.post("/folders/:id/update", updateFolder);
folderRouter.post("/folders/:id/delete", deleteFolder);

export default folderRouter;