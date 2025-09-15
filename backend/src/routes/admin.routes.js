import { Router } from "express";
import {
  dashboard,
  listUsers,
  listStores,
  addUser,
} from "../controllers/admin.controller.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";

const router = Router();

router.get("/dashboard", authMiddleware(["ADMIN"]), dashboard);
router.get("/users", authMiddleware(["ADMIN"]), listUsers);
router.get("/stores", authMiddleware(["ADMIN"]), listStores);
router.post("/users/add", authMiddleware(["ADMIN"]), addUser);

export default router;
