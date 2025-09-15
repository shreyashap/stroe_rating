import prisma from "../config/prisma.js";

export const storeOwnerDashboard = async (req, res) => {
  try {
    const ownerId = req.user.id;

    // find store owned by this user
    const store = await prisma.store.findFirst({
      where: { ownerId },
      include: {
        ratings: {
          include: { user: { select: { id: true, name: true, email: true } } },
        },
      },
    });

    if (!store) {
      return res.status(404).json({ error: "No store found for this owner" });
    }

    const avgRating = store.ratings.length
      ? store.ratings.reduce((a, r) => a + r.value, 0) / store.ratings.length
      : null;

    const raters = store.ratings.map((r) => ({
      id: r.user.id,
      name: r.user.name,
      email: r.user.email,
      rating: r.value,
    }));

    res.json({
      store: {
        id: store.id,
        name: store.name,
        address: store.address,
        averageRating: avgRating,
      },
      raters,
    });
  } catch (err) {
    res.status(500).json({ error: "Failed to load store owner dashboard" });
  }
};
