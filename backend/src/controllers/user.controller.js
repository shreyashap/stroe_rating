import prisma from "../config/prisma.js";
import bcrypt from "bcrypt";

export const updatePassword = async (req, res) => {
  try {
    const { oldPassword, newPassword } = req.body;

    if (
      !newPassword ||
      !/^(?=.*[A-Z])(?=.*[!@#$%^&*]).{8,16}$/.test(newPassword)
    ) {
      return res.status(400).json({
        error:
          "Password must be 8–16 chars, include at least one uppercase and one special char",
      });
    }

    const user = await prisma.user.findUnique({ where: { id: req.user.id } });
    if (!user) return res.status(404).json({ error: "User not found" });

    const isMatch = await bcrypt.compare(oldPassword, user.password);
    if (!isMatch)
      return res.status(400).json({ error: "Old password is incorrect" });

    const hashed = await bcrypt.hash(newPassword, 10);
    await prisma.user.update({
      where: { id: user.id },
      data: { password: hashed },
    });

    res.json({ message: "Password updated successfully" });
  } catch (err) {
    res.status(500).json({ error: "Failed to update password" });
  }
};
