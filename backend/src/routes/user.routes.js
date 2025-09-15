import { Router } from "express";
import { updatePassword } from "../controllers/user.controller.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";

const router = Router();

router.post(
  "/update-password",
  authMiddleware(["NORMAL", "STORE_OWNER", "ADMIN"]),
  updatePassword
);

export default router;
