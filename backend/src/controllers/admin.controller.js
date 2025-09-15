import prisma from "../config/prisma.js";
import { validateUser } from "../utils/validators.js";
import bcrypt from "bcrypt";

export const dashboard = async (req, res) => {
  try {
    const users = await prisma.user.count();
    const stores = await prisma.store.count();
    const ratings = await prisma.rating.count();
    res.json({ users, stores, ratings });
  } catch (err) {
    res.status(500).json({ error: "Failed to load dashboard" });
  }
};

export const listUsers = async (req, res) => {
  try {
    const { search = "", role, field = "name", order = "asc" } = req.query;

    const users = await prisma.user.findMany({
      where: {
        AND: [
          role ? { role } : {},
          {
            OR: [
              { name: { contains: search, mode: "insensitive" } },
              { email: { contains: search, mode: "insensitive" } },
              { address: { contains: search, mode: "insensitive" } },
            ],
          },
        ],
      },
      orderBy: { [field]: order },
      select: { id: true, name: true, email: true, address: true, role: true },
    });

    res.json(users);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch users" });
  }
};

export const listStores = async (req, res) => {
  try {
    const { search = "", field = "name", order = "asc" } = req.query;

    const stores = await prisma.store.findMany({
      where: {
        OR: [
          { name: { contains: search, mode: "insensitive" } },
          { email: { contains: search, mode: "insensitive" } },
          { address: { contains: search, mode: "insensitive" } },
        ],
      },
      orderBy: { [field]: order },
      include: {
        ratings: true,
      },
    });

    const formatted = stores.map((s) => ({
      id: s.id,
      name: s.name,
      email: s.email,
      address: s.address,
      averageRating: s.ratings.length
        ? s.ratings.reduce((a, r) => a + r.value, 0) / s.ratings.length
        : null,
    }));

    res.json(formatted);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch stores" });
  }
};

export const addUser = async (req, res) => {
  try {
    const { name, email, address, password, role } = req.body;

    const error = validateUser({ name, email, address, password });
    if (error) return res.status(400).json({ error });

    const hashed = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
      data: { name, email, address, password: hashed, role },
    });

    res.json({ id: user.id, name: user.name, role: user.role });
  } catch (err) {
    if (err.code === "P2002") {
      res.status(400).json({ error: "Email already exists" });
    } else {
      res.status(500).json({ error: "Failed to add user" });
    }
  }
};
