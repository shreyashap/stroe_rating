import { Router } from "express";
import { addStore, listStores } from "../controllers/store.controller.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";

const router = Router();
router.post("/", authMiddleware(["ADMIN"]), addStore);
router.get("/", authMiddleware(["NORMAL", "ADMIN"]), listStores);

export default router;
