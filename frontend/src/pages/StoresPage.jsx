import { useEffect, useState } from "react";
import API from "../services/api";
import StoreCard from "../components/stores/StoreCard";

export default function StoresPage() {
  const [stores, setStores] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchStores = async () => {
    try {
      setLoading(true);
      const res = await API.get("/stores");
      setStores(res.data);
      setError("");
    } catch (err) {
      setError("Failed to load stores. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleRate = async (id, value) => {
    try {
      await API.post(`/stores/${id}/rating`, { value });
      fetchStores();
    } catch {
      setError("Failed to submit rating. Please try again.");
    }
  };

  useEffect(() => {
    fetchStores();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-blue-600 text-white p-4 shadow-md">
        <h1 className="text-xl font-bold">🏬 Store Ratings</h1>
      </header>
      <main className="p-6 grid gap-6 max-w-3xl mx-auto">
        {loading && (
          <p className="text-center text-gray-500">Loading stores...</p>
        )}
        {error && <p className="text-center text-red-500">{error}</p>}
        {!loading && !error && stores.length === 0 && (
          <p className="text-center text-gray-600">No stores available</p>
        )}
        {!loading &&
          !error &&
          stores.map((s) => (
            <StoreCard key={s.id} store={s} onRate={handleRate} />
          ))}
      </main>
    </div>
  );
}
