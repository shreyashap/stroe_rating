import { Router } from "express";
import { storeOwnerDashboard } from "../controllers/storeOwner.controller.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";

const router = Router();

router.get("/dashboard", authMiddleware(["STORE_OWNER"]), storeOwnerDashboard);

export default router;
