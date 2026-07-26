import { Router } from "express";
import { getRegisterPage, postRegister, getLoginPage, postLogin, logout,} from "../controllers/authController.js";

const authRouter = Router();
//register routes
authRouter.get("/register", getRegisterPage);
authRouter.post("/register", postRegister);
//login routes
authRouter.get("/login", getLoginPage);
authRouter.post("/login", postLogin);
//logout routes
authRouter.get("/logout", logout);

export default authRouter;