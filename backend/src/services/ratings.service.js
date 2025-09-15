import prisma from "../config/prisma.js";

export const upsertRating = (userId, storeId, value) =>
  prisma.rating.upsert({
    where: { userId_storeId: { userId, storeId } },
    update: { value },
    create: { value, userId, storeId },
  });
