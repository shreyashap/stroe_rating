import { useEffect, useState } from "react";
import API from "../services/api";

export default function StoreOwnerPage() {
  const [store, setStore] = useState(null);
  const [raters, setRaters] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchDashboard = async () => {
    try {
      setLoading(true);
      const res = await API.get("/owner/dashboard");
      setStore(res.data.store);
      setRaters(res.data.raters);
      setError("");
    } catch {
      setError("Failed to load dashboard");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboard();
  }, []);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6">Store Owner Dashboard</h2>

      {loading && <p>Loading...</p>}
      {error && <p className="text-red-500">{error}</p>}

      {store && (
        <div className="bg-white p-6 rounded-xl shadow mb-6">
          <h3 className="text-lg font-semibold">{store.name}</h3>
          <p className="text-gray-600">{store.address}</p>
          <p className="mt-2">
            ⭐ Average Rating:{" "}
            {store.averageRating?.toFixed(1) ?? "No ratings yet"}
          </p>
        </div>
      )}

      <h3 className="text-xl font-semibold mb-3">Users who rated</h3>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white rounded-xl shadow">
          <thead>
            <tr className="bg-gray-100 text-left">
              <th className="p-3">Name</th>
              <th className="p-3">Email</th>
              <th className="p-3">Rating</th>
            </tr>
          </thead>
          <tbody>
            {raters.map((u) => (
              <tr key={u.id} className="border-t hover:bg-gray-50">
                <td className="p-3">{u.name}</td>
                <td className="p-3">{u.email}</td>
                <td className="p-3">{u.rating}</td>
              </tr>
            ))}
          </tbody>
        </table>
        {raters.length === 0 && (
          <p className="text-gray-500 p-3">No ratings yet</p>
        )}
      </div>
    </div>
  );
}
