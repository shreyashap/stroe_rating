import { upsertRating } from "../services/ratings.service.js";

export const rateStore = async (req, res) => {
  const storeId = parseInt(req.params.id);
  const { value } = req.body;
  if (value < 1 || value > 5)
    return res.status(400).json({ error: "Rating must be 1–5" });

  const rating = await upsertRating(req.user.id, storeId, value);
  res.json(rating);
};
