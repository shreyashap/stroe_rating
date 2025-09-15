import { createStore, getStores } from "../services/store.service.js";

export const addStore = async (req, res) => {
  const store = await createStore(req.body);
  res.json(store);
};

export const listStores = async (req, res) => {
  res.json(await getStores());
};
