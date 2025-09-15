import prisma from "../config/prisma.js";

export const createStore = (data) => prisma.store.create({ data });

export const getStores = async () => {
  const stores = await prisma.store.findMany({ include: { ratings: true } });
  return stores.map((s) => ({
    id: s.id,
    name: s.name,
    address: s.address,
    averageRating: s.ratings.length
      ? s.ratings.reduce((a, r) => a + r.value, 0) / s.ratings.length
      : null,
  }));
};
