import express from "express";
import cors from "cors";

import authRoutes from "./routes/auth.routes.js";
import storeRoutes from "./routes/store.routes.js";
import ratingRoutes from "./routes/rating.routes.js";
import adminRoutes from "./routes/admin.routes.js";
import storeOwnerRoutes from "./routes/storeOwner.routes.js";
import userRoutes from "./routes/user.routes.js";

const app = express();
app.use(cors());
app.use(express.json());

app.use("/auth", authRoutes);
app.use("/stores", storeRoutes);
app.use("/stores", ratingRoutes);
app.use("/admin", adminRoutes);
app.use("/owner", storeOwnerRoutes);
app.use("/user", userRoutes);

export default app;
