import { Router } from "express";
import { rateStore } from "../controllers/rating.controller.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";

const router = Router();
router.post("/:id/rating", authMiddleware(["NORMAL"]), rateStore);

export default router;
