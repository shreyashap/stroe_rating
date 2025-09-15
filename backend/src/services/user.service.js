import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import prisma from "../config/prisma.js";
import { JWT_SECRET } from "../config/env.js";

export const createUser = async (data, role = "NORMAL") => {
  const hashed = await bcrypt.hash(data.password, 10);
  return prisma.user.create({
    data: { ...data, password: hashed, role },
  });
};

export const findUserByEmail = (email) =>
  prisma.user.findUnique({ where: { email } });

export const validatePassword = (password, hash) =>
  bcrypt.compare(password, hash);

export const generateToken = (user) =>
  jwt.sign({ id: user.id, role: user.role }, JWT_SECRET, { expiresIn: "1h" });
