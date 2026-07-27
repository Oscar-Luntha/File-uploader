import { Router } from "express";
import { getDashboard } from "../controllers/dashboardController.js";
import { isAuth } from "../middleware/auth.js";

const dashboardRouter = Router();
dashboardRouter.use(isAuth)
dashboardRouter.get("/dashboard", isAuth, getDashboard);

export default dashboardRouter;