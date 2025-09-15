import {
  createUser,
  findUserByEmail,
  validatePassword,
  generateToken,
} from "../services/user.service.js";
import { validateUser } from "../utils/validators.js";

export const signup = async (req, res) => {
  const error = validateUser(req.body);
  if (error) return res.status(400).json({ error });

  try {
    const user = await createUser(req.body);
    res.json({ id: user.id, email: user.email });
  } catch {
    res.status(400).json({ error: "User already exists" });
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;
  const user = await findUserByEmail(email);
  if (!user) return res.status(401).json({ error: "Invalid credentials" });

  const valid = await validatePassword(password, user.password);
  if (!valid) return res.status(401).json({ error: "Invalid credentials" });

  const token = generateToken(user);
  res.json({ token, role: user.role });
};
