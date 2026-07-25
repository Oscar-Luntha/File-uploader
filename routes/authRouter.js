import { Router } from "express";
import { getRegisterPage, postRegister } from "../controllers/authController.js";

const authRouter = Router();

authRouter.get("/register", getRegisterPage);
authRouter.post("/register", postRegister);

export default authRouter;