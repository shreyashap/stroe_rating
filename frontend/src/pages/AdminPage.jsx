import { useEffect, useState } from "react";
import API from "../services/api";
import AddUserModal from "../components/admin/AddUserModal";

export default function AdminPage() {
  const [stats, setStats] = useState(null);
  const [users, setUsers] = useState([]);
  const [stores, setStores] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [filters, setFilters] = useState({ search: "", role: "" });
  const [sort, setSort] = useState({ field: "name", order: "asc" });
  const [showAddUser, setShowAddUser] = useState(false);

  const fetchData = async () => {
    try {
      setLoading(true);
      const [statsRes, usersRes, storesRes] = await Promise.all([
        API.get("/admin/dashboard"),
        API.get("/admin/users", { params: { ...filters, ...sort } }),
        API.get("/admin/stores", { params: { ...filters, ...sort } }),
      ]);
      setStats(statsRes.data);
      setUsers(usersRes.data);
      setStores(storesRes.data);
      setError("");
    } catch (err) {
      setError("Failed to load admin data");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [filters, sort]);

  const handleSort = (field) => {
    setSort((prev) => ({
      field,
      order: prev.order === "asc" ? "desc" : "asc",
    }));
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6">Admin Dashboard</h2>

      {loading && <p>Loading dashboard...</p>}
      {error && <p className="text-red-500">{error}</p>}

      {stats && (
        <div className="grid grid-cols-3 gap-6 mb-8">
          <div className="bg-white p-6 rounded-xl shadow">
            <h3 className="text-gray-500">Users</h3>
            <p className="text-2xl font-bold">{stats.users}</p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow">
            <h3 className="text-gray-500">Stores</h3>
            <p className="text-2xl font-bold">{stats.stores}</p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow">
            <h3 className="text-gray-500">Ratings</h3>
            <p className="text-2xl font-bold">{stats.ratings}</p>
          </div>
        </div>
      )}

      {/* Filters */}
      <div className="flex gap-4 mb-6">
        <input
          placeholder="Search by name/email/address"
          className="border p-2 rounded w-1/3"
          value={filters.search}
          onChange={(e) => setFilters({ ...filters, search: e.target.value })}
        />
        <select
          className="border p-2 rounded"
          value={filters.role}
          onChange={(e) => setFilters({ ...filters, role: e.target.value })}
        >
          <option value="">All Roles</option>
          <option value="ADMIN">Admin</option>
          <option value="NORMAL">Normal</option>
          <option value="STORE_OWNER">Store Owner</option>
        </select>
      </div>

      <button
        onClick={() => setShowAddUser(true)}
        className="mb-3 px-4 py-2 bg-blue-600 text-white rounded"
      >
        + Add User
      </button>

      {showAddUser && (
        <AddUserModal
          onClose={() => setShowAddUser(false)}
          onSuccess={fetchData}
        />
      )}

      {/* Users Table */}
      <h3 className="text-xl font-semibold mb-3">Users</h3>
      <div className="overflow-x-auto mb-8">
        <table className="min-w-full bg-white rounded-xl shadow">
          <thead>
            <tr className="bg-gray-100 text-left">
              <th
                className="p-3 cursor-pointer"
                onClick={() => handleSort("name")}
              >
                Name
              </th>
              <th
                className="p-3 cursor-pointer"
                onClick={() => handleSort("email")}
              >
                Email
              </th>
              <th className="p-3">Address</th>
              <th
                className="p-3 cursor-pointer"
                onClick={() => handleSort("role")}
              >
                Role
              </th>
            </tr>
          </thead>
          <tbody>
            {users.map((u) => (
              <tr key={u.id} className="border-t hover:bg-gray-50">
                <td className="p-3">{u.name}</td>
                <td className="p-3">{u.email}</td>
                <td className="p-3">{u.address}</td>
                <td className="p-3">{u.role}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Stores Table */}
      <h3 className="text-xl font-semibold mb-3">Stores</h3>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white rounded-xl shadow">
          <thead>
            <tr className="bg-gray-100 text-left">
              <th
                className="p-3 cursor-pointer"
                onClick={() => handleSort("name")}
              >
                Name
              </th>
              <th
                className="p-3 cursor-pointer"
                onClick={() => handleSort("email")}
              >
                Email
              </th>
              <th className="p-3">Address</th>
              <th className="p-3">Avg Rating</th>
            </tr>
          </thead>
          <tbody>
            {stores.map((s) => (
              <tr key={s.id} className="border-t hover:bg-gray-50">
                <td className="p-3">{s.name}</td>
                <td className="p-3">{s.email}</td>
                <td className="p-3">{s.address}</td>
                <td className="p-3">{s.averageRating?.toFixed(1) ?? "—"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
